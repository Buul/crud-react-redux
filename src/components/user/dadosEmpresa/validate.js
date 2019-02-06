import { validaCnpj } from '../../../helpers/validate';
import {
  CONTA_EMPRESA,
  FREELANCER_MEDICO,
  FREELANCER_ENFERMEIRO,
  FREELANCER_ENGENHEIRO,
  FREELANCER_TECNICO,
} from '../../../helpers/constants';

export const validate = (values, persona, edit) => {
  const errors = { cnae: [], rqe: [] };
  if (!validaCnpj(values.cnpj)) errors.cnpj = 'CNPJ é invalido';
  if (!values.cnpj) errors.cnpj = 'CNPJ é obrigatório';
  if (!values.razaoSocial) errors.razaoSocial = 'Razão Social é obrigatória';
  if (!values.cep) errors.cep = 'CEP é obrigatória';
  if (!values.bairro) errors.bairro = 'Bairro é obrigatória';
  if (!values.logradouro) errors.logradouro = 'Logradouro é obrigatório';
  if (!values.numero) errors.numero = 'Número é obrigatório';
  if (!values.cidade) errors.cidade = 'Cidade é obrigatório';
  if (!values.estado) errors.estado = 'Estado é obrigatório';
  if (!values.telefoneComercial) errors.telefoneComercial = 'Telefone é obrigatório';
  if (persona === CONTA_EMPRESA)
    if (values.cnae.length === 0) errors.cnae.push('Cnae é obrigatório');

  if (!edit) {
    if (persona === FREELANCER_MEDICO) if (!values.crm) errors.crm = 'CRM é obrigatório';
    if (persona === FREELANCER_MEDICO)
      if (values.rqe.length === 0) errors.rqe.push('RQE é obrigatório');
    if (persona === FREELANCER_ENFERMEIRO) if (!values.coren) errors.coren = 'COREN é obrigatório';
    if (persona === FREELANCER_ENGENHEIRO) if (!values.crea) errors.crea = 'CREA é obrigatório';
    if (persona === FREELANCER_TECNICO) if (!values.regMte) errors.regMte = 'REG MTE é obrigatório';
  }
  return errors;
};

export default validate;
