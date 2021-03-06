import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { Input, DatePicker } from '../../ui';
import { Line } from '../style';

function disabledDate(current) {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
}

const FormDadosUsuario = ({ form, handleChange, errors, handleChangeDate }) => (
  <React.Fragment>
    <Form className="login-form" style={{ width: '100%' }}>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            margin="0"
            errortext={errors.cpf}
            error={errors.cpf}
            label="CPF"
            required
            mask="999.999.999-99"
            name="cpf"
            onChange={handleChange('dadosUsuario', 'dadosUsuarioError')}
            value={form.cpf || ''}
            placeholder="000.000.000-00"
          />
        </Col>
      </Row>
      <Line />
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            errortext={errors.nome}
            error={errors.nome}
            label="Nome"
            required
            name="nome"
            onChange={handleChange('dadosUsuario', 'dadosUsuarioError')}
            value={form.nome || ''}
            placeholder="Digite o nome"
          />
        </Col>
        <Col md={12} xs={24}>
          <Input
            errortext={errors.sobrenome}
            error={errors.sobrenome}
            label="Sobrenome"
            required
            name="sobrenome"
            onChange={handleChange('dadosUsuario', 'dadosUsuarioError')}
            value={form.sobrenome || ''}
            placeholder="Digite o sobrenome"
          />
        </Col>
      </Row>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            label="RG"
            name="rg"
            onChange={handleChange('dadosUsuario', 'dadosUsuarioError')}
            value={form.rg || ''}
            placeholder="Digite o RG"
          />
        </Col>
        <Col md={12} xs={24}>
          <DatePicker
            label="Data de Nascimento"
            disabledDate={disabledDate}
            errortext={errors.dataNasc}
            dateValue={form.dataNasc}
            error={errors.dataNasc}
            onChange={(date, dateString) =>
              handleChangeDate(date, dateString, 'dataNasc', 'dadosUsuario', 'dadosUsuarioError')
            }
            placeholder="Selecione a data de nascimento"
          />
        </Col>
      </Row>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Input
            margin="0"
            errortext={errors.email}
            error={errors.email}
            label="E-mail"
            required
            name="email"
            onChange={handleChange('dadosUsuario', 'dadosUsuarioError')}
            value={form.email || ''}
            placeholder="Digite o e-mail"
          />
        </Col>
        <Col md={12} xs={24}>
          <Input
            margin="0"
            errortext={errors.telefone}
            error={errors.telefone}
            label="Telefone"
            mask="(99)9999-99999"
            required
            name="telefone"
            onChange={handleChange('dadosUsuario', 'dadosUsuarioError')}
            value={form.telefone || ''}
            placeholder="Digite o Telefone"
          />
        </Col>
      </Row>
    </Form>
  </React.Fragment>
);

FormDadosUsuario.propTypes = {
  form: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeDate: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

export default FormDadosUsuario;
