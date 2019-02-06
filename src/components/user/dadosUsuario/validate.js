import { validaCpf, validaEmail, validaTelefone } from '../../../helpers/validate';

export const validate = values => {
  const errors = {};
  if (!validaCpf(values.cpf)) errors.cpf = 'CPF é inválido';
  if (!validaEmail(values.email)) errors.email = 'E-mail é inválido';
  if (!validaTelefone(values.telefone)) errors.telefone = 'Digite o DDD e o telefone';
  if (!values.cpf) errors.cpf = 'CPF é obrigatório';
  if (!values.nome) errors.nome = 'Nome é obrigatório';
  if (!values.sobrenome) errors.sobrenome = 'Sobrenome é obrigatório';
  if (!values.email) errors.email = 'E-mail é obrigatório';
  if (!values.telefone) errors.telefone = 'Telefone é obrigatório';

  return errors;
};

export default validate;
