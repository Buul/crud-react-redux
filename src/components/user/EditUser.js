import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button } from '../ui';
import { Painel, BtnPainel } from './style';
import { throwsException } from '../../helpers/throwsException';
import {
  CONTA_EMPRESA,
  CONTA_CLINICA,
  FREELANCER_ENFERMEIRO,
  FREELANCER_ENGENHEIRO,
  FREELANCER_MEDICO,
  FREELANCER_TECNICO,
  WORK_DOCTOR,
  WORK_NURSE,
  WORK_TECHNICIAN,
  SAFETY_ENGINEER,
  CLINIC,
  ENTERPRISE,
} from '../../helpers/constants';
import api from '../../services/api';
import { toggleSpinner, showMessageBox, persistMode, setUser } from '../../actions';

import DadosEmpresaFormEdit from './dadosUsuario/edit';
import { validate } from './dadosUsuario/validate';

const DADOS_USUARIO = {
  cpf: '',
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  rg: '',
  dataNasc: '',
  crm: '',
  rqe: [],
  coren: '',
  crea: '',
  regMte: '',
  showForm: false,
  success: false,
};

class EditUser extends Component {
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
    this.setObj();
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
      crm: user.crm,
      coren: user.coren,
      reg_mte: user.reg_mte,
      crea: user.crea,
      rqe: user.rqe,
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

  getTipoConta = type => {
    switch (type) {
      case CLINIC:
        return CONTA_CLINICA;
      case ENTERPRISE:
        return CONTA_EMPRESA;
      case WORK_DOCTOR:
        return FREELANCER_MEDICO;
      case WORK_NURSE:
        return FREELANCER_ENFERMEIRO;
      case SAFETY_ENGINEER:
        return FREELANCER_ENGENHEIRO;
      case WORK_TECHNICIAN:
        return FREELANCER_TECNICO;
      default:
        break;
    }
    return '';
  };

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

  handleSubmitDadosUsuario = () => {
    const {
      form: { dadosUsuario },
      errors,
      persona,
      form,
    } = this.state;
    if (!dadosUsuario.showForm) {
      this.actionCollapse();
    } else {
      const errorsReturn = validate(dadosUsuario, persona, true);
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
    this.updateUser();
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

  updateUser = () => {
    const { showMessage, history, setUserAction, persistModeAction, spinner, user } = this.props;
    spinner(true);
    const data = this.setRequestUser();
    api
      .put(`users/${user.id}`, data)
      .then(resp => {
        setUserAction(resp.data);
        showMessage({ message: ['Conta atualizada com sucesso!'], icon: 'success' });
        history.push('/');
        persistModeAction({ active: false, title: '' });
        spinner(false);
      })
      .catch(err => {
        console.error(err);
        const message = throwsException(
          err.response.data.errors.full_messages,
          'Erro ao atualizar Conta!'
        );
        showMessage({ message, icon: 'error' });
        spinner(false);
      });
  };

  setRequestUser = () => {
    const {
      form: { dadosUsuario },
    } = this.state;

    const user = {
      user: {
        cpf: dadosUsuario.cpf,
        name: dadosUsuario.nome,
        email: dadosUsuario.email,
        last_name: dadosUsuario.sobrenome,
        phone_number: dadosUsuario.telefone,
      },
    };

    if (dadosUsuario.rg) user.user.rg = dadosUsuario.rg;
    if (dadosUsuario.dataNasc) user.user.birthdate = dadosUsuario.dataNasc;
    return user;
  };

  render() {
    const {
      form: { dadosUsuario },
      errors: { dadosUsuarioError },
      persona,
      showBtnSave,
    } = this.state;
    return (
      <Painel>
        {/* DADOS DA EMPRESA */}
        <Card
          title="Dados do Usuário"
          subtitle="Insira os dados do usuário que você está criando agora"
          collapse={dadosUsuario.showForm}
          onClick={this.handleSubmitDadosUsuario}
          borderSucess={dadosUsuario.success}
          iconColor={dadosUsuario.success ? '#00A66B' : '#999DAF'}
        >
          <DadosEmpresaFormEdit
            form={dadosUsuario}
            errors={dadosUsuarioError}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
            tipoConta={persona}
          />
        </Card>
        {showBtnSave && (
          <BtnPainel>
            <Button onClick={this.onSave}>Confirmar</Button>
          </BtnPainel>
        )}
      </Painel>
    );
  }
}

EditUser.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  user: PropTypes.shape({}).isRequired,
  spinner: PropTypes.func.isRequired,
  setUserAction: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  persistModeAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      persistModeAction: persistMode,
      setUserAction: setUser,
    },
    dispatch
  );

const EditUserConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);

export default withRouter(EditUserConnect);
