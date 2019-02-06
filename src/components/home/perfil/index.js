import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout, getCompanyTokenCompanyId, getUserTokenUserId } from '../../../services/auth';
import api from '../../../services/api';
import { ContentConfigucoes, MenuLinkConfiguracoes } from '../style';
import { persistMode, setCompany, toggleSpinner, showMessageBox, setUser } from '../../../actions';

const getCompanyById = (spinner, showMessage, setCompanyAction, persistModeAction, history) => {
  spinner(true);
  const id = getCompanyTokenCompanyId();
  api
    .get(`companies/${id}`)
    .then(resp => {
      setCompanyAction(resp.data);
      persistModeAction({
        active: true,
        title: `Editar empresa`,
        back: 'inicio',
      });
      history.push('/conta-editar');
      spinner(false);
    })
    .catch(err => {
      console.error(err);
      showMessage({ message: ['Erro ao buscar empresa'], icon: 'error' });
      spinner(false);
    });
};

const getUserById = (spinner, showMessage, setUserAction, persistModeAction, history) => {
  spinner(true);
  const id = getUserTokenUserId();
  api
    .get(`users/${id}`)
    .then(resp => {
      setUserAction(resp.data);
      persistModeAction({
        active: true,
        title: `Editar usuário`,
        back: 'inicio',
      });
      history.push('/user-editar');
      spinner(false);
    })
    .catch(err => {
      console.error(err);
      showMessage({ message: ['Erro ao buscar usuário'], icon: 'error' });
      spinner(false);
    });
};

const PerfilMenu = ({
  history,
  setCompanyAction,
  persistModeAction,
  spinner,
  showMessage,
  setUserAction,
  user,
}) => (
  <ContentConfigucoes>
    <MenuLinkConfiguracoes
      className="link"
      onClick={() => getUserById(spinner, showMessage, setUserAction, persistModeAction, history)}
    >
      Meus Dados
    </MenuLinkConfiguracoes>
    {user.role !== 'BackOffice' && (
      <MenuLinkConfiguracoes
        className="link"
        onClick={() =>
          getCompanyById(spinner, showMessage, setCompanyAction, persistModeAction, history)
        }
      >
        Dados da Empresa
      </MenuLinkConfiguracoes>
    )}
    <MenuLinkConfiguracoes
      className="link"
      onClick={() => {
        logout();
        history.push('/');
        window.location.reload();
      }}
    >
      Sair
    </MenuLinkConfiguracoes>
  </ContentConfigucoes>
);

PerfilMenu.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  persistModeAction: PropTypes.func.isRequired,
  setCompanyAction: PropTypes.func.isRequired,
  setUserAction: PropTypes.func.isRequired,
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      setCompanyAction: setCompany,
      setUserAction: setUser,
      persistModeAction: persistMode,
    },
    dispatch
  );

const PerfilMenuConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(PerfilMenu);

export default withRouter(PerfilMenuConnect);
