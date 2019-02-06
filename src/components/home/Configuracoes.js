import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ContentConfigucoes, MenuLinkConfiguracoes } from './style';
import { persistMode } from '../../actions';

const MenuConfiguracoes = ({ persistModeAction, history }) => (
  <ContentConfigucoes>
    <MenuLinkConfiguracoes
      className="link"
      onClick={() => {
        persistModeAction({ active: true, title: 'Demanda', back: '' });
        history.push('/configuracoes-demanda');
      }}
    >
      Demanda
    </MenuLinkConfiguracoes>
  </ContentConfigucoes>
);

MenuConfiguracoes.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  persistModeAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      persistModeAction: persistMode,
    },
    dispatch
  );

const MenuConfiguracoesConnect = connect(
  null,
  mapDispatchToProps
)(MenuConfiguracoes);

export default withRouter(MenuConfiguracoesConnect);
