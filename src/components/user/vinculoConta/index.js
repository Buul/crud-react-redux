import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Row, Col, Select as SelectANT } from 'antd';
import { Line } from '../style';
import { Select, Button, Radio, RadioGroup } from '../../ui';
import Persona from './Persona';
import { BoxPersona } from './style';
import { CONTA_CLINICA, CONTA_EMPRESA, CONTA_FREELANCER } from '../../../helpers/constants';

const { Option } = SelectANT;
class FormVinculoConta extends Component {
  state = {
    personaSelected: false,
    personaData: {},
    empresaData: {},
    empresaID: '',
    showModalPersona: false,
    showRadio: false,
    newEmpresa: false,
    role: 'Admin',
  };

  handleChange = value => {
    const { empresaList, setShowBtnSave, setShowDadosComeciais } = this.props;
    const { personaData, role } = this.state;
    const empresaSelected = empresaList.find(empresa => empresa.id.toString() === value);
    setShowBtnSave(true, true, value, role);
    setShowDadosComeciais(false, CONTA_EMPRESA, true);

    this.setState({
      showRadio: true,
      empresaID: value,
      newEmpresa: false,
      personaSelected: true,
      empresaData: empresaSelected,
      personaData: { ...personaData, tipo: 'Administrador' },
      role: 'Admin',
    });
  };

  handleChangeRadio = e => {
    const { personaData, empresaID } = this.state;
    const { setShowBtnSave } = this.props;

    const tipo = e.target.value === 'Admin' ? 'Administrador' : 'Usuário';
    this.setState({
      role: e.target.value,
      personaData: { ...personaData, tipo },
    });
    setShowBtnSave(true, true, empresaID, e.target.value);
  };

  novaConta = persona => {
    const empresa = {
      cnpj: '00.000.000/0000-00',
    };
    switch (persona) {
      case CONTA_CLINICA:
        empresa.fantasy_name = 'Nova Clínica';
        break;
      case CONTA_EMPRESA:
        empresa.fantasy_name = 'Nova Empresa';
        break;
      case CONTA_FREELANCER:
        empresa.fantasy_name = 'Novo Freelancer';
        break;
      default:
        empresa.fantasy_name = '';
        break;
    }
    return empresa;
  };

  handleConfirmSelect = data => {
    const { empresaList, setShowBtnSave, setShowDadosComeciais } = this.props;
    const { empresaID, newEmpresa } = this.state;
    const empresaData = newEmpresa
      ? this.novaConta(data.persona)
      : empresaList.find(empresa => empresa.id.toString() === empresaID);
    this.setState({
      personaData: data,
      showModalPersona: false,
      empresaData,
      personaSelected: true,
    });
    setShowBtnSave(true, true);
    const tipoConta = data.persona === CONTA_FREELANCER ? data.tipo : data.persona;
    setShowDadosComeciais(newEmpresa, tipoConta, true);
  };

  render() {
    const { empresaList, setShowBtnSave, setShowDadosComeciais } = this.props;
    const {
      personaSelected,
      showModalPersona,
      personaData,
      empresaData,
      empresaID,
      newEmpresa,
      showRadio,
      role,
    } = this.state;
    const options = empresaList.map(d => (
      <Option key={d.id}>{`${d.cnpj} - ${d.fantasy_name}`}</Option>
    ));

    return (
      <React.Fragment>
        <Form className="login-form" style={{ width: '100%' }}>
          <Row>
            <Col span={24}>
              <Select
                margin="0"
                label="Empresa"
                showSearch
                optionFilterProp="children"
                placeholder="Digite um nome ou CNPJ"
                onChange={this.handleChange}
                value={empresaID || ''}
                suffixIcon="search"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {options}
              </Select>
            </Col>
          </Row>
          {showRadio && (
            <Row>
              <Col span={12}>
                <RadioGroup
                  align="center"
                  onChange={event => this.handleChangeRadio(event)}
                  value={role || ''}
                  label="Selecione o perfil do usuário."
                  margintop="48"
                >
                  <Radio value="Admin" paddingright="20">
                    Administrador
                  </Radio>
                  <Radio value="Employee">Usuário</Radio>
                </RadioGroup>
              </Col>
            </Row>
          )}
          <Line />
          <React.Fragment>
            {(personaSelected && (
              <Row style={{ margin: '20px 0' }}>
                <Col span={24}>
                  <BoxPersona
                    empresa={empresaData}
                    tag={personaData.tipo}
                    onClose={() => {
                      this.setState({ personaSelected: false, empresaID: '', showRadio: false });
                      setShowBtnSave(false);
                      setShowDadosComeciais(false);
                    }}
                  />
                </Col>
              </Row>
            )) || (
              <Row>
                <Col md={9} xs={24}>
                  <Button
                    type="secundary"
                    onClick={() => {
                      this.setState({
                        showModalPersona: true,
                        newEmpresa: true,
                        empresaID: '',
                        showRadio: false,
                      });
                    }}
                  >
                    Adicionar uma Conta Nova
                  </Button>
                </Col>
              </Row>
            )}
          </React.Fragment>
        </Form>
        <Persona
          onCloseModalPersona={() => {
            this.setState({ showModalPersona: !showModalPersona });
          }}
          showModalPersona={showModalPersona}
          newEmpresa={newEmpresa}
          onConfirmSelect={this.handleConfirmSelect}
        />
      </React.Fragment>
    );
  }
}

FormVinculoConta.propTypes = {
  setShowBtnSave: PropTypes.func.isRequired,
  setShowDadosComeciais: PropTypes.func.isRequired,
  empresaList: PropTypes.arrayOf(PropTypes.shape({})),
  empresaData: PropTypes.shape({}),
};

FormVinculoConta.defaultProps = {
  empresaList: [],
  empresaData: {},
};

const mapStateToProps = state => ({
  empresaList: state.userReducer.empresaList,
});

export default connect(mapStateToProps)(FormVinculoConta);
