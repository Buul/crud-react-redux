import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMenuLink, toggleSpinner, showMessageBox, setRole, setUser } from '../../../actions';
import { Menu, ItemMenu } from './style';
import { getMenuByRole, getClickByRole } from '../../../helpers/domain';
import { getUserTokenUserId } from '../../../services/auth';
import api from '../../../services/api';

class MenuIndex extends Component {
  state = {
    typeUser: '',
  };

  componentWillMount() {
    this.getUser(getUserTokenUserId());
  }

  decorateMenuSelect = value => {
    switch (value) {
      case '':
        return 'inicio';
      case 'users':
        return 'conta';
      default:
        return value;
    }
  };

  getUser = id => {
    const {
      spinner,
      showMessage,
      setMenuLinkAction,
      setRoleAction,
      history,
      setUserAction,
    } = this.props;
    spinner(true);
    api
      .get(`users/${id}`)
      .then(resp => {
        const typeUser = resp.data.companies.length > 0 && resp.data.companies[0].type;
        const click = getClickByRole(typeUser, resp.data.role);
        const link = this.decorateMenuSelect(history.location.pathname.replace('/', ''));
        const clickProp = { ...click, [link]: true };
        setMenuLinkAction(clickProp);
        setUserAction(resp.data);
        spinner(false);
        setRoleAction({ role: resp.data.role, menu: getMenuByRole(typeUser, resp.data.role) });
        this.setState({
          typeUser,
        });
      })
      .catch(err => {
        console.error(err);
        showMessage({ message: ['Erro ao buscar usuário'], icon: 'error' });
        spinner(false);
      });
  };

  handleLinkClick = link => {
    const { setMenuLinkAction } = this.props;
    const { typeUser } = this.state;
    const click = getClickByRole(typeUser);
    const clickProp = { ...click, [link]: true };
    setMenuLinkAction(clickProp);
    this.redirect(`/${link === 'inicio' ? '' : link}`);
  };

  redirect = page => {
    const { history } = this.props;
    history.push(page);
  };

  render() {
    const { click, role } = this.props;
    return (
      <Menu>
        {role.menu.map(menu => (
          <ItemMenu
            key={uniqueId()}
            onClick={() => this.handleLinkClick(menu.link)}
            selected={click[menu.link]}
          >
            {menu.name}
          </ItemMenu>
        ))}
      </Menu>
    );
  }
}

MenuIndex.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  role: PropTypes.shape({}).isRequired,
  setMenuLinkAction: PropTypes.func.isRequired,
  click: PropTypes.shape({}).isRequired,
  spinner: PropTypes.func.isRequired,
  setRoleAction: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  setUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  click: state.authReducer.click,
  role: state.authReducer.role,
  spinner: toggleSpinner,
  showMessage: showMessageBox,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setMenuLinkAction: setMenuLink,
      setRoleAction: setRole,
      setUserAction: setUser,
    },
    dispatch
  );

const MenuIndexConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuIndex);

export default withRouter(MenuIndexConnect);
