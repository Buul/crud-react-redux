/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'antd';

import pxToRem from '../../helpers/scales';

const MenuItemLogoStyle = styled(Menu.Item)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  -moz-user-select: none !important;
  -khtml-user-select: none !important;
  -webkit-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
`;

const MenuItemStyle = styled(Menu.Item)`
  color: ${props => props.theme.colors.blueDark} !important;
  font-size: ${pxToRem(15)} !important;
  font-weight: 600 !important;
  border: none 3px solid ${props => props.theme.colors.white} !important;
  :not(.ant-menu-horizontal) {
    background-color: ${props => props.theme.colors.white} !important;
  }
  ::after {
    border-right: 3px solid ${props => props.theme.colors.blueDark} !important;
  }
`;

const HeaderStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border: ${pxToRem(1)} solid ${props => props.theme.colors.blueLight};
  border-radius: ${pxToRem(5)};
  display: flex;
  height: ${pxToRem(96)};
  justify-content: space-between;
  padding: 0 ${props => pxToRem(props.padding)};

  .icons {
    align-items: center;
    display: flex;
  }

  .header-persist {
    padding: 0 ${pxToRem(30)};
  }
  @media ${props => props.theme.device.md} {
    width: 100%;
  }
`;

const ContainerStyle = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentConfigucoesStyle = styled.div`
  padding-bottom: ${pxToRem(20)};
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;
const LogoStyle = styled.div`
  @media ${props => props.theme.device.md} {
    display: none;
  }
`;

const MenuLinkConfiguracoesStyle = styled.div`
  color: ${props => props.theme.colors.blueDark};
  cursor: pointer;
  display: block;
  font-size: ${pxToRem(15)};
  margin: ${pxToRem(10)} 0;
`;

export const Header = ({ children, padding }) => (
  <HeaderStyle padding={padding}>{children}</HeaderStyle>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.string,
};

Header.defaultProps = {
  padding: '24',
};

export const Container = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Logo = ({ children }) => <LogoStyle>{children}</LogoStyle>;

Logo.propTypes = {
  children: PropTypes.node.isRequired,
};

export const MenuItemLogo = props => (
  <MenuItemLogoStyle {...props}>{props.children}</MenuItemLogoStyle>
);

MenuItemLogo.propTypes = {
  children: PropTypes.node.isRequired,
};

export const MenuItem = props => <MenuItemStyle {...props}>{props.children}</MenuItemStyle>;

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export const MenuLinkConfiguracoes = ({ children, onClick }) => (
  <MenuLinkConfiguracoesStyle onClick={() => onClick()}>{children}</MenuLinkConfiguracoesStyle>
);

MenuLinkConfiguracoes.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const ContentConfigucoes = ({ children }) => (
  <ContentConfigucoesStyle>{children}</ContentConfigucoesStyle>
);

ContentConfigucoes.propTypes = {
  children: PropTypes.node.isRequired,
};
