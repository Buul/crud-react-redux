import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, Select as SelectANTD } from 'antd';
import { Card, Input, Select, CheckBox, Typography, Button } from '../../../ui';
import { Painel, Line, BtnPainel } from '../../../user/style';
import pxToRem from '../../../../helpers/scales';

const BoxSimulacao = styled.div`
  align-items: flex-end;
  border: ${pxToRem(2)} solid ${props => props.theme.colors.greyLight};
  border-radius: ${pxToRem(5)};
  display: flex;
  flex-direction: column;
  padding: ${pxToRem(10)};
  width: 100%;
`;

const RowSimulacao = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${props => pxToRem(props.marginBottom)};

  .text {
    color: ${props => props.theme.colors.blueDark};
    font-size: ${pxToRem(20)};
    font-weight: 600;
    margin-right: ${pxToRem(20)};
  }
`;

const { Option } = SelectANTD;

const INITIAL_VALUE = {
  tipoDemanda: '',
  fluxoPadrao: '',
  dataDesejadaMultiplo: '',
  nome: '',
};

class FormConfiguracaoDemanda extends Component {
  state = {
    collapse: true,
    success: false,
    errors: { ...INITIAL_VALUE },
    form: { ...INITIAL_VALUE },
  };

  handleSubmit = () => {};

  handleChange = event => {
    const { form, errors } = this.state;
    this.setState({
      form: { ...form, [event.target.name]: event.target.value },
      errors: { ...errors, [event.target.name]: null },
    });
  };

  onSave = () => {};

  handleChangeSelect = (value, key) => {
    const { form, errors, dataDesejadaMultiplo } = this.state;
    this.setState({
      form: {
        ...form,
        [key]: value,
        dataDesejadaMultiplo: key === 'dataDesejada' ? '' : dataDesejadaMultiplo,
      },
      errors: { ...errors, [key]: null },
    });
  };

  handleCheck = value => {};

  render() {
    const { collapse, success, form } = this.state;
    return (
      <Painel>
        <Card
          title="Configuração da demanda"
          subtitle="Insira os dados para demanda"
          collapse={collapse}
          onClick={this.handleSubmit}
          borderSucess={success}
          iconColor={success ? '#00A66B' : '#999DAF'}
        >
          <Form className="login-form" style={{ width: '100%' }}>
            <Row gutter={48}>
              <Col md={18} xs={24}>
                <Select
                  label="Tipo de Demanda"
                  name="tipoDemanda"
                  onChange={event => this.handleChangeSelect(event, 'tipoDemanda')}
                  value={form.tipoDemanda || 'Selecione'}
                  suffixIcon="down"
                >
                  <Option value="DOC_SEG_TRAB">Documentação de Segurança do Trabalho</Option>
                  <Option value="EXAMES">Exames Ocupacionais</Option>
                  <Option value="TREINAMENTO_PALESTRA">Treinamento/Palestra</Option>
                </Select>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={18} xs={24}>
                <Select
                  label="Fluxo Padrão"
                  name="fluxoPadrao"
                  onChange={event => this.handleChangeSelect(event, 'fluxoPadrao')}
                  value={form.fluxoPadrao || 'Selecione'}
                  suffixIcon="down"
                >
                  <Option value="PPRA_PCMSO">PPRA PCMSO</Option>
                  <Option value="TAREFA">Tarefa</Option>
                  <Option value="TREINAMENTO">Treinamento</Option>
                </Select>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={18} xs={24}>
                <Input
                  margin="0"
                  label="Nome da demanda"
                  name="nome"
                  onChange={this.handleChange}
                  value={form.nome || ''}
                  placeholder="Digite o nome da demanda"
                />
              </Col>
            </Row>
            <Line />
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
                  <Typography size={20} weight="600" lineheight="26">
                    Informações
                  </Typography>
                </div>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox name="cargaHoraria" onCheck={this.handleCheck} text="Carga horária" />
              </Col>
              <Col md={4} xs={24}>
                <Input name="nome" onChange={this.handleChange} value={form.nome || ''} />
              </Col>
              <Col md={1} xs={24}>
                <div
                  style={{
                    height: pxToRem(50),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography size={20} weight="600" lineheight="26">
                    a
                  </Typography>
                </div>
              </Col>
              <Col md={4} xs={24}>
                <Input
                  margin="0"
                  name="nome"
                  onChange={this.handleChange}
                  value={form.nome || ''}
                />
              </Col>
              <Col md={1} xs={24}>
                <div
                  style={{
                    height: pxToRem(50),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography size={20} weight="600" lineheight="26">
                    horas
                  </Typography>
                </div>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox
                  name="prazoMínimo"
                  onCheck={this.handleCheck}
                  text="Prazo mínimo (dias úteis)"
                />
              </Col>
              <Col md={12} xs={24}>
                <Input
                  margin="0"
                  name="nome"
                  onChange={this.handleChange}
                  value={form.nome || ''}
                />
              </Col>
            </Row>
            <Line />
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
                  <Typography size={20} weight="600" lineheight="26">
                    Campos a requerer
                  </Typography>
                </div>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox
                  name="dataDesejadaHora"
                  onCheck={this.handleCheck}
                  text="Data desejada + horas"
                />
              </Col>
              <Col md={6} xs={24}>
                <Select
                  margin="0"
                  name="dataDesejada"
                  onChange={event => this.handleChangeSelect(event, 'dataDesejada')}
                  value={form.dataDesejada || 'Selecione'}
                  suffixIcon="down"
                >
                  <Option value="SIMPLES">Simples</Option>
                  <Option value="MULTIPLO">Múltiplo</Option>
                </Select>
              </Col>
              {form.dataDesejada === 'MULTIPLO' && (
                <Col md={6} xs={24}>
                  <Input
                    margin="0"
                    name="dataDesejadaMultiplo"
                    onChange={this.handleChange}
                    value={form.dataDesejadaMultiplo || ''}
                  />
                </Col>
              )}
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox name="dataLimite" onCheck={this.handleCheck} text="Data limite" />
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox
                  name="qtdColaborados"
                  onCheck={this.handleCheck}
                  text="Quantidade de colaboradores"
                />
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox
                  name="recursosMinimos"
                  onCheck={this.handleCheck}
                  text="Concordar com recursos mínimos"
                />
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox
                  name="localTreinamento"
                  onCheck={this.handleCheck}
                  text="Local Treinamento"
                />
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <CheckBox
                  name="qtdDocumento"
                  onCheck={this.handleCheck}
                  text="Quantidade de documentos"
                />
              </Col>
            </Row>
            <Line />
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <Input
                  margin="0"
                  label="Carteira do freelancer"
                  name="carteiraFreelancer"
                  onChange={this.handleChange}
                  value={form.carteiraFreelancer || ''}
                />
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={18} xs={24}>
                <Select
                  label="Regra de cobrança"
                  name="regraCobranca"
                  onChange={event => this.handleChangeSelect(event, 'regraCobranca')}
                  value={form.regraCobranca || 'Selecione'}
                  suffixIcon="down"
                >
                  <Option value="REGRA_COBRANCA_VAIRAVEL">Multiplicar pela variável</Option>
                  <Option value="REGRA_COBRANCA_VAIRAVEL_FATOR">
                    Multiplicar pela variável + fator
                  </Option>
                  <Option value="REGRA_COBRANCA_QTD_DEMANDA">
                    Multiplicar pela quantidade da demanda
                  </Option>
                </Select>
              </Col>
            </Row>
            <Line />
            <Row gutter={48}>
              <Col md={10} xs={24}>
                <Select
                  label="Custo individual"
                  name="custoIndividual"
                  onChange={event => this.handleChangeSelect(event, 'custoIndividual')}
                  value={form.custoIndividual || 'Selecione'}
                  suffixIcon="down"
                >
                  <Option value="CUSTO_INDIVIDUAL_HORA">Hora</Option>
                  <Option value="CUSTO_INDIVIDUAL_QTD_COLABORADORES">Qtd de colaboradores</Option>
                  <Option value="CUSTO_INDIVIDUAL_QTD_DEMANDAS">Qtd da demanda</Option>
                </Select>
              </Col>
              <Col md={6} xs={24}>
                <Input
                  label="Cliente"
                  name="custoIndividualCliente"
                  onChange={this.handleChange}
                  value={form.custoIndividualCliente || ''}
                />
              </Col>
              <Col md={8} xs={24}>
                <Input
                  label="Repasse do freelancer"
                  name="custoIndividualRepasseFreelancer"
                  onChange={this.handleChange}
                  value={form.custoIndividualRepasseFreelancer || ''}
                />
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={10} xs={24}>
                <Select
                  label="Custo variável"
                  name="custoVariavel"
                  onChange={event => this.handleChangeSelect(event, 'custoVariavel')}
                  value={form.custoVariavel || 'Selecione'}
                  suffixIcon="down"
                >
                  <Option value="CUSTO_VARIAVEL_HORA">Hora</Option>
                  <Option value="CUSTO_VARIAVEL_QTD_COLABORADORES">Qtd de colaboradores</Option>
                  <Option value="CUSTO_VARIAVEL_QTD_DEMANDAS">Qtd da demanda</Option>
                </Select>
              </Col>
              <Col md={6} xs={24}>
                <Input
                  label="Cliente"
                  name="custoVariavelCliente"
                  onChange={this.handleChange}
                  value={form.custoVariavelCliente || ''}
                />
              </Col>
              <Col md={8} xs={24}>
                <Input
                  label="Repasse do freelancer"
                  name="custoVariavelRepasseFreelancer"
                  onChange={this.handleChange}
                  value={form.custoVariavelRepasseFreelancer || ''}
                />
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <Input
                  margin="0"
                  label="Qtd mínima variável"
                  name="qtdMinimaVariavel"
                  onChange={this.handleChange}
                  value={form.qtdMinimaVariavel || ''}
                />
              </Col>
              <Col md={12} xs={24}>
                <Input
                  margin="0"
                  label="Fator"
                  name="fator"
                  onChange={this.handleChange}
                  value={form.fator || ''}
                />
              </Col>
            </Row>
            <Line />
            <Row gutter={48}>
              <Col md={12} xs={24}>
                <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
                  <Typography size={20} weight="600" lineheight="26">
                    Simulação
                  </Typography>
                </div>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col md={18} xs={24}>
                <BoxSimulacao>
                  <RowSimulacao marginBottom="10">
                    <div className="text">Carga horária</div>
                    <Input
                      formsimple
                      margin="0"
                      name="simulacaoCargahoraria"
                      onChange={this.handleChange}
                      value={form.simulacaoCargahoraria || ''}
                    />
                  </RowSimulacao>
                  <RowSimulacao marginBottom="60">
                    <div className="text">Quantidade de colaboradores</div>
                    <Input
                      formsimple
                      margin="0"
                      name="simulacaoQtdColaboradores"
                      onChange={this.handleChange}
                      value={form.simulacaoQtdColaboradores || ''}
                    />
                  </RowSimulacao>
                  <RowSimulacao marginBottom="10">
                    <div className="text">Valor final cliente</div>
                    <Input
                      formsimple
                      margin="0"
                      name="simulacaoValorCliente"
                      onChange={this.handleChange}
                      value={form.simulacaoValorCliente || ''}
                    />
                  </RowSimulacao>
                  <RowSimulacao marginBottom="0">
                    <div className="text">Valor final repasse</div>
                    <Input
                      formsimple
                      margin="0"
                      name="simulacaoValorRepasse"
                      onChange={this.handleChange}
                      value={form.simulacaoValorRepasse || ''}
                    />
                  </RowSimulacao>
                </BoxSimulacao>
              </Col>
            </Row>
          </Form>
        </Card>
        <BtnPainel>
          <Button onClick={this.onSave}>Salvar</Button>
        </BtnPainel>
      </Painel>
    );
  }
}
export default FormConfiguracaoDemanda;
