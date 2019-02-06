import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const BoxStyle = styled.div`
  background-color: ${props => props.theme.tag[props.type].background[props.color]};
  border: ${pxToRem(2)} solid ${props => props.theme.colors.white};
  border-radius: ${pxToRem(5)};
  color: ${props => props.theme.tag[props.type].color[props.color]};
  font-size: ${pxToRem(16)};
  font-weight: 600;
  line-height: ${pxToRem(24)};
  padding: 0 ${pxToRem(12)};
  text-align: center;
  min-width: ${pxToRem(63)};
`;

const TagUI = ({ type, color, children }) => (
  <BoxStyle type={type} color={color}>
    {children}
  </BoxStyle>
);

TagUI.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
};

TagUI.defaultProps = {
  type: 'primary',
  color: 'azul',
};

export default TagUI;
