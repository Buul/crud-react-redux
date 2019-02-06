import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqBy, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
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
import {
  toggleSpinner,
  showMessageBox,
  setCnaes,
  setEmpresas,
  persistMode,
  setBancos,
} from '../../actions';

import DadosEmpresaFormEdit from './dadosEmpresa/edit';
import { validate as dadosEmpresaValidate } from './dadosEmpresa/validate';

const DADOS_EMPRESA = {
  cnpj: '',
  nomeFantasia: '',
  razaoSocial: '',
  iscricaoMunicipal: '',
  iscricaoEstadual: '',
  logradouro: '',
  numero: '',
  cep: '',
  cnae: [],
  bairro: '',
  cidade: '',
  estado: '',
  telefoneComercial: '',
  banco: '',
  tipoContaBancaria: '',
  agencia: '',
  digAgencia: '',
  conta: '',
  digConta: '',
};

class EditCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBtnSave: true,
      errors: {
        dadosEmpresaError: { ...DADOS_EMPRESA },
      },
      form: {
        dadosEmpresa: { ...DADOS_EMPRESA },
      },
    };
  }

  componentWillMount() {
    const { setCnaesAction, setBancosAction, spinner, showMessage } = this.props;
    spinner(true);
    Promise.all([this.getCnaes(spinner, showMessage), this.getBanks(spinner, showMessage)]).then(
      ([cnaesResp, bankResp]) => {
        const ans = uniqBy(cnaesResp.data, 'id');
        setCnaesAction(ans);
        setBancosAction(bankResp.data);
        this.setObj();
        spinner(false);
      }
    );
  }

  setObj = () => {
    const { company } = this.props;
    const { form } = this.state;
    const tipoConta = this.getTipoConta(company.type);
    const dadosEmpresa = {
      cnpj: company.cnpj,
      nomeFantasia: company.fantasy_name,
      razaoSocial: company.social_name,
      iscricaoMunicipal: company.municipal_registration,
      iscricaoEstadual: company.state_registration,
      cnae: company.cnaes,
      logradouro: !isEmpty(company.addresses) && company.addresses[0].public_place,
      numero: !isEmpty(company.addresses) && company.addresses[0].complement,
      cep: !isEmpty(company.addresses) && company.addresses[0].cep,
      bairro: !isEmpty(company.addresses) && company.addresses[0].neighborhood,
      cidade: !isEmpty(company.addresses) && company.addresses[0].city,
      estado: !isEmpty(company.addresses) && company.addresses[0].state,
      telefoneComercial: company.phone_number,
      banco: !isEmpty(company.accounts) && company.accounts[0].bank,
      agencia: !isEmpty(company.accounts) && company.accounts[0].agency,
      digAgencia: !isEmpty(company.accounts) && company.accounts[0].agency_digit,
      conta: !isEmpty(company.accounts) && company.accounts[0].account_number,
      digConta: !isEmpty(company.accounts) && company.accounts[0].account_digit,
      tipoContaBancaria: !isEmpty(company.accounts) && company.accounts[0].account_type,
      tipoConta,
      showForm: true,
    };

    this.setState({
      form: {
        ...form,
        dadosEmpresa,
      },
      persona: tipoConta,
    });
  };

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

  getCnaes = (spinner, showMessage) =>
    axios
      .get(`https://servicodados.ibge.gov.br/api/v2/cnae/classes/02101/subclasses`)
      .catch(error => {
        console.error(error);
        showMessage({ message: ['Erro ao buscar CNAES'], icon: 'error' });
        spinner(false);
      });

  getBanks = (spinner, showMessage) =>
    api.get('banks').catch(error => {
      console.error(error);
      showMessage({ message: ['Erro ao buscar bancos'], icon: 'error' });
      spinner(false);
    });

  handleChange = event => {
    const { form, errors } = this.state;

    this.setState({
      form: {
        ...form,
        dadosEmpresa: {
          ...form.dadosEmpresa,
          [event.target.name]: event.target.value,
        },
      },
      errors: {
        ...errors,
        dadosEmpresaError: { ...errors.dadosEmpresaError, [event.target.name]: null },
      },
    });
  };

  handleChangeSelect = (key, value) => {
    const { form, errors } = this.state;

    this.setState({
      form: {
        ...form,
        dadosEmpresa: { ...form.dadosEmpresa, [key]: value },
      },
      errors: {
        ...errors,
        dadosEmpresaError: {
          ...errors.dadosEmpresaError,
          [key]: key === 'cnae' ? [] : null,
        },
      },
    });
  };

  buscarCEP = (cep, formParam) => {
    const { form, errors } = this.state;

    axios
      .get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
      .then(resp => {
        const {
          data: { logradouro, bairro, localidade, uf },
          data,
        } = resp;
        if (data.erro) {
          this.setState({
            form: {
              ...form,
              [formParam]: {
                ...form[formParam],
                logradouro: '',
                bairro: '',
                cidade: '',
                estado: '',
              },
            },
          });
        } else {
          this.setState({
            form: {
              ...form,
              [formParam]: {
                ...form[formParam],
                logradouro,
                bairro,
                cidade: localidade,
                estado: uf,
              },
            },
            errors: {
              ...errors,
              dadosEmpresaError: {
                ...errors.dadosEmpresaError,
                logradouro: null,
                bairro: null,
                cidade: null,
                estado: null,
              },
            },
          });
        }
      })
      .catch(() => {
        this.setState({
          form: {
            ...form,
            [formParam]: {
              ...form[formParam],
              logradouro: '',
              bairro: '',
              cidade: '',
              estado: '',
            },
          },
        });
      });
  };

  actionCollapse = () => {
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        dadosEmpresa: { ...form.dadosEmpresa, showForm: !form.dadosEmpresa.showForm },
      },
    });
  };

  collapseAndSuccess = (value, showForm) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        dadosEmpresa: { ...form.dadosEmpresa, success: value, showForm },
      },
    });
  };

  handleSubmitDadosEmpresa = () => {
    const {
      form: { dadosEmpresa },
      errors,
      persona,
      form,
    } = this.state;
    if (!dadosEmpresa.showForm) {
      this.actionCollapse();
    } else {
      const errorsReturn = dadosEmpresaValidate(dadosEmpresa, persona, true);
      const errorFilter = { ...errorsReturn };
      if (errorFilter.cnae.length === 0) delete errorFilter.cnae;
      if (errorFilter.rqe.length === 0) delete errorFilter.rqe;
      if (isEmpty(errorFilter)) {
        this.collapseAndSuccess(true);
        this.setState({
          form: {
            ...form,
            dadosEmpresa: {
              ...form.dadosEmpresa,
              success: true,
              showForm: false,
            },
          },
          showBtnSave: true,
        });
      } else {
        this.setState({
          showBtnSave: false,
          errors: { ...errors, dadosEmpresaError: errorsReturn },
          form: {
            ...form,
            dadosEmpresa: { ...form.dadosEmpresa, success: false },
          },
        });
      }
    }
  };

  onSave = () => {
    this.updateConta();
  };

  updateConta = () => {
    const { showMessage, history, persistModeAction, spinner, company, user } = this.props;
    spinner(true);
    const data = this.setRequestNewCompany();
    api
      .put(`companies/${company.id}`, data)
      .then(() => {
        spinner(false);
        showMessage({ message: ['Conta atualizada com sucesso!'], icon: 'success' });
        if (user.role === 'BackOffice') history.push('/conta');
        else history.push('/');
        persistModeAction({ active: false, title: '' });
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

  setRequestNewCompany = () => {
    const {
      form: { dadosEmpresa },
    } = this.state;

    const company = {
      company: {
        social_name: dadosEmpresa.razaoSocial,
        cnpj: dadosEmpresa.cnpj,
        phone_number: dadosEmpresa.telefoneComercial,
        cnaes: dadosEmpresa.cnae,
        addresses_attributes: [
          {
            cep: dadosEmpresa.cep,
            public_place: dadosEmpresa.logradouro,
            neighborhood: dadosEmpresa.bairro,
            city: dadosEmpresa.cidade,
            state: dadosEmpresa.estado,
            complement: dadosEmpresa.numero,
          },
        ],
      },
    };

    // company
    if (dadosEmpresa.nomeFantasia) company.company.fantasy_name = dadosEmpresa.nomeFantasia;
    if (dadosEmpresa.iscricaoEstadual)
      company.company.state_registration = dadosEmpresa.iscricaoEstadual;
    if (dadosEmpresa.iscricaoMunicipal)
      company.company.municipal_registration = dadosEmpresa.iscricaoMunicipal;
    if (dadosEmpresa.cnae) company.company.cnaes = dadosEmpresa.cnae;

    // accounts_attributes
    const accountsAttributes = {};
    if (dadosEmpresa.banco) accountsAttributes.bank = dadosEmpresa.banco;
    if (dadosEmpresa.digAgencia) accountsAttributes.bank = dadosEmpresa.banco;
    if (dadosEmpresa.agencia) accountsAttributes.agency = dadosEmpresa.agencia;
    if (dadosEmpresa.conta) accountsAttributes.account_number = dadosEmpresa.conta;
    if (dadosEmpresa.digAgencia) accountsAttributes.agency_digit = dadosEmpresa.digAgencia;
    if (dadosEmpresa.number) accountsAttributes.account_number = dadosEmpresa.number;
    if (dadosEmpresa.digConta) accountsAttributes.account_digit = dadosEmpresa.digConta;
    if (dadosEmpresa.tipoContaBancaria)
      accountsAttributes.account_type = dadosEmpresa.tipoContaBancaria;
    if (!isEmpty(accountsAttributes)) company.company.accounts_attributes = [accountsAttributes];

    return company;
  };

  render() {
    const {
      form: { dadosEmpresa },
      errors: { dadosEmpresaError },
      persona,
      showBtnSave,
    } = this.state;
    return (
      <Painel>
        {/* DADOS DA EMPRESA */}
        <Card
          title="Dados Comerciais"
          subtitle="Insira os dados comerciais do perfil"
          collapse={dadosEmpresa.showForm}
          onClick={this.handleSubmitDadosEmpresa}
          borderSucess={dadosEmpresa.success}
          iconColor={dadosEmpresa.success ? '#00A66B' : '#999DAF'}
        >
          <DadosEmpresaFormEdit
            form={dadosEmpresa}
            errors={dadosEmpresaError}
            handleChange={this.handleChange}
            onChangeSelect={this.handleChangeSelect}
            buscarCEP={this.buscarCEP}
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

EditCompany.propTypes = {
  setCnaesAction: PropTypes.func.isRequired,
  setBancosAction: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  user: PropTypes.shape({}).isRequired,
  company: PropTypes.shape({}).isRequired,
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  persistModeAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  company: state.userReducer.company,
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCnaesAction: setCnaes,
      setEmpresasAction: setEmpresas,
      setBancosAction: setBancos,
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      persistModeAction: persistMode,
    },
    dispatch
  );

const EditCompanyConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCompany);

export default withRouter(EditCompanyConnect);
