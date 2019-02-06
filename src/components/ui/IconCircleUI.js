import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import pxToRem from '../../helpers/scales';

const IconCircleStyle = styled.div`
  align-items: center;
  background-color: ${props => props.backgroundcolor};
  border: ${props => props.border};
  border-radius: 50%;
  cursor: ${props => props.cursor};
  display: flex;
  ${props =>
    props.heightCircle === '' ? `height: ${props.theme.iconCircle[props.type].size};` : ''};
  justify-content: center;
  position: relative;
  width: ${props => props.theme.iconCircle[props.type].size};

  .icon {
    align-items: center;
    display: flex;
    height: ${props => props.theme.iconCircle[props.type].icon.size};
    justify-content: center;
    width: ${props => props.theme.iconCircle[props.type].icon.size};
  }

  ${props =>
    props.rotate === '90'
      ? ` -webkit-transform: rotate(90deg) ;
          -ms-transform: rotate(90deg) ;
          transform: rotate(90deg);`
      : ''}
`;

const Alert = styled.div`
  background-color: ${props => props.theme.colors.error};
  border: ${pxToRem(2)} solid ${props => props.theme.colors.white};
  border-radius: ${pxToRem(13)};
  bottom: ${pxToRem(26)};
  color: ${props => props.theme.colors.white};
  font-size: ${pxToRem(12)};
  text-align: center;
  line-height: ${pxToRem(22)};
  font-weight: 600;
  height: ${pxToRem(25)};
  position: absolute;
  right: ${pxToRem(23)};
  width: ${pxToRem(31)};
`;

const IconCircleUI = ({
  type,
  icon,
  size,
  border,
  cursor,
  onClick,
  color,
  backgroundcolor,
  heightCircle,
  rotate,
}) => (
  <IconCircleStyle
    rotate={rotate}
    type={type}
    border={border}
    cursor={cursor}
    icon={icon}
    backgroundcolor={backgroundcolor}
    onClick={() => onClick()}
    heightCircle={heightCircle}
  >
    <div className="icon">
      <Icon type={icon} style={{ fontSize: pxToRem(size), color }} />
    </div>
    {icon === 'bell' && <Alert>12</Alert>}
  </IconCircleStyle>
);

IconCircleUI.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  border: PropTypes.string,
  cursor: PropTypes.string,
  backgroundcolor: PropTypes.string,
  color: PropTypes.string,
  heightCircle: PropTypes.string,
  onClick: PropTypes.func,
  rotate: PropTypes.string,
};

IconCircleUI.defaultProps = {
  type: 'medium',
  cursor: 'pointer',
  icon: '',
  heightCircle: '',
  rotate: '',
  size: '22',
  onClick: () => {},
  border: '2px solid rgba(112, 112, 112, 0.1)',
  color: '#999DAF',
  backgroundcolor: 'white',
};

export default IconCircleUI;
