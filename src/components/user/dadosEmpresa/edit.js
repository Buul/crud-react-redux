import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forEach, remove, findIndex, uniqueId, isEmpty } from 'lodash';
import { Form, Row, Col, Select as SelectANTD } from 'antd';
import { Input, Select, Typography, RadioGroup, Radio } from '../../ui';
import { Line } from '../style';
import CnaeBox from './style';
import pxToRem from '../../../helpers/scales';
import { CONTA_EMPRESA } from '../../../helpers/constants';

const { Option } = SelectANTD;

class FormDadosEmpresaEdit extends Component {
  state = {
    cnaeListSelected: [],
    cnaeSelected: '',
  };

  componentWillReceiveProps(nextprops) {
    const { form: cnae } = this.props;
    if (!isEmpty(nextprops.form) && nextprops.form.cnae !== cnae)
      this.setState({ cnaeListSelected: nextprops.form.cnae });
  }

  handleChangeSelect = (_value, obj) => {
    const { cnaeListSelected } = this.state;
    const { onChangeSelect } = this.props;
    const cnaeListSelectedAdd = cnaeListSelected;
    if (findIndex(cnaeListSelectedAdd, cnae => cnae === obj.props.children) === -1) {
      cnaeListSelectedAdd.push(obj.props.children);
      this.setState({ cnaeListSelected: cnaeListSelectedAdd, cnaeSelected: obj.props.children });
      onChangeSelect('cnae', cnaeListSelectedAdd);
    } else {
      this.setState({ cnaeSelected: '' });
    }
  };

  handleChangeBanco = (_value, obj) => {
    const { onChangeSelect } = this.props;
    onChangeSelect('banco', obj.props.children);
  };

  handleCloseCnae = cnaeParam => {
    const { cnaeListSelected } = this.state;
    const cnaeListSelectedRemove = cnaeListSelected;
    remove(cnaeListSelectedRemove, cnae => cnae === cnaeParam);
    this.setState({ cnaeListSelected: cnaeListSelectedRemove, cnaeSelected: '' });
  };

  handleRadioTipoConta = e => {
    const { onChangeSelect } = this.props;
    onChangeSelect('tipoContaBancaria', e.target.value);
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
              onChange={handleChange}
              value={form.agencia || ''}
            />
          </Col>
          <Col md={4} xs={24}>
            <Input
              margin="0"
              label="Dig"
              name="digAgencia"
              onChange={handleChange}
              value={form.digAgencia || ''}
            />
          </Col>
          <Col md={8} xs={24}>
            <Input
              margin="0"
              label="Conta"
              name="conta"
              onChange={handleChange}
              value={form.conta || ''}
            />
          </Col>
          <Col md={4} xs={24}>
            <Input
              margin="0"
              label="Dig"
              name="digConta"
              onChange={handleChange}
              value={form.digConta || ''}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const { form, handleChange, errors, buscarCEP, cnaeList, bancoList, tipoConta } = this.props;
    const { cnaeListSelected, cnaeSelected } = this.state;
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                value={form.iscricaoMunicipal || ''}
              />
            </Col>
            <Col md={12} xs={24}>
              <Input
                margin="0"
                label="Inscrição Estadual"
                name="iscricaoEstadual"
                onChange={handleChange}
                value={form.iscricaoEstadual || ''}
              />
            </Col>
          </Row>
          <Line />
          {tipoConta === CONTA_EMPRESA &&
            this.renderCnae(cnaeListSelected, errors, cnaeSelected, cnaeList)}
          <Row gutter={48}>
            <Col md={12} xs={24}>
              <Input
                errortext={errors.cep}
                error={errors.cep}
                label="CEP"
                mask="99999-999"
                required
                name="cep"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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

FormDadosEmpresaEdit.propTypes = {
  cnaeList: PropTypes.arrayOf(PropTypes.shape({})),
  form: PropTypes.shape({}).isRequired,
  buscarCEP: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  bancoList: PropTypes.arrayOf(PropTypes.string),
  tipoConta: PropTypes.string,
};
FormDadosEmpresaEdit.defaultProps = {
  cnaeList: [],
  tipoConta: '',
  bancoList: [],
};

const mapStateToProps = state => ({
  cnaeList: state.userReducer.cnaeList,
  bancoList: state.userReducer.bancoList,
});

export default connect(mapStateToProps)(FormDadosEmpresaEdit);
