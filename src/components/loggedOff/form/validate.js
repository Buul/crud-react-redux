import { validaCpf } from '../../../helpers/validate';

const validate = (values, type) => {
  const errors = {};
  if (type !== 'activeUser') {
    if (!validaCpf(values.cpf)) errors.cpf = 'CPF é invalido';
    if (!values.cpf) errors.cpf = 'CPF é obrigatório';
  }
  if (type === 'activeUser') {
    if (values.repeatPassword !== values.password)
      errors.repeatPassword = 'As 2 senhas devem coincidir';
    if (!values.repeatPassword) errors.repeatPassword = 'Repetir senha é obrigatório';
  }
  if (type !== 'recovery') if (!values.password) errors.password = 'Senha é obrigatório';

  return errors;
};

export default validate;
