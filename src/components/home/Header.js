import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Logo } from './style';
import { Icon, IconCircle, Popover } from '../ui';
import Configuracoes from './Configuracoes';
import Perfil from './perfil';
import MenuIndex from './menu';
import MenuDevice from './menu/MenuDevice';
import pxToRem from '../../helpers/scales';

const AvatarStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.avatar.medium.background};
  border-radius: 50%;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.theme.avatar.medium.font.size};
  font-weight: 600;
  height: ${props => props.theme.avatar.medium.size};
  justify-content: center;
  line-height: ${props => props.theme.avatar.medium.font.lineHeight};
  width: ${props => props.theme.avatar.medium.size};

  .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    height: ${props => props.theme.avatar.medium.empty.size};
    width: ${props => props.theme.avatar.medium.empty.size};
  }
`;

const HeaderHome = ({ user }) => (
  <Header>
    <Logo>
      <Icon size="96" color="blueMedium" tag="logo" />
    </Logo>
    <MenuDevice />
    <MenuIndex />
    <div className="icons">
      <div style={{ margin: `0 ${pxToRem(6)}` }}>
        <IconCircle icon="bell" />
      </div>
      {user.role === 'BackOffice' && (
        <div style={{ margin: `0 ${pxToRem(6)}` }}>
          <Popover
            placement="bottomRight"
            title="Configurações"
            content={<Configuracoes />}
            trigger="click"
          >
            <IconCircle icon="setting" />
          </Popover>
        </div>
      )}
      <div style={{ margin: `0 ${pxToRem(6)}` }}>
        <Popover placement="bottomRight" title="Perfil" content={<Perfil />} trigger="click">
          <AvatarStyle>
            <div className="icon">A</div>
          </AvatarStyle>
        </Popover>
      </div>
    </div>
  </Header>
);

HeaderHome.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default HeaderHome;
