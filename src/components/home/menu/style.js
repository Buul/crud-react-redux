import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../../helpers/scales';

const MenuStyle = styled.div`
  display: flex;
`;

const ItemMenuStyle = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.blueDark};
  cursor: pointer;
  display: flex;
  font-size: ${pxToRem(15)};
  font-weight: 600;
  height: ${pxToRem(96)};
  justify-content: center;
  line-height: ${pxToRem(50)};
  margin-right: ${props => pxToRem(props.marginrigth)};
  min-width: ${pxToRem(134)};
  position: relative;

  @media ${props => props.theme.device.md} {
    display: none;
  }
`;

const IconBoxDeviceStyle = styled.div`
  display: none;

  @media ${props => props.theme.device.md} {
    display: block;
  }
`;

const BorderDefault = styled.div`
  background-color: ${props => props.theme.colors.blueLight};
  border: ${pxToRem(2)} solid ${props => props.theme.colors.white};
  border-radius: 50%;
  height: ${pxToRem(10)};
  position: absolute;
  width: ${pxToRem(10)};
  top: ${pxToRem(89)};
`;

const BorderSelected = styled.div`
  background-color: ${props => props.theme.colors.blueDark};
  border-radius: ${pxToRem(5)};
  height: ${pxToRem(8)};
  position: absolute;
  width: ${pxToRem(64)};
  top: ${pxToRem(89)};
`;

export const Menu = ({ children }) => <MenuStyle>{children}</MenuStyle>;

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react/prop-types
export const ItemMenu = ({ children, marginrigth, onClick, selected }) => (
  <ItemMenuStyle marginrigth={marginrigth} onClick={() => onClick()}>
    {children}
    {(selected && <BorderSelected />) || <BorderDefault />}
  </ItemMenuStyle>
);

ItemMenu.propTypes = {
  marginrigth: PropTypes.number,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

ItemMenu.defaultProps = {
  marginrigth: 5,
  onClick: () => {},
  selected: false,
};

export const IconBoxDevice = ({ children, onClick }) => (
  <IconBoxDeviceStyle onClick={() => onClick()}>{children}</IconBoxDeviceStyle>
);

IconBoxDevice.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
