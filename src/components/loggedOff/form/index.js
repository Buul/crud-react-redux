import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import validate from './validate';
import { BoxForm, ErrorForm } from '../style';
import { Input, Button, LinkButton, Typography } from '../../ui';
import { login } from '../../../services/auth';
import {
  toggleSpinner,
  showMessageBox,
  setActivateUser,
  setClientLogged,
  setRole,
} from '../../../actions';
import api from '../../../services/api';

const INITIAL_VALUE = {
  cpf: '',
  password: '',
};

class FormLogin extends Component {
  state = {
    errors: { ...INITIAL_VALUE },
    form: {
      cpf: '',
      password: '',
      repeatPassword: '',
    },
    unauthorized: false,
    userSelected: {},
    activeUser: false,
  };

  componentWillReceiveProps(nextProps) {
    const { recoverPassword, activateUser } = this.props;
    if (recoverPassword !== nextProps.recoverPassword) {
      this.onClean();
    }
    if (activateUser.active !== nextProps.activateUser.active)
      if (nextProps.activateUser.active) this.getUserEmail(nextProps.activateUser.userData.uid);
  }

  keyHandler = e => {
    const { recoverPassword, activateUser } = this.props;
    const action = recoverPassword ? 'recovery' : '';
    if (e.key === 'Enter') {
      if (activateUser.active) {
        this.activeUser();
      } else {
        this.submitLogin(action);
      }
    }
  };

  onClean = () => {
    this.setState({
      errors: { ...INITIAL_VALUE },
      form: { ...INITIAL_VALUE },
      unauthorized: false,
    });
  };

  getUserEmail = email => {
    const { spinner, showMessage } = this.props;
    spinner(true);
    api
      .get(`?e=${email}`)
      .then(resp => {
        if (resp.data && resp.data[0].confirmed_at === null) {
          this.setState({ userSelected: resp.data && resp.data[0] });
        } else {
          this.setState({ activeUser: true });
        }

        spinner(false);
      })
      .catch(err => {
        console.error(err);
        showMessage({ message: ['Erro ao buscar usuários'], icon: 'error' });
        spinner(false);
      });
  };

  handleChange = event => {
    const { form, errors } = this.state;
    this.setState({
      form: { ...form, [event.target.name]: event.target.value },
      errors: { ...errors, [event.target.name]: null },
      unauthorized: false,
    });
  };

  handleSubmit = action => {
    this.submitLogin(action);
  };

  submitLogin = action => {
    const { form } = this.state;
    const { history } = this.props;

    const errors = validate(form, action);
    if (isEmpty(errors)) {
      if (action === 'recovery') {
        history.push('/verify');
      } else {
        this.login({ cpf: form.cpf, password: form.password }, history);
      }
    } else {
      this.setState({ errors });
    }
  };

  handleActivateUser = () => {
    this.activeUser();
  };

  activeUser = () => {
    const { form } = this.state;

    const errors = validate(form, 'activeUser');
    if (isEmpty(errors)) {
      this.onActiveUser();
    } else {
      this.setState({ errors });
    }
  };

  onActiveUser = () => {
    const {
      setActivateUserAction,
      spinner,
      setClientLoggedAction,
      history,
      showMessage,
    } = this.props;
    const { form, userSelected } = this.state;
    const data = {
      user: {
        password: form.password,
      },
    };
    spinner(true);
    api
      .put(`users/${userSelected.id}`, data)
      .then(resp => {
        login({
          token: resp.headers.client,
          userId: resp.data.id,
          companyId: resp.data.company && resp.data.company[0].id,
        });
        setClientLoggedAction(resp.data);
        spinner(false);
        history.push('/');
        setActivateUserAction({ active: false, userData: {} });
      })
      .catch(err => {
        console.error(err);
        showMessage({ message: ['Erro ao ativar usuário'], icon: 'error' });
        spinner(false);
      });
  };

  login = (data, history) => {
    const { setClientLoggedAction, spinner, showMessage } = this.props;
    spinner(true);
    api
      .post('auth/sign_in', data)
      .then(resp => {
        login({
          token: resp.headers.client,
          userId: resp.data.data.id,
          companyId: resp.data.data.companies.length > 0 && resp.data.data.companies[0].id,
        });
        setClientLoggedAction(resp.data.data);
        spinner(false);
        history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          this.setState({ unauthorized: true });
        } else {
          showMessage({ message: ['Erro ao realizar o login'], icon: 'error' });
        }
        spinner(false);
      });
  };

  handleRedirectLogin = () => {
    const { history, setActivateUserAction } = this.props;
    history.push('/');
    setActivateUserAction({ active: false, userData: {} });
    this.setState({ activeUser: false });
  };

  renderUserActiveUser = () => (
    <Typography
      textalign="center"
      display="inline"
      size={20}
      weight="600"
      color="success"
      lineheight="26"
      onClickLink={this.handleRedirectLogin}
    >
      Usuário já está ativo, <div className="link">click aqui</div> para realizar o login.
    </Typography>
  );

  render() {
    const { recoverPassword, history, activateUser } = this.props;
    const { errors, form, unauthorized, activeUser } = this.state;
    return (
      <BoxForm>
        {(activeUser && this.renderUserActiveUser()) || (
          <Form className="login-form" style={{ width: '100%' }}>
            {!activateUser.active && (
              <Input
                errortext={errors.cpf}
                error={errors.cpf}
                label="CPF"
                required
                mask="999.999.999-99"
                name="cpf"
                onChange={this.handleChange}
                value={form.cpf}
                placeholder="000.000.000-00"
                onKeyUp={this.keyHandler}
              />
            )}
            <div style={{ display: !recoverPassword ? 'block' : 'none' }}>
              <Input
                errortext={errors.password}
                error={errors.password}
                label="Senha"
                required
                name="password"
                onChange={this.handleChange}
                value={form.password}
                type="password"
                placeholder="******"
                onKeyUp={this.keyHandler}
              />
              {(activateUser.active && (
                <React.Fragment>
                  <Input
                    errortext={errors.repeatPassword}
                    error={errors.repeatPassword}
                    label="Repita senha"
                    required
                    name="repeatPassword"
                    onChange={this.handleChange}
                    value={form.repeatPassword}
                    type="password"
                    placeholder="Repita a sua senha."
                    onKeyUp={this.keyHandler}
                  />
                  <Row>
                    <Col span={24}>
                      <Button onClick={this.handleActivateUser}>Confirmar</Button>
                    </Col>
                  </Row>
                </React.Fragment>
              )) || (
                <Row className="actionRow">
                  <Col span={10} className="actionCol">
                    <LinkButton onClick={() => history.push('/recovery')}>
                      Esqueceu a senha
                    </LinkButton>
                  </Col>
                  <Col span={10} offset={4} className="actionCol">
                    <Button onClick={this.handleSubmit}>Login</Button>
                  </Col>
                </Row>
              )}
            </div>
            <Row style={{ display: recoverPassword ? 'block' : 'none' }}>
              <Col span={10}>
                <Button onClick={() => this.handleSubmit('recovery')}>Recuperar</Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ErrorForm>
                  <Typography size={20} color="error" lineheight="26">
                    {unauthorized && 'Cpf ou senha inválidos'}
                  </Typography>
                </ErrorForm>
              </Col>
            </Row>
          </Form>
        )}
      </BoxForm>
    );
  }
}

FormLogin.propTypes = {
  recoverPassword: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  setClientLoggedAction: PropTypes.func,
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  setActivateUserAction: PropTypes.func.isRequired,
  activateUser: PropTypes.shape({
    active: PropTypes.bool,
    userData: PropTypes.shape({ uid: PropTypes.string }),
  }),
};

FormLogin.defaultProps = {
  recoverPassword: false,
  activateUser: { active: false },
  setClientLoggedAction: () => {},
};

const mapStateToProps = state => ({
  activateUser: state.authReducer.activateUser,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setClientLoggedAction: setClientLogged,
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      setActivateUserAction: setActivateUser,
      setRoleAction: setRole,
    },
    dispatch
  );

const FormLoginConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormLogin);

export default withRouter(FormLoginConnect);
