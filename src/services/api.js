/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken, getTokenUserActivate } from './auth';
import 'babel-polyfill';

const api = axios.create({
  baseURL: 'https://smart-total.appspot.com/',
});

api.interceptors.request.use(async config => {
  const token = getToken() || getTokenUserActivate();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
