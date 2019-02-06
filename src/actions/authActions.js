import {
  SET_CLIENT_LOGGED,
  SET_MENU_LINK,
  SET_ACTIVATE_USER,
  SET_ROLE,
  SET_RESPONSIVE_MENU,
} from '../helpers/constants';

export const setClientLogged = response => ({
  type: SET_CLIENT_LOGGED,
  payload: response,
});

export const setMenuLink = response => ({
  type: SET_MENU_LINK,
  payload: response,
});

export const setResponsiveMenu = response => ({
  type: SET_RESPONSIVE_MENU,
  payload: response,
});

export const setActivateUser = response => ({
  type: SET_ACTIVATE_USER,
  payload: response,
});

export const setRole = response => ({
  type: SET_ROLE,
  payload: response,
});
