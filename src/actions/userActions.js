import {
  SET_PERSIST_MODE,
  SET_CNAES,
  SET_BANCOS,
  SET_EMPRESAS,
  SET_ACCOUNT,
  SET_COMPANY_ID,
  SET_USER,
  SET_USER_BY_COMPANY_ID,
} from '../helpers/constants';

export const persistMode = response => ({
  type: SET_PERSIST_MODE,
  payload: response,
});

export const setCnaes = response => ({
  type: SET_CNAES,
  payload: response,
});

export const setBancos = response => ({
  type: SET_BANCOS,
  payload: response,
});

export const setEmpresas = response => ({
  type: SET_EMPRESAS,
  payload: response,
});

export const setAccount = response => ({
  type: SET_ACCOUNT,
  payload: response,
});

export const setCompany = response => ({
  type: SET_COMPANY_ID,
  payload: response,
});

export const setUser = response => ({
  type: SET_USER,
  payload: response,
});

export const setUsersByCompanyId = response => ({
  type: SET_USER_BY_COMPANY_ID,
  payload: response,
});
