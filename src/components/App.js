import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isAuthenticated, logout, setTokenActivateUser } from '../services/auth';
import RoutesLoggedOff from '../routesLoggedOff';
import RoutesLoggedIn from '../routesLoggedIn';
import Styles from '../styles/GlobalStyles';
import LoadingOverlay from './ui/LoadingOverlayUI';
import MessageBox from './dialogs/MessageBox';
import { removeDialog, setActivateUser, toggleSpinner, showMessageBox } from '../actions';
import { urlParamsToObj } from '../helpers';

class App extends Component {
  loaderStyle = {
    width: '100%',
    height: '100%',
    display: 'inline-table',
    position: 'absolute',
  };

  state = {
    isAuthenticatedState: false,
  };

  componentWillMount() {
    const { setActivateUserAction } = this.props;
    const obj = urlParamsToObj();

    if (!isEmpty(obj)) {
      setActivateUserAction({ active: true, userData: obj });
      logout();
      setTokenActivateUser(obj.client);
    }
    this.verifyAuthenticated();
  }

  componentWillReceiveProps() {
    this.verifyAuthenticated();
  }

  verifyAuthenticated = () => {
    this.setState({ isAuthenticatedState: isAuthenticated() });
  };

  render() {
    const { isAuthenticatedState } = this.state;
    const { busy, dialogs, removeDialogAction } = this.props;
    return (
      <LoadingOverlay spinner active={busy} style={this.loaderStyle}>
        {(isAuthenticatedState && <RoutesLoggedIn />) || <RoutesLoggedOff />}
        <Styles />

        {map(dialogs, (dialog, index) => {
          let componentClass = null;
          switch (dialog.type) {
            case 'MessageBox':
              componentClass = MessageBox;
              break;
            case 'Confirmation':
              componentClass = MessageBox;
              break;
            case 'Progress':
              componentClass = MessageBox;
              break;
            default:
          }
          if (!componentClass) {
            return null;
          }
          return React.createElement(componentClass, {
            key: `${dialog.type}.${index}`,
            onCloseModal: () => removeDialogAction(dialog),
            ...dialog,
          });
        })}
      </LoadingOverlay>
    );
  }
}

App.propTypes = {
  busy: PropTypes.bool,
  dialogs: PropTypes.arrayOf(PropTypes.shape({})),
  removeDialogAction: PropTypes.func.isRequired,
  setActivateUserAction: PropTypes.func.isRequired,
};

App.defaultProps = {
  busy: false,
  dialogs: [],
};

const mapStateToProps = state => ({
  client: state.authReducer.client,
  busy: Boolean(state.busyCounterReducer),
  dialogs: state.dialogReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeDialogAction: removeDialog,
      setActivateUserAction: setActivateUser,
      spinner: toggleSpinner,
      showMessage: showMessageBox,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
