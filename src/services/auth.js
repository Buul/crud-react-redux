import {
  TOKEN_KEY_SMART_TOTAL,
  TOKEN_KEY_SMART_TOTAL_USER_ACTIVATE,
  TOKEN_USER_ID,
  TOKEN_COMPANY_ID,
} from '../helpers/constants';

export const TOKEN_KEY = TOKEN_KEY_SMART_TOTAL;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserTokenUserId = () => localStorage.getItem(TOKEN_USER_ID);
export const getCompanyTokenCompanyId = () => localStorage.getItem(TOKEN_COMPANY_ID);
export const getTokenUserActivate = () => localStorage.getItem(TOKEN_KEY_SMART_TOTAL_USER_ACTIVATE);
export const login = data => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(TOKEN_USER_ID, data.userId);
  localStorage.setItem(TOKEN_COMPANY_ID, data.companyId);
};
export const setTokenActivateUser = token => {
  localStorage.setItem(TOKEN_KEY_SMART_TOTAL_USER_ACTIVATE, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_USER_ID);
  localStorage.removeItem(TOKEN_COMPANY_ID);
};
