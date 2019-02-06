import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, SelectBox, Typography, Radio, RadioGroup } from '../../ui';
import { CONTA_CLINICA, CONTA_FREELANCER, CONTA_EMPRESA } from '../../../helpers/constants';
import {
  SelectPersona,
  LinePersona,
  SelectGroup,
  TypePersona,
  TextTypePersona,
  TypePersonaRadio,
  ButtonPersona,
} from './style';

const SELECTED_PERSONA = {
  empresa: false,
  clinica: false,
  freelancer: false,
};

class FormVinculoConta extends Component {
  state = {
    radioValueCliEmp: 'ADMINISTRADOR',
    radioValueFreela: 'MEDICO',
    typePersonaSelected: '',
    persona: '',
    selectedPersona: { ...SELECTED_PERSONA },
  };

  handleSelectPersona = persona => {
    const selectedPersonaAction = { ...SELECTED_PERSONA };
    this.setState({
      selectedPersona: { ...selectedPersonaAction, [persona]: true },
      typePersonaSelected: persona === CONTA_FREELANCER ? 'Médico do Trabalho' : 'Administrador',
      persona,
      radioValueCliEmp: 'ADMINISTRADOR',
      radioValueFreela: 'MEDICO',
    });
  };

  getText = type => {
    switch (type) {
      case 'MEDICO':
        return 'Médico do Trabalho';
      case 'ENFERMEIRO':
        return 'Enfermeiro do Trabalho';
      case 'ENGENHEIRO':
        return 'Engenheiro de Segurança do Trabalho';
      case 'TECNICO':
        return 'Técnico do Trabalho';
      case 'ADMINISTRADOR':
        return 'Administrador';
      case 'FUNCIONARIO':
        return 'Funcionário';
      default:
        break;
    }
    return '';
  };

  handleChangeRadio = (radio, e) => {
    this.setState({
      [radio]: e.target.value,
      typePersonaSelected: this.getText(e.target.value),
    });
  };

  render() {
    const { onCloseModalPersona, showModalPersona, onConfirmSelect, newEmpresa } = this.props;
    const {
      selectedPersona,
      radioValueCliEmp,
      radioValueFreela,
      typePersonaSelected,
      persona,
    } = this.state;

    const selectedPersonaOk =
      selectedPersona.clinica || selectedPersona.empresa || selectedPersona.freelancer;
    return (
      <Modal
        open={showModalPersona}
        title="Qual o tipo de conta que o usuário será vinculado?"
        titlestyle={{ textalign: 'center', peddingtop: '64' }}
        onCloseModal={() => onCloseModalPersona()}
        size="844"
      >
        <SelectPersona>
          <SelectGroup>
            <SelectBox
              onClick={() => this.handleSelectPersona(CONTA_EMPRESA)}
              icon="setting"
              title="Empresa"
              selected={selectedPersona.empresa}
            />
            <SelectBox
              onClick={() => this.handleSelectPersona(CONTA_CLINICA)}
              icon="medicine-box"
              title="Clínica"
              selected={selectedPersona.clinica}
            />
            <SelectBox
              onClick={() => this.handleSelectPersona(CONTA_FREELANCER)}
              icon="user"
              title="Freelancer"
              margin="0"
              selected={selectedPersona.freelancer}
            />
          </SelectGroup>
          {selectedPersonaOk && (
            <React.Fragment>
              <LinePersona />
              <TypePersona>
                <TextTypePersona>
                  <Typography size={24} weight="600" lineheight="30">
                    {!selectedPersona.freelancer
                      ? 'Quais as permissões nesse usuário com a conta?'
                      : 'Informe a ocupação do freelancer.'}
                  </Typography>
                </TextTypePersona>
                <TypePersonaRadio>
                  {((selectedPersona.clinica || selectedPersona.empresa) && (
                    <RadioGroup
                      disabled={newEmpresa}
                      align="center"
                      onChange={event => this.handleChangeRadio('radioValueCliEmp', event)}
                      value={radioValueCliEmp}
                    >
                      <Radio value="ADMINISTRADOR" paddingright="158">
                        Administrador
                      </Radio>
                      <Radio value="FUNCIONARIO">Usuário</Radio>
                    </RadioGroup>
                  )) || (
                    <RadioGroup
                      onChange={event => this.handleChangeRadio('radioValueFreela', event)}
                      value={radioValueFreela}
                    >
                      <Radio value="MEDICO">Médico do Trabalho</Radio>
                      <br />
                      <Radio value="ENFERMEIRO">Enfermeiro do Trabalho</Radio>
                      <br />
                      <Radio value="ENGENHEIRO">Engenheiro de Segurança do Trabalho</Radio>
                      <br />
                      <Radio value="TECNICO">Técnico do Trabalho</Radio>
                    </RadioGroup>
                  )}
                </TypePersonaRadio>
              </TypePersona>
              <LinePersona />
              {selectedPersonaOk && (
                <ButtonPersona>
                  <Button
                    onClick={() =>
                      onConfirmSelect({ persona, tipo: typePersonaSelected, newEmpresa })
                    }
                  >
                    Confirmar
                  </Button>
                </ButtonPersona>
              )}
            </React.Fragment>
          )}
        </SelectPersona>
      </Modal>
    );
  }
}

FormVinculoConta.propTypes = {
  showModalPersona: PropTypes.bool,
  onCloseModalPersona: PropTypes.func.isRequired,
  onConfirmSelect: PropTypes.func.isRequired,
  newEmpresa: PropTypes.bool.isRequired,
};

FormVinculoConta.defaultProps = {
  showModalPersona: false,
};

export default FormVinculoConta;
