import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const LinkButtonStyle = styled.span`
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  font-size: ${props => pxToRem(props.fontsize)};
  font-weight: 600;

  color: ${props => props.theme.linkButton.color[props.type]};

  :hover {
    color: ${props => props.theme.linkButton.hover.color[props.type]};
  }
  :active {
    color: ${props => props.theme.linkButton.click.color[props.type]};
  }

  ${props =>
    props.disabled
      ? `
         cursor: inherit;
         color: ${props.theme.linkButton.disabled.color[props.type]};
         :hover{
          color: ${props.theme.linkButton.disabled.color[props.type]};
        }
        :active {
          color: ${props.theme.linkButton.disabled.color[props.type]};
        }
        `
      : ''};
`;

const LinkButtonUI = ({ children, type, disabled, onClick, fontsize }) => (
  <LinkButtonStyle
    disabled={disabled}
    type={type}
    fontsize={fontsize}
    onClick={disabled ? () => {} : () => onClick()}
  >
    {children}
  </LinkButtonStyle>
);

LinkButtonUI.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  fontsize: PropTypes.string,
};

LinkButtonUI.defaultProps = {
  type: 'primary',
  disabled: false,
  fontsize: '20',
};

export default LinkButtonUI;
