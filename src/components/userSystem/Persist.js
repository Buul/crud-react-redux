import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, findIndex } from 'lodash';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button, PersistPainel, PersistBtnPainel } from '../ui';
import { throwsException } from '../../helpers/throwsException';
import api from '../../services/api';
import { toggleSpinner, showMessageBox, persistMode, setUsersByCompanyId } from '../../actions';

import Form from './form';
import { validate } from './form/validate';

const DADOS_USUARIO = {
  cpf: '',
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  rg: '',
  dataNasc: '',
  role: 'Admin',
  showForm: true,
  success: false,
};

class Persist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBtnSave: true,
      errors: {
        dadosUsuarioError: { ...DADOS_USUARIO },
      },
      form: {
        dadosUsuario: { ...DADOS_USUARIO },
      },
    };
  }

  componentWillMount() {
    const { edit } = this.props;
    if (edit) this.setObj();
  }

  setObj = () => {
    const { user } = this.props;
    const { form } = this.state;

    const dadosUsuario = {
      cpf: user.cpf,
      nome: user.name,
      email: user.email,
      sobrenome: user.last_name,
      telefone: user.phone_number,
      rg: user.rg,
      dataNasc: user.birthdate && this.formatDate(user.birthdate),
      role: user.role,
      showForm: true,
    };

    this.setState({
      form: {
        ...form,
        dadosUsuario,
      },
    });
  };

  formatDate = date => `${date.substring(8, 10)}-${date.substring(5, 8)}${date.substring(0, 4)}`;

  handleChange = event => {
    const { form, errors } = this.state;

    this.setState({
      form: {
        ...form,
        dadosUsuario: {
          ...form.dadosUsuario,
          [event.target.name]: event.target.value,
        },
      },
      errors: {
        ...errors,
        dadosUsuarioError: { ...errors.dadosUsuarioError, [event.target.name]: null },
      },
    });
  };

  actionCollapse = () => {
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        dadosUsuario: { ...form.dadosUsuario, showForm: !form.dadosUsuario.showForm },
      },
    });
  };

  collapseAndSuccess = (value, showForm) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        dadosUsuario: { ...form.dadosUsuario, success: value, showForm },
      },
    });
  };

  handleChangeRadio = e => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        dadosUsuario: { ...form.dadosUsuario, role: e.target.value },
      },
    });
  };

  handleSubmitDadosUsuario = () => {
    const {
      form: { dadosUsuario },
      errors,
      form,
    } = this.state;
    if (!dadosUsuario.showForm) {
      this.actionCollapse();
    } else {
      const errorsReturn = validate(dadosUsuario);
      if (isEmpty(errorsReturn)) {
        this.collapseAndSuccess(true);
        this.setState({
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              success: true,
              showForm: false,
            },
          },
          showBtnSave: true,
        });
      } else {
        this.setState({
          showBtnSave: false,
          errors: { ...errors, dadosUsuarioError: errorsReturn },
          form: {
            ...form,
            dadosUsuario: { ...form.dadosUsuario, success: false },
          },
        });
      }
    }
  };

  onSave = () => {
    const {
      form: { dadosUsuario },
      errors,
      form,
    } = this.state;
    const { edit } = this.props;

    const errorsReturn = validate(dadosUsuario);
    if (isEmpty(errorsReturn)) {
      this.collapseAndSuccess(true);
      this.setState({
        form: {
          ...form,
          dadosUsuario: {
            ...form.dadosUsuario,
            success: true,
            showForm: false,
          },
        },
      });
      if (edit) this.updateUserByCompanyId();
      else this.addUserByCompanyId();
    } else {
      this.setState({
        showBtnSave: false,
        errors: { ...errors, dadosUsuarioError: errorsReturn },
        form: {
          ...form,
          dadosUsuario: { ...form.dadosUsuario, success: false },
        },
      });
    }
  };

  handleChangeDate = (_date, dateString, key) => {
    const { form, errors } = this.state;
    this.setState({
      form: {
        ...form,
        dadosUsuario: { ...form.dadosUsuario, [key]: dateString },
      },
      errors: {
        ...errors,
        dadosUsuarioError: { ...errors.dadosUsuarioError, [key]: null },
      },
    });
  };

  addUserByCompanyId = () => {
    const {
      showMessage,
      history,
      persistModeAction,
      spinner,
      setUsersByCompanyIdAction,
      usersByCompanyId: { listUser, company },
    } = this.props;
    spinner(true);
    const data = this.setRequestUser();
    api
      .post('auth', data)
      .then(resp => {
        listUser.push(resp.data.data);
        setUsersByCompanyIdAction({ listUser, company });
        persistModeAction({ active: false, title: '' });
        showMessage({ message: ['Usuário adicionado com sucesso!'], icon: 'success' });
        history.push('/users');
        spinner(false);
      })
      .catch(err => {
        console.error(err);
        const message = throwsException(
          err.response.data.errors.full_messages,
          'Erro ao adicionar Usuário!'
        );
        showMessage({ message, icon: 'error' });
        spinner(false);
      });
  };

  updateUserByCompanyId = () => {
    const {
      showMessage,
      history,
      persistModeAction,
      spinner,
      setUsersByCompanyIdAction,
      usersByCompanyId: { listUser, company },
      user,
    } = this.props;
    spinner(true);
    const data = this.setRequestUser();
    api
      .put(`users/${user.id}`, data)
      .then(resp => {
        const index = findIndex(listUser, { id: user.id });
        listUser.splice(index, user.id, resp.data);
        setUsersByCompanyIdAction({ listUser, company });
        persistModeAction({ active: false, title: '' });
        showMessage({ message: ['Usuário alterado com sucesso!'], icon: 'success' });
        history.push('/users');
        spinner(false);
      })
      .catch(err => {
        console.error(err);
        const message = throwsException(
          err.response.data.errors.full_messages,
          'Erro ao alterar Usuário!'
        );
        showMessage({ message, icon: 'error' });
        spinner(false);
      });
  };

  setRequestUser = () => {
    const {
      form: { dadosUsuario },
    } = this.state;

    const {
      usersByCompanyId: { company },
    } = this.props;
    const user = {
      company_id: company.id,
      role: dadosUsuario.role,
      password: '@@@12324@@@',
      cpf: dadosUsuario.cpf,
      name: dadosUsuario.nome,
      email: dadosUsuario.email,
      last_name: dadosUsuario.sobrenome,
      phone_number: dadosUsuario.telefone,
    };

    if (dadosUsuario.rg) user.rg = dadosUsuario.rg;
    if (dadosUsuario.dataNasc) user.birthdate = dadosUsuario.dataNasc;
    return user;
  };

  render() {
    const {
      form: { dadosUsuario },
      errors: { dadosUsuarioError },
      showBtnSave,
    } = this.state;
    const { edit } = this.props;
    return (
      <PersistPainel>
        {/* DADOS DA EMPRESA */}
        <Card
          title="Dados do Usuário"
          subtitle="Insira os dados do usuário que você está criando agora"
          collapse={dadosUsuario.showForm}
          onClick={this.handleSubmitDadosUsuario}
          borderSucess={dadosUsuario.success}
          iconColor={dadosUsuario.success ? '#00A66B' : '#999DAF'}
        >
          <Form
            form={dadosUsuario}
            errors={dadosUsuarioError}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
            handleChangeRadio={this.handleChangeRadio}
          />
        </Card>
        {showBtnSave && (
          <PersistBtnPainel>
            <Button onClick={this.onSave}>{edit ? 'Confirmar' : 'Salvar'}</Button>
          </PersistBtnPainel>
        )}
      </PersistPainel>
    );
  }
}

Persist.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  user: PropTypes.shape({}).isRequired,
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  persistModeAction: PropTypes.func.isRequired,
  setUsersByCompanyIdAction: PropTypes.func.isRequired,
  usersByCompanyId: PropTypes.shape({}).isRequired,
  edit: PropTypes.bool,
};

Persist.defaultProps = {
  edit: false,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  usersByCompanyId: state.userReducer.usersByCompanyId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      persistModeAction: persistMode,
      setUsersByCompanyIdAction: setUsersByCompanyId,
    },
    dispatch
  );

const PersistConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Persist);

export default withRouter(PersistConnect);
