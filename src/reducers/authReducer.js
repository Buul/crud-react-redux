import {
  SET_CLIENT_LOGGED,
  SET_MENU_LINK,
  SET_ACTIVATE_USER,
  SET_RESPONSIVE_MENU,
  SET_ROLE,
} from '../helpers/constants';

const INITIAL_STATE = {
  client: {},
  click: {},
  activateUser: { active: false, userData: {} },
  responsiveMenu: { active: false },
  role: { role: '', menu: [] },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLIENT_LOGGED:
      return {
        ...state,
        client: action.payload,
      };
    case SET_MENU_LINK:
      return {
        ...state,
        click: action.payload,
      };
    case SET_ACTIVATE_USER:
      return {
        ...state,
        activateUser: action.payload,
      };
    case SET_RESPONSIVE_MENU:
      return {
        ...state,
        responsiveMenu: action.payload,
      };
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};
