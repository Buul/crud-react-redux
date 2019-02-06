import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { Input } from '../../ui';
import { Line } from '../style';

const FormDadosFinanceiro = ({ form, handleChange, errors }) => (
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
            onChange={handleChange('dadosFinanceiro', 'dadosFinanceiroError')}
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
            onChange={handleChange('dadosFinanceiro', 'dadosFinanceiroError')}
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
            onChange={handleChange('dadosFinanceiro', 'dadosFinanceiroError')}
            value={form.sobrenome || ''}
            placeholder="Digite o sobrenome"
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
            onChange={handleChange('dadosFinanceiro', 'dadosFinanceiroError')}
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
            onChange={handleChange('dadosFinanceiro', 'dadosFinanceiroError')}
            value={form.telefone || ''}
            placeholder="Digite o Telefone"
          />
        </Col>
      </Row>
    </Form>
  </React.Fragment>
);

FormDadosFinanceiro.propTypes = {
  form: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

export default FormDadosFinanceiro;
