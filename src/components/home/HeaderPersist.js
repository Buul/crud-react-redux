import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconCircle from '../ui/IconCircleUI';
import { Header } from './style';
import { persistMode, setMenuLink } from '../../actions';
import Typography from '../ui/TypographyUI';

const decorateMenuSelect = value => {
  switch (value) {
    case '':
      return 'inicio';
    case 'users':
      return 'conta';
    default:
      return value;
  }
};

const HeaderPersist = ({ history, persistModeAction, persist, setMenuLinkAction }) => (
  <Header padding="30">
    <IconCircle
      icon="arrow-left"
      size="16"
      border="none"
      onClick={() => {
        persistModeAction({ active: false, title: '' });
        const link = decorateMenuSelect(persist.back);
        history.push(`/${persist.back}`);
        const click = {
          inicio: false,
          conta: false,
          demandas: false,
          documentos: false,
        };
        const clickProp = { ...click, [link]: true };
        setMenuLinkAction(clickProp);
      }}
    />
    <Typography size={30} weight="600" lineheight="36" color="black">
      {persist.title}
    </Typography>
    <div />
  </Header>
);

HeaderPersist.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  persist: PropTypes.shape({}),
  persistModeAction: PropTypes.func.isRequired,
  setMenuLinkAction: PropTypes.func.isRequired,
};

HeaderPersist.defaultProps = {
  persist: {},
};

const mapStateToProps = state => ({
  persist: state.userReducer.persist,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      persistModeAction: persistMode,
      setMenuLinkAction: setMenuLink,
    },
    dispatch
  );

const HeaderPersistConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderPersist);

export default withRouter(HeaderPersistConnect);
