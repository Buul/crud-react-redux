import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const FirstChild = props => Children.toArray(props.children)[0] || null;

class LoadingOverlayWrapper extends React.Component {
  componentWillReceiveProps(nextProps) {
    const s = nextProps.style;
    if (nextProps.active && (s.overflow || s.overflowY || s.overflowX)) {
      this.wrapper.scrollTop = 0;
    }
  }

  render() {
    const { active, className, children, style } = this.props;

    let loadNode = active && (
      <CSSTransition
        appear
        classNames="_loading-overlay-transition"
        timeout={{ enter: 500, exit: 500 }}
      >
        <LoadingOverlay key="the_dimmer" {...this.props} />
      </CSSTransition>
    );
    loadNode = (
      <TransitionGroup appear component={FirstChild}>
        {loadNode}
      </TransitionGroup>
    );
    const styles = {
      position: 'relative',
      ...style,
    };
    if (active) {
      if (styles.overflow) styles.overflow = 'hidden';
      if (styles.overflowY) styles.overflowY = 'hidden';
      if (styles.overflowX) styles.overflowX = 'hidden';
    }
    return (
      <div
        ref={n => {
          this.wrapper = n;
        }}
        className={className}
        style={styles}
      >
        {children}
        {loadNode}
      </div>
    );
  }
}

LoadingOverlayWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  active: PropTypes.bool,
  spinnerSize: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animate: PropTypes.bool,
};

LoadingOverlayWrapper.defaultProps = {
  active: false,
  className: '_loading-overlay',
  background: 'rgba(0, 0, 0, 0.7)',
  spinnerSize: '50px',
  color: '#FFF',
  zIndex: 800,
  animate: false,
  style: {},
};

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background: ${props => props.background};
  color: ${props => props.color};
  transition: opacity ${props => props.speed}ms ease-out;
  display: flex;
  text-align: center;
  font-size: 1.2em;
  z-index: ${props => props.zIndex};
  &._loading-overlay-transition-appear,
  &._loading-overlay-transition-enter {
    opacity: 0.01;
  }
  &._loading-overlay-transition-appear._loading-overlay-transition-appear-active,
  &._loading-overlay-transition-enter._loading-overlay-transition-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }
  &._loading-overlay-transition-exit {
    opacity: 1;
  }
  &._loading-overlay-transition-exit._loading-overlay-transition-exit-active {
    opacity: 0;
    transition: opacity 0.5s ease-in;
  }
`;

const Spinner = styled.div`
  position: relative;
  margin: 0px auto 10px auto;
  width: ${props => props.spinnerSize};
  max-height: 100%;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const Content = styled.div`
  margin: auto;
`;

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const spinnerDash = keyframes`
0% {
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
}
50% {
  stroke-dasharray: 89,200;
  stroke-dashoffset: -35px;
}
100% {
  stroke-dasharray: 89,200;
  stroke-dashoffset: -124px;
}
`;

const Svg = styled.svg`
  animation: ${rotate360} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Circle = styled.circle`
  animation: ${spinnerDash} 1.5s ease-in-out infinite;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke: ${props => props.color};
`;

const LoadingOverlay = props => {
  const { background, color, speed, zIndex, spinnerSize, text, spinner } = props;

  let spinnerNode = null;
  if (spinner) {
    spinnerNode = (
      <Spinner spinnerSize={spinnerSize}>
        <Svg viewBox="25 25 50 50">
          <Circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
            color={color}
          />
        </Svg>
      </Spinner>
    );
  }

  let textNode = null;
  if (text) textNode = <div>{text}</div>;

  let contentNode = null;
  if (text || spinner) {
    contentNode = (
      <Content>
        {spinnerNode}
        {textNode}
      </Content>
    );
  }

  return (
    <Overlay key="dimmer" background={background} color={color} zIndex={zIndex} speed={speed}>
      {contentNode}
    </Overlay>
  );
};

LoadingOverlay.propTypes = {
  text: PropTypes.string,
  spinner: PropTypes.bool,
  spinnerSize: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  speed: PropTypes.string,
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

LoadingOverlay.defaultProps = {
  text: null,
  spinner: false,
  background: 'rgba(0, 0, 0, 0.7)',
  spinnerSize: '50px',
  color: '#FFF',
  zIndex: 800,
};

export default LoadingOverlayWrapper;
