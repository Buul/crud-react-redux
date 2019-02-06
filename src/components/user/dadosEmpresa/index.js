import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forEach, remove, findIndex, uniqueId } from 'lodash';
import { Form, Row, Col, Select as SelectANTD } from 'antd';
import { Input, Select, Typography, RadioGroup, Radio, InputButton } from '../../ui';
import { Line } from '../style';
import CnaeBox from './style';
import pxToRem from '../../../helpers/scales';
import {
  CONTA_EMPRESA,
  FREELANCER_ENFERMEIRO,
  FREELANCER_MEDICO,
  FREELANCER_ENGENHEIRO,
  FREELANCER_TECNICO,
} from '../../../helpers/constants';

const { Option } = SelectANTD;

class FormDadosEmpresa extends Component {
  state = {
    cnaeListSelected: [],
    rqeListSelected: [],
    cnaeSelected: '',
    rqe: '',
    tipoContaState: '',
  };

  handleChangeSelect = (_value, obj) => {
    const { cnaeListSelected } = this.state;
    const { onChangeSelect } = this.props;
    const cnaeListSelectedAdd = cnaeListSelected;
    if (findIndex(cnaeListSelectedAdd, cnae => cnae === obj.props.children) === -1) {
      cnaeListSelectedAdd.push(obj.props.children);
      this.setState({ cnaeListSelected: cnaeListSelectedAdd, cnaeSelected: obj.props.children });
      onChangeSelect('cnae', cnaeListSelectedAdd, 'dadosEmpresa', 'dadosEmpresaError');
    } else {
      this.setState({ cnaeSelected: '' });
    }
  };

  handleChangeBanco = (_value, obj) => {
    const { onChangeSelect } = this.props;
    onChangeSelect('banco', obj.props.children, 'dadosEmpresa', 'dadosEmpresaError');
  };

  handleCloseCnae = cnaeParam => {
    const { cnaeListSelected } = this.state;
    const cnaeListSelectedRemove = cnaeListSelected;
    remove(cnaeListSelectedRemove, cnae => cnae === cnaeParam);
    this.setState({ cnaeListSelected: cnaeListSelectedRemove, cnaeSelected: '' });
  };

  handleCloseRqe = rqeParam => {
    const { rqeListSelected } = this.state;
    const rqeListSelectedRemove = rqeListSelected;
    remove(rqeListSelectedRemove, rqe => rqe === rqeParam);
    this.setState({ rqeListSelected: rqeListSelectedRemove });
  };

  handleRadioTipoConta = e => {
    const { onChangeSelect } = this.props;
    onChangeSelect('tipoContaBancaria', e.target.value, 'dadosEmpresa', 'dadosEmpresaError');
  };

  addRqe = value => {
    if (value !== '') {
      const { rqeListSelected } = this.state;
      const { onChangeSelect } = this.props;
      const rqe = rqeListSelected;
      rqe.push(value);
      onChangeSelect('rqe', rqe, 'dadosEmpresa', 'dadosEmpresaError');
      this.setState({ rqeListSelected: rqe, rqe: '' });
    }
  };

  renderCnae = (cnaeListSelected, errors, cnaeSelected, cnaeList) => {
    const children = [];
    forEach(cnaeList, (cnae, idx) => {
      children.push(<Option key={`${idx}_${cnae.id}`}>{`${cnae.id} - ${cnae.descricao}`}</Option>);
    });
    return (
      <React.Fragment>
        <Row gutter={48}>
          <Col span={24}>
            <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
              <Typography size={20} weight="600" lineheight="26">
                CNAE<span style={{ marginLeft: 8, color: '#999DAF' }}> *</span>
              </Typography>
            </div>

            {cnaeListSelected &&
              cnaeListSelected.map(item => (
                <CnaeBox key={item} cnae={item} onClose={() => this.handleCloseCnae(item)} />
              ))}
            <Select
              showSearch
              suffixIcon="search"
              optionFilterProp="children"
              margin="0"
              name="cnae"
              errortext={errors.cnae.length !== 0 ? 'Cnae é obrigatório' : ''}
              error={errors.cnae.length !== 0}
              onChange={this.handleChangeSelect}
              value={cnaeSelected || ''}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {children}
            </Select>
          </Col>
        </Row>
        <Line />
      </React.Fragment>
    );
  };

  renderCamposMedico = (errors, handleChange, form, rqeListSelected, rqe) => (
    <React.Fragment>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
            <Typography size={20} weight="600" lineheight="26">
              RQE<span style={{ marginLeft: 8, color: '#999DAF' }}> *</span>
            </Typography>
          </div>

          {rqeListSelected &&
            rqeListSelected.map(item => (
              <CnaeBox key={item} cnae={item} onClose={() => this.handleCloseRqe(item)} />
            ))}
          <InputButton
            buttonProps={{ text: 'Adicionar', onClick: () => this.addRqe(rqe) }}
            errortext={errors.rqe.length !== 0 ? 'Rqe é obrigatório' : ''}
            error={errors.rqe.length !== 0}
            required
            name="rqe"
            onChange={event => {
              this.setState({ rqe: event.target.value });
            }}
            value={rqe || ''}
            placeholder="Digite o RQE"
          />
        </Col>
      </Row>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            margin="0"
            errortext={errors.crm}
            error={errors.crm}
            label="CRM"
            required
            name="crm"
            onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
            value={form.crm || ''}
            placeholder="Digite o CRM"
          />
        </Col>
      </Row>
      <Line />
    </React.Fragment>
  );

  renderCamposEnfermeiro = (errors, handleChange, form) => (
    <React.Fragment>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            margin="0"
            errortext={errors.coren}
            error={errors.coren}
            label="COREN"
            required
            name="coren"
            onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
            value={form.coren || ''}
            placeholder="Digite o COREN"
          />
        </Col>
      </Row>
      <Line />
    </React.Fragment>
  );

  renderCamposEngenheiro = (errors, handleChange, form) => (
    <React.Fragment>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            margin="0"
            errortext={errors.crea}
            error={errors.crea}
            label="CREA"
            required
            name="crea"
            onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
            value={form.crea || ''}
            placeholder="Digite o CREA"
          />
        </Col>
      </Row>
      <Line />
    </React.Fragment>
  );

  renderDadosBancarios = (bancoList, form, handleChange) => {
    const children = [];
    forEach(bancoList, banco => {
      children.push(<Option key={uniqueId()}>{banco}</Option>);
    });
    return (
      <React.Fragment>
        <Line />
        <Row gutter={48}>
          <Col md={12} xs={24}>
            <Select
              label="Banco"
              showSearch
              suffixIcon="search"
              optionFilterProp="children"
              name="banco"
              onChange={this.handleChangeBanco}
              value={form.banco || ''}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {children}
            </Select>
          </Col>
          <Col md={12} xs={24}>
            <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
              <Typography size={20} weight="600" lineheight="26">
                Tipo de conta
              </Typography>
            </div>
            <RadioGroup
              onChange={event => this.handleRadioTipoConta(event)}
              value={form.tipoContaBancaria || ''}
            >
              <Radio value="CONTA_CORRENTE">Conta corrente</Radio>
              <Radio value="CONTA_POUPANCA">Conta poupança</Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row gutter={48}>
          <Col md={8} xs={24}>
            <Input
              margin="0"
              label="Agência"
              name="agencia"
              onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
              value={form.agencia || ''}
            />
          </Col>
          <Col md={4} xs={24}>
            <Input
              margin="0"
              label="Dig"
              name="digAgencia"
              onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
              value={form.digAgencia || ''}
            />
          </Col>
          <Col md={8} xs={24}>
            <Input
              margin="0"
              label="Conta"
              name="conta"
              onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
              value={form.conta || ''}
            />
          </Col>
          <Col md={4} xs={24}>
            <Input
              margin="0"
              label="Dig"
              name="digConta"
              onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
              value={form.digConta || ''}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  renderCamposTecnico = (errors, handleChange, form) => (
    <React.Fragment>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            margin="0"
            errortext={errors.regMte}
            error={errors.regMte}
            label="REG MTE"
            required
            name="regMte"
            onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
            value={form.regMte || ''}
            placeholder="Digite o REG MTE"
          />
        </Col>
      </Row>
      <Line />
    </React.Fragment>
  );

  render() {
    const { form, handleChange, errors, buscarCEP, cnaeList, tipoConta, bancoList } = this.props;
    const { cnaeListSelected, cnaeSelected, rqeListSelected, rqe, tipoContaState } = this.state;

    const tipoContaCompare = tipoContaState || tipoConta;
    return (
      <React.Fragment>
        <Form className="login-form" style={{ width: '100%' }}>
          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                errortext={errors.cnpj}
                error={errors.cnpj}
                label="CNPJ"
                required
                mask="99.999.999/9999-99"
                name="cnpj"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.cnpj || ''}
                placeholder="00.000.000/0000-00"
              />
            </Col>
          </Row>
          <Line />
          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                label="Nome Fantasia"
                name="nomeFantasia"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.nomeFantasia || ''}
                placeholder="Digite o nome"
              />
            </Col>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                errortext={errors.razaoSocial}
                error={errors.razaoSocial}
                label="Razão Social"
                required
                name="razaoSocial"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.razaoSocial || ''}
                placeholder="Digite a Razão"
              />
            </Col>
          </Row>
          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                label="Inscrição Municipal"
                name="iscricaoMunicipal"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.iscricaoMunicipal || ''}
              />
            </Col>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                label="Inscrição Estadual"
                name="iscricaoEstadual"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.iscricaoEstadual || ''}
              />
            </Col>
          </Row>
          <Line />

          {/* CAMPOS DINÁMICOS */}
          {tipoContaCompare === CONTA_EMPRESA &&
            this.renderCnae(cnaeListSelected, errors, cnaeSelected, cnaeList)}
          {tipoContaCompare === FREELANCER_MEDICO &&
            this.renderCamposMedico(errors, handleChange, form, rqeListSelected, rqe)}
          {tipoContaCompare === FREELANCER_ENFERMEIRO &&
            this.renderCamposEnfermeiro(errors, handleChange, form)}
          {tipoContaCompare === FREELANCER_ENGENHEIRO &&
            this.renderCamposEngenheiro(errors, handleChange, form)}
          {tipoContaCompare === FREELANCER_TECNICO &&
            this.renderCamposTecnico(errors, handleChange, form)}
          {/* CAMPOS DINÁMICOS */}

          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                errortext={errors.cep}
                error={errors.cep}
                label="CEP"
                mask="99999-999"
                required
                name="cep"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                onBlur={() => buscarCEP(form.cep, 'dadosEmpresa', 'dadosEmpresaError')}
                value={form.cep || ''}
              />
            </Col>
          </Row>
          <Row gutter={48}>
            <Col md={16} xs={24}>
              <Input
                errortext={errors.logradouro}
                error={errors.logradouro}
                label="Logradouro"
                required
                name="logradouro"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.logradouro || ''}
                placeholder="Digite o nome da rua"
              />
            </Col>
            <Col md={8} xs={24}>
              <Input
                errortext={errors.numero}
                error={errors.numero}
                label="Nº"
                required
                name="numero"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.numero || ''}
              />
            </Col>
          </Row>
          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                errortext={errors.bairro}
                error={errors.bairro}
                label="Bairro"
                required
                name="bairro"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.bairro || ''}
              />
            </Col>
          </Row>
          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                errortext={errors.cidade}
                error={errors.cidade}
                label="Cidade"
                required
                name="cidade"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.cidade || ''}
              />
            </Col>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                errortext={errors.estado}
                error={errors.estado}
                label="Estado"
                required
                name="estado"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.estado || ''}
              />
            </Col>
          </Row>
          <Line />
          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                errortext={errors.telefoneComercial}
                error={errors.telefoneComercial}
                label="Telefone Comercial"
                mask="(99)9999-99999"
                required
                name="telefoneComercial"
                onChange={handleChange('dadosEmpresa', 'dadosEmpresaError')}
                value={form.telefoneComercial || ''}
              />
            </Col>
          </Row>
          {tipoConta !== CONTA_EMPRESA && this.renderDadosBancarios(bancoList, form, handleChange)}
        </Form>
      </React.Fragment>
    );
  }
}

FormDadosEmpresa.propTypes = {
  cnaeList: PropTypes.arrayOf(PropTypes.shape({})),
  form: PropTypes.shape({}).isRequired,
  buscarCEP: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  tipoConta: PropTypes.string,
  bancoList: PropTypes.arrayOf(PropTypes.string),
};
FormDadosEmpresa.defaultProps = {
  cnaeList: [],
  bancoList: [],
  tipoConta: '',
};

const mapStateToProps = state => ({
  cnaeList: state.userReducer.cnaeList,
  bancoList: state.userReducer.bancoList,
});

export default connect(mapStateToProps)(FormDadosEmpresa);
