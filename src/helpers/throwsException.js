import { forEach } from 'lodash';
import { REPRESENTATIVE_CPF_EXISTS, REPRESENTATIVE_EMAIL_EXISTS, CNPJ_EXISTS } from './constants';

export const throwsException = (errorList, msgDefault) => {
  const errorReturn = [];
  if (msgDefault) errorReturn.push(msgDefault);
  forEach(errorList, error => {
    switch (error) {
      case REPRESENTATIVE_CPF_EXISTS:
        errorReturn.push('- CPF do usuário representante já existe');
        break;
      case REPRESENTATIVE_EMAIL_EXISTS:
        errorReturn.push('- EMAIL do usuário representante já existe');
        break;
      case CNPJ_EXISTS:
        errorReturn.push('- CNPJ já existe');
        break;
      default:
        break;
    }
  });
  return errorReturn;
};

export default throwsException;
