import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Svg
import iconsList from '../../assets/iconsList.svg';

import pxToRem from '../../helpers/scales';

const IconStyle = styled.svg`
  display: ${props => props.display};
  fill: ${props => props.theme.colors[props.color]};
  height: ${props => pxToRem(props.size)};
  width: ${props => pxToRem(props.size)};
`;

const IconUI = ({ tag, size, color, display }) => (
  <IconStyle
    viewBox="0 0 32 32"
    className={`icon icon-${tag}`}
    size={size}
    color={color}
    data-testid="icon"
    display={display}
  >
    <use xlinkHref={`${iconsList}#icon-${tag}`} />
  </IconStyle>
);

IconUI.propTypes = {
  tag: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  display: PropTypes.string,
};

IconUI.defaultProps = {
  tag: '',
  size: '10',
  color: 'black',
  display: 'block',
};

export default IconUI;
