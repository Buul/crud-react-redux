import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { setResponsiveMenu } from '../../actions';
import { Icon } from '../ui';
import Header from './Header';
import HeaderPersist from './HeaderPersist';
import { Container, MenuItemLogo, MenuItem } from './style';
import Conta from '../user';
import Registration from '../user/registration';
import EditCompany from '../user/EditCompany';
import EditUser from '../user/EditUser';
import ConfiguracoDemanda from '../configuracao/demanda';
import FormDemanda from '../configuracao/demanda/form';
import Users from '../userSystem';
import PersistUsers from '../userSystem/Persist';

const PersitRoute = ({ persist, component: Component, edit, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      persist.active ? (
        <Component edit={edit} {...props} />
      ) : (
        // eslint-disable-next-line react/prop-types
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

PersitRoute.propTypes = {
  persist: PropTypes.shape({}),
  // eslint-disable-next-line react/require-default-props
  component: PropTypes.func,
  edit: PropTypes.bool,
};

PersitRoute.defaultProps = {
  persist: {},
  edit: false,
};

const handleClick = (e, setResponsiveMenuAction, history) => {
  setResponsiveMenuAction({ active: false });

  history.push(`/${e.key === 'inicio' ? '' : e.key}`);
};

const style = {
  height: '100%',
  position: 'absolute',
  width: '60%',
  left: 0,
  zIndex: 9999,
  boxShadow: '0 4px 4px rgba(0, 0, 0, 0.14)',
  border: '1px solid white',
};

const Home = ({ persist, responsiveMenu, setResponsiveMenuAction, history, user }) => (
  <div style={{ width: '100%' }}>
    {(persist.active && <HeaderPersist />) || <Header user={user} />}
    <Container>
      {responsiveMenu.active && (
        <Menu
          onClick={event => handleClick(event, setResponsiveMenuAction, history)}
          style={style}
          defaultSelectedKeys={['inicio']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <MenuItemLogo disabled>
            <Icon size="150" color="blueMedium" tag="logo" />
          </MenuItemLogo>
          <MenuItem key="inicio">Início</MenuItem>
          <MenuItem key="conta">Conta</MenuItem>
          <MenuItem key="demandas">Demandas</MenuItem>
          <MenuItem key="documentos">Documento</MenuItem>
        </Menu>
      )}
      <Switch>
        <PersitRoute persist={persist} path="/conta-novo" component={Registration} />
        <PersitRoute persist={persist} path="/user-system-novo" component={PersistUsers} />
        <PersitRoute persist={persist} path="/user-system-editar" edit component={PersistUsers} />
        <PersitRoute persist={persist} path="/conta-editar" component={EditCompany} />
        <PersitRoute persist={persist} path="/user-editar" component={EditUser} />
        <PersitRoute
          persist={persist}
          path="/configuracoes-demanda"
          component={ConfiguracoDemanda}
        />
        <PersitRoute persist={persist} path="/configuracoes-demanda-novo" component={FormDemanda} />
        <Route path="/conta" component={Conta} />
        <Route path="/users" component={Users} />
        <Route path="/demandas" component={() => <h2>Demandas</h2>} />
        <Route path="/documentos" component={() => <h2>Documentos</h2>} />
        <Redirect from="*" exact to="/" />
      </Switch>
    </Container>
  </div>
);

Home.propTypes = {
  persist: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  responsiveMenu: PropTypes.shape({ active: PropTypes.bool }),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  setResponsiveMenuAction: PropTypes.func.isRequired,
};

Home.defaultProps = {
  persist: {},
  responsiveMenu: {
    active: false,
  },
};

const mapStateToProps = state => ({
  persist: state.userReducer.persist,
  user: state.userReducer.user,
  responsiveMenu: state.authReducer.responsiveMenu,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setResponsiveMenuAction: setResponsiveMenu,
    },
    dispatch
  );

const HomeConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default withRouter(HomeConnected);
