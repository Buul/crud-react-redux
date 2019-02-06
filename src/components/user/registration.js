import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqBy, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Button } from '../ui';
import { BtnPainel, Painel } from './style';
import { throwsException } from '../../helpers/throwsException';
import {
  CONTA_EMPRESA,
  TYPE_EMPRESA_CADASTRADA,
  TYPE_EMPRESA,
  TYPE_CLINICA_FREELANCER,
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

import DadosUsarioForm from './dadosUsuario';
import { validate as dadosUsarioValidate } from './dadosUsuario/validate';

import VinculoContaForm from './vinculoConta';

import DadosEmpresaForm from './dadosEmpresa';
import { validate as dadosEmpresaValidate } from './dadosEmpresa/validate';

import DadosFinanceiroForm from './dadosFinanceiro';
import { validate as dadosFinanceiroValidate } from './dadosFinanceiro/validate';

const DADOS_USUARIO = {
  cpf: '',
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  rg: '',
  dataNasc: '',
  showForm: false,
  success: false,
};

const VINCULO_CONTA = {
  searchValue: '',
  showForm: false,
  success: false,
};

const DADOS_EMPRESA = {
  cnpj: '',
  nomeFantasia: '',
  razaoSocial: '',
  iscricaoMunicipal: '',
  iscricaoEstadual: '',
  cnae: [],
  logradouro: '',
  numero: '',
  cep: '',
  bairro: '',
  cidade: '',
  estado: '',
  telefoneComercial: '',
  crm: '',
  rqe: [],
  banco: '',
  tipoContaBancaria: '',
  agencia: '',
  digAgencia: '',
  conta: '',
  digConta: '',
  coren: '',
  crea: '',
  regMte: '',
  showForm: false,
  success: false,
  showModalPersona: false,
};

const DADOS_FINANCEIRO = {
  cpf: '',
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  showForm: false,
  success: false,
};

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosComerciais: false,
      showBtnSave: false,
      persona: '',
      typeSelect: '',
      idEmpresa: '',
      role: 'Admin',
      errors: {
        dadosUsuarioError: { ...DADOS_USUARIO },
        vinculoContaError: { ...VINCULO_CONTA },
        dadosEmpresaError: { ...DADOS_EMPRESA },
        dadosFinanceiroError: { ...DADOS_FINANCEIRO },
      },
      form: {
        dadosUsuario: { ...DADOS_USUARIO },
        vinculoConta: { ...VINCULO_CONTA },
        dadosEmpresa: { ...DADOS_EMPRESA },
        dadosFinanceiro: { ...DADOS_FINANCEIRO },
      },
    };
  }

  componentDidMount() {
    const { setCnaesAction, setEmpresasAction, setBancosAction, spinner, showMessage } = this.props;
    spinner(true);
    Promise.all([
      this.getCnaes(spinner, showMessage),
      this.getCompanies(spinner, showMessage),
      this.getBanks(spinner, showMessage),
    ]).then(([cnaesResp, companyResp, bankResp]) => {
      const ans = uniqBy(cnaesResp.data, 'id');
      setCnaesAction(ans);
      setEmpresasAction(companyResp.data);
      setBancosAction(bankResp.data);
      spinner(false);
    });
  }

  getCnaes = (spinner, showMessage) =>
    axios
      .get(`https://servicodados.ibge.gov.br/api/v2/cnae/classes/02101/subclasses`)
      .catch(error => {
        console.error(error);
        showMessage({ message: ['Erro ao buscar CNAES'], icon: 'error' });
        spinner(false);
      });

  getCompanies = (spinner, showMessage) =>
    api.get('companies?t[]=Clinic&t[]=Enterprise').catch(error => {
      console.error(error);
      showMessage({ message: ['Erro ao buscar empresas'], icon: 'error' });
      spinner(false);
    });

  getBanks = (spinner, showMessage) =>
    api.get('banks').catch(error => {
      console.error(error);
      showMessage({ message: ['Erro ao buscar bancos'], icon: 'error' });
      spinner(false);
    });

  handleChange = (formParam, errorParam) => event => {
    const { form, errors } = this.state;

    this.setState({
      form: {
        ...form,
        [formParam]: {
          ...form[formParam],
          [event.target.name]: event.target.value,
        },
      },
      errors: {
        ...errors,
        [errorParam]: { ...errors[errorParam], [event.target.name]: null },
      },
    });
  };

  handleChangeDate = (_date, dateString, key, formParam, errorParam) => {
    const { form, errors } = this.state;
    this.setState({
      form: {
        ...form,
        [formParam]: { ...form[formParam], [key]: dateString },
      },
      errors: {
        ...errors,
        [errorParam]: { ...errors[errorParam], [key]: null },
      },
    });
  };

  handleChangeSelect = (key, value, formParam, errorParam) => {
    const { form, errors } = this.state;

    this.setState({
      form: {
        ...form,
        [formParam]: { ...form[formParam], [key]: value },
      },
      errors: {
        ...errors,
        [errorParam]: {
          ...errors[errorParam],
          [key]: key === 'cnae' || key === 'rqe' ? [] : null,
        },
      },
    });
  };

  actionCollapse = card => {
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [card]: { ...form[card], showForm: !form[card].showForm },
      },
    });
  };

  setSuccess = (obj, value) => {
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [obj]: { ...form[obj], success: value },
      },
    });
  };

  collapseAndSuccess = (obj, value, showForm) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [obj]: { ...form[obj], success: value, showForm },
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

  handleShowBtnSave = (data, success, idEmpresa, role) => {
    const { form } = this.state;
    this.setState({
      showBtnSave: data,
      form: {
        ...form,
        vinculoConta: { ...form.vinculoConta, success },
      },
      idEmpresa,
      role,
    });
  };

  setShowDadosComeciais = (newEmpresa, persona, success) => {
    const { form } = this.state;
    // eslint-disable-next-line no-nested-ternary
    const typeSelect = !newEmpresa
      ? TYPE_EMPRESA_CADASTRADA
      : persona === CONTA_EMPRESA
      ? TYPE_EMPRESA
      : TYPE_CLINICA_FREELANCER;
    this.setState({
      typeSelect,
      dadosComerciais: newEmpresa,
      persona,
      form: {
        ...form,
        vinculoConta: { ...form.vinculoConta, success },
      },
    });
  };

  handleSubmitDadosUsuario = () => {
    const {
      form: { dadosUsuario },
      errors,
    } = this.state;

    if (!dadosUsuario.showForm) {
      this.actionCollapse('dadosUsuario');
    } else {
      const errorsReturn = dadosUsarioValidate(dadosUsuario);
      if (isEmpty(errorsReturn)) {
        this.collapseAndSuccess('dadosUsuario', true, false);
      } else {
        this.setState(
          { errors: { ...errors, dadosUsuarioError: errorsReturn } },
          this.setSuccess('dadosUsuario', false)
        );
      }
    }
  };

  handleSubmitVinculoConta = () => {
    const {
      form: { dadosUsuario },
      errors,
      form,
    } = this.state;

    const errorsReturn = dadosUsarioValidate(dadosUsuario);
    if (isEmpty(errorsReturn)) {
      this.setState({
        form: {
          ...form,
          dadosUsuario: {
            ...form.dadosUsuario,
            showForm: false,
            success: true,
          },
          vinculoConta: {
            ...form.vinculoConta,
            showForm: !form.vinculoConta.showForm,
          },
        },
      });
    } else {
      this.setState(
        {
          errors: { ...errors, dadosUsuarioError: errorsReturn },
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              showForm: true,
            },
          },
        },

        this.setSuccess('dadosUsuario', false)
      );
    }
  };

  handleSubmitDadosEmopresa = () => {
    const {
      form: { dadosEmpresa },
      errors,
      persona,
      form,
    } = this.state;

    if (!dadosEmpresa.showForm) {
      this.actionCollapse('dadosEmpresa');
    } else {
      const errorsReturn = dadosEmpresaValidate(dadosEmpresa, persona);
      const errorFilter = { ...errorsReturn };
      if (errorFilter.cnae.length === 0) delete errorFilter.cnae;
      if (errorFilter.rqe.length === 0) delete errorFilter.rqe;
      if (isEmpty(errorFilter)) {
        this.collapseAndSuccess('dadosEmpresa', true);
        this.setState({
          form: {
            ...form,
            dadosEmpresa: {
              ...form.dadosEmpresa,
              success: true,
              showForm: false,
            },
            vinculoConta: { ...form.vinculoConta, showForm: false },
          },
        });
      } else {
        this.setState(
          { errors: { ...errors, dadosEmpresaError: errorsReturn } },
          this.setSuccess('dadosEmpresa', false)
        );
      }
    }
  };

  handleSubmitdadosFinanceiro = () => {
    const {
      form: { dadosEmpresa, dadosFinanceiro },
      errors,
      persona,
      form,
    } = this.state;

    const errorsReturn = dadosEmpresaValidate(dadosEmpresa, persona);
    const errorFilter = { ...errorsReturn };
    if (errorFilter.cnae.length === 0) delete errorFilter.cnae;
    if (errorFilter.rqe.length === 0) delete errorFilter.rqe;
    if (isEmpty(errorFilter)) {
      if (!dadosFinanceiro.showForm) {
        this.setState({
          form: {
            ...form,
            dadosFinanceiro: { ...form.dadosFinanceiro, showForm: true },
            vinculoConta: { ...form.vinculoConta, showForm: false },
            dadosEmpresa: {
              ...form.dadosEmpresa,
              showForm: false,
              success: true,
            },
          },
        });
      } else {
        this.validaDadosFianceiro(dadosFinanceiro, form, errors);
      }
    } else {
      this.setState(
        {
          errors: { ...errors, dadosEmpresaError: errorsReturn },
          form: {
            ...form,
            dadosEmpresa: {
              ...form.dadosEmpresa,
              showForm: true,
            },
          },
        },
        this.setSuccess('dadosEmpresa', false)
      );
    }
  };

  validaDadosFianceiro = (dadosFinanceiro, form, errors) => {
    const errorsReturnFinanceiro = dadosFinanceiroValidate(dadosFinanceiro);
    if (isEmpty(errorsReturnFinanceiro)) {
      this.setState({
        form: {
          ...form,
          dadosFinanceiro: {
            ...form.dadosFinanceiro,
            showForm: false,
            success: true,
          },
        },
        showBtnSave: true,
      });
    } else {
      this.setState(
        {
          errors: { ...errors, dadosFinanceiroError: errorsReturnFinanceiro },
          form: {
            ...form,
            dadosFinanceiro: {
              ...form.dadosFinanceiro,
              showForm: true,
            },
          },
        },
        this.setSuccess('dadosFinanceiro', false)
      );
    }
  };

  onSave = () => {
    const {
      form: { dadosUsuario, dadosEmpresa, dadosFinanceiro },
      persona,
      typeSelect,
    } = this.state;
    const errorsReturnUsuario = dadosUsarioValidate(dadosUsuario);
    const errorsReturnFinanceiro = dadosFinanceiroValidate(dadosFinanceiro);
    const errorsReturnEmpresa = dadosEmpresaValidate(dadosEmpresa, persona);
    const errorFilterEmpresa = { ...errorsReturnEmpresa };
    if (errorFilterEmpresa.cnae.length === 0) delete errorFilterEmpresa.cnae;
    if (errorFilterEmpresa.rqe.length === 0) delete errorFilterEmpresa.rqe;
    switch (typeSelect) {
      case TYPE_EMPRESA_CADASTRADA:
        if (isEmpty(errorsReturnUsuario)) {
          this.onValidate();
        } else {
          this.setError(
            errorsReturnUsuario,
            errorFilterEmpresa,
            errorsReturnEmpresa,
            errorsReturnFinanceiro
          );
        }
        break;
      case TYPE_CLINICA_FREELANCER:
        if (isEmpty(errorFilterEmpresa) && isEmpty(errorsReturnUsuario)) {
          this.onValidate();
        } else {
          this.setError(
            errorsReturnUsuario,
            errorFilterEmpresa,
            errorsReturnEmpresa,
            errorsReturnFinanceiro
          );
        }
        break;
      case TYPE_EMPRESA:
        if (
          isEmpty(errorFilterEmpresa) &&
          isEmpty(errorsReturnUsuario) &&
          isEmpty(errorsReturnFinanceiro)
        ) {
          this.onValidate();
        } else {
          this.setError(
            errorsReturnUsuario,
            errorFilterEmpresa,
            errorsReturnEmpresa,
            errorsReturnFinanceiro
          );
        }
        break;
      default:
        break;
    }
  };

  onValidate = () => {
    const { form, typeSelect } = this.state;
    switch (typeSelect) {
      case TYPE_EMPRESA_CADASTRADA:
        this.setState({
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              success: true,
              showForm: false,
            },
            vinculoConta: { ...form.vinculoConta, success: true, showForm: false },
          },
        });
        break;
      case TYPE_CLINICA_FREELANCER:
        this.setState({
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              success: true,
              showForm: false,
            },
            dadosEmpresa: {
              ...form.dadosEmpresa,
              success: true,
              showForm: false,
            },
            vinculoConta: { ...form.vinculoConta, success: true, showForm: false },
          },
        });
        break;
      case TYPE_EMPRESA:
        this.setState({
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              success: true,
              showForm: false,
            },
            dadosEmpresa: {
              ...form.dadosEmpresa,
              success: true,
              showForm: false,
            },
            dadosFinanceiro: {
              ...form.dadosFinanceiro,
              success: true,
              showForm: false,
            },
            vinculoConta: { ...form.vinculoConta, success: true, showForm: false },
          },
        });
        break;
      default:
        break;
    }

    this.persistConta();
  };

  setError = (
    errorsReturnUsuario,
    errorFilterEmpresa,
    errorsReturnEmpresa,
    errorsReturnFinanceiro
  ) => {
    const {
      errors: { dadosUsuarioError, dadosEmpresaError, dadosFinanceiroError },
      errors,
      form,
      typeSelect,
    } = this.state;

    switch (typeSelect) {
      case TYPE_EMPRESA_CADASTRADA:
        this.setState({
          errors: {
            ...errors,
            dadosUsuarioError: errorsReturnUsuario,
          },
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              success: false,
              showForm: true,
            },

            vinculoConta: { ...form.dadosUsuario, success: true, showForm: false },
          },
        });
        break;
      case TYPE_CLINICA_FREELANCER:
        this.setState({
          errors: {
            ...errors,
            dadosUsuarioError: isEmpty(errorsReturnUsuario)
              ? dadosUsuarioError
              : errorsReturnUsuario,
            dadosEmpresaError: isEmpty(errorFilterEmpresa)
              ? dadosEmpresaError
              : errorsReturnEmpresa,
          },
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              success: isEmpty(errorsReturnUsuario),
              showForm: !isEmpty(errorsReturnUsuario),
            },
            dadosEmpresa: {
              ...form.dadosEmpresa,
              success: isEmpty(errorFilterEmpresa),
              showForm: !isEmpty(errorFilterEmpresa),
            },
            vinculoConta: { ...form.dadosUsuario, success: true, showForm: false },
          },
        });
        break;
      case TYPE_EMPRESA:
        this.setState({
          errors: {
            ...errors,
            dadosUsuarioError: isEmpty(errorsReturnUsuario)
              ? dadosUsuarioError
              : errorsReturnUsuario,
            dadosEmpresaError: isEmpty(errorFilterEmpresa)
              ? dadosEmpresaError
              : errorsReturnEmpresa,
            dadosFinanceiroError: isEmpty(errorsReturnFinanceiro)
              ? dadosFinanceiroError
              : errorsReturnFinanceiro,
          },
          form: {
            ...form,
            dadosUsuario: {
              ...form.dadosUsuario,
              success: isEmpty(errorsReturnUsuario),
              showForm: !isEmpty(errorsReturnUsuario),
            },
            dadosEmpresa: {
              ...form.dadosEmpresa,
              success: isEmpty(errorFilterEmpresa),
              showForm: !isEmpty(errorFilterEmpresa),
            },
            dadosFinanceiro: {
              ...form.dadosFinanceiro,
              success: isEmpty(errorsReturnFinanceiro),
              showForm: !isEmpty(errorsReturnFinanceiro),
            },
            vinculoConta: { ...form.dadosUsuario, success: true, showForm: false },
          },
        });
        break;
      default:
        break;
    }
  };

  persistConta = () => {
    const { showMessage, history, persistModeAction, spinner } = this.props;
    const { typeSelect } = this.state;
    spinner(true);
    const data =
      typeSelect === TYPE_EMPRESA_CADASTRADA
        ? this.setRequestNewUser()
        : this.setRequestNewCompany();
    const endPoint = typeSelect === TYPE_EMPRESA_CADASTRADA ? 'auth' : 'companies';
    api
      .post(endPoint, data)
      .then(() => {
        spinner(false);
        showMessage({ message: ['Conta criada com sucesso!'], icon: 'success' });
        history.push('/conta');
        persistModeAction({ active: false, title: '' });
      })
      .catch(err => {
        spinner(false);
        console.error(err);
        const message = throwsException(
          err.response.data.errors.full_messages,
          'Erro ao salvar Conta!'
        );
        showMessage({ message, icon: 'error' });
      });
  };

  setRequestNewCompany = () => {
    const {
      form: { dadosUsuario, dadosEmpresa, dadosFinanceiro },
      persona,
    } = this.state;
    let type = '';
    switch (persona) {
      case CONTA_CLINICA:
        type = CLINIC;
        break;
      case CONTA_EMPRESA:
        type = ENTERPRISE;
        break;
      case FREELANCER_MEDICO:
        type = WORK_DOCTOR;
        break;
      case FREELANCER_ENFERMEIRO:
        type = WORK_NURSE;
        break;
      case FREELANCER_ENGENHEIRO:
        type = SAFETY_ENGINEER;
        break;
      case FREELANCER_TECNICO:
        type = WORK_TECHNICIAN;
        break;
      default:
        break;
    }
    const company = {
      company: {
        social_name: dadosEmpresa.razaoSocial,
        cnpj: dadosEmpresa.cnpj,
        phone_number: dadosEmpresa.telefoneComercial,
        type,
        cnaes: dadosEmpresa.cnae,
        representative_attributes: {
          cpf: dadosUsuario.cpf,
          name: dadosUsuario.nome,
          email: dadosUsuario.email,
          last_name: dadosUsuario.sobrenome,
          phone_number: dadosUsuario.telefone,
          password: '12345678',
          role: 'Admin',
        },
        financial_representative_attributes: {
          cpf: dadosFinanceiro.cpf,
          name: dadosFinanceiro.nome,
          email: dadosFinanceiro.email,
          last_name: dadosFinanceiro.sobrenome,
          phone_number: dadosFinanceiro.telefone,
          password: '12345678',
        },
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

    // Campos Opcionais:

    // company
    if (dadosEmpresa.nomeFantasia) company.company.fantasy_name = dadosEmpresa.nomeFantasia;
    if (dadosEmpresa.iscricaoEstadual)
      company.company.state_registration = dadosEmpresa.iscricaoEstadual;
    if (dadosEmpresa.iscricaoMunicipal)
      company.company.municipal_registration = dadosEmpresa.iscricaoMunicipal;
    if (dadosEmpresa.cnae) company.company.cnaes = dadosEmpresa.cnae;

    // representative_attributes
    if (dadosUsuario.rg) company.company.representative_attributes.rg = dadosUsuario.rg;
    if (dadosUsuario.dataNasc)
      company.company.representative_attributes.birthdate = dadosUsuario.dataNasc;
    if (dadosEmpresa.crm) company.company.representative_attributes.crm = dadosEmpresa.crm;
    if (dadosEmpresa.coren) company.company.representative_attributes.coren = dadosEmpresa.coren;
    if (dadosEmpresa.reg_mte)
      company.company.representative_attributes.reg_mte = dadosEmpresa.reg_mte;
    if (dadosEmpresa.crea) company.company.representative_attributes.crea = dadosEmpresa.crea;
    if (dadosEmpresa.rqe) company.company.representative_attributes.rqe = dadosEmpresa.rqe;

    // financial_representative_attributes
    if (dadosFinanceiro.rg)
      company.company.financial_representative_attributes.rg = dadosFinanceiro.rg;
    if (dadosFinanceiro.dataNasc)
      company.company.financial_representative_attributes.birthdate = dadosFinanceiro.dataNasc;
    if (dadosEmpresa.crm)
      company.company.financial_representative_attributes.crm = dadosEmpresa.crm;
    if (dadosEmpresa.coren)
      company.company.financial_representative_attributes.coren = dadosEmpresa.coren;
    if (dadosEmpresa.reg_mte)
      company.company.financial_representative_attributes.reg_mte = dadosEmpresa.reg_mte;
    if (dadosEmpresa.crea)
      company.company.financial_representative_attributes.crea = dadosEmpresa.crea;
    if (dadosEmpresa.rqe)
      company.company.financial_representative_attributes.rqe = dadosEmpresa.rqe;

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

    if (persona !== CONTA_EMPRESA) delete company.company.financial_representative_attributes;
    return company;
  };

  setRequestNewUser = () => {
    const {
      form: { dadosUsuario },
      role,
      idEmpresa,
    } = this.state;

    const user = {
      company_id: parseInt(idEmpresa, 10),
      role,
      cpf: dadosUsuario.cpf,
      name: dadosUsuario.nome,
      password: '14568345',
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
      form: { dadosUsuario, vinculoConta, dadosEmpresa, dadosFinanceiro },
      errors: { dadosUsuarioError, dadosEmpresaError, dadosFinanceiroError },
      dadosComerciais,
      showBtnSave,
      persona,
    } = this.state;

    return (
      <Painel>
        {/* DADOS DA USUÁRIO */}
        <Card
          title="Dados do Usuário"
          subtitle="Insira os dados do usuário que você está criando agora"
          collapse={dadosUsuario.showForm}
          onClick={this.handleSubmitDadosUsuario}
          borderSucess={dadosUsuario.success}
          iconColor={dadosUsuario.success ? '#00A66B' : '#999DAF'}
        >
          <DadosUsarioForm
            form={dadosUsuario}
            errors={dadosUsuarioError}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
          />
        </Card>
        {/* VINCULO DE CONTA */}
        <Card
          title="Vinculo de conta"
          subtitle="Defina uma ou mais contas associadas a este usuário"
          collapse={vinculoConta.showForm}
          onClick={this.handleSubmitVinculoConta}
          borderSucess={vinculoConta.success}
          iconColor={vinculoConta.success ? '#00A66B' : '#999DAF'}
        >
          <VinculoContaForm
            form={vinculoConta}
            handleChange={this.handleChange}
            setShowBtnSave={this.handleShowBtnSave}
            setShowDadosComeciais={this.setShowDadosComeciais}
          />
        </Card>
        {/* DADOS DA EMPRESA */}
        {dadosComerciais && (
          <React.Fragment>
            <Card
              title="Dados Comerciais"
              subtitle="Insira os dados comerciais do perfil"
              collapse={dadosEmpresa.showForm}
              onClick={this.handleSubmitDadosEmopresa}
              borderSucess={dadosEmpresa.success}
              iconColor={dadosEmpresa.success ? '#00A66B' : '#999DAF'}
            >
              <DadosEmpresaForm
                form={dadosEmpresa}
                errors={dadosEmpresaError}
                handleChange={this.handleChange}
                onChangeSelect={this.handleChangeSelect}
                buscarCEP={this.buscarCEP}
                tipoConta={persona}
              />
            </Card>
            {persona === CONTA_EMPRESA && (
              <Card
                title="Dados Financeiros"
                subtitle="Insira os dados para cobrança"
                collapse={dadosFinanceiro.showForm}
                onClick={this.handleSubmitdadosFinanceiro}
                borderSucess={dadosFinanceiro.success}
                iconColor={dadosFinanceiro.success ? '#00A66B' : '#999DAF'}
              >
                <DadosFinanceiroForm
                  form={dadosFinanceiro}
                  errors={dadosFinanceiroError}
                  handleChange={this.handleChange}
                />
              </Card>
            )}
          </React.Fragment>
        )}
        {showBtnSave && (
          <BtnPainel>
            <Button onClick={this.onSave}>Salvar Conta</Button>
          </BtnPainel>
        )}
      </Painel>
    );
  }
}

Registration.propTypes = {
  setCnaesAction: PropTypes.func.isRequired,
  setBancosAction: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  setEmpresasAction: PropTypes.func.isRequired,
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  persistModeAction: PropTypes.func.isRequired,
};

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

const RegistrationConnect = connect(
  null,
  mapDispatchToProps
)(Registration);

export default withRouter(RegistrationConnect);
