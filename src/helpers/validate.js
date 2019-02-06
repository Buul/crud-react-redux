/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
export const validaCpf = cpf => {
  let soma;
  let resto;
  const strCpf = cpf.replace(/[^\d]+/g, '');
  soma = 0;

  if (strCpf.length < 9) return false;

  if (strCpf === '00000000000') {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(strCpf.substring(i - 1, i), 10) * (11 - i);
  }

  resto = soma % 11;

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto !== parseInt(strCpf.substring(9, 10), 10)) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(strCpf.substring(i - 1, i), 10) * (12 - i);
  }
  resto = soma % 11;

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto !== parseInt(strCpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
};

export const validaCnpj = cnpjParam => {
  const cnpj = cnpjParam.replace(/[^\d]+/g, '');
  if (cnpj === '') return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
};

export const validaEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validaTelefone = telefone => telefone.length >= 13;
