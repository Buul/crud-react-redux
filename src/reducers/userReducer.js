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

const INITIAL_STATE = {
  persist: { active: false, title: '', back: '' },
  cnaeList: [],
  bancoList: [],
  empresaList: [],
  account: { company: {}, representativeUser: {}, financialRepresentativeUser: {} },
  company: {},
  user: {},
  usersByCompanyId: { listUser: [], company: {} },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PERSIST_MODE:
      return {
        ...state,
        persist: action.payload,
      };
    case SET_CNAES:
      return {
        ...state,
        cnaeList: action.payload,
      };
    case SET_BANCOS:
      return {
        ...state,
        bancoList: action.payload,
      };
    case SET_EMPRESAS:
      return {
        ...state,
        empresaList: action.payload,
      };
    case SET_ACCOUNT:
      if (action.payload.company)
        return {
          ...state,
          account: {
            ...state.account,
            company: action.payload.company,
          },
        };
      if (action.payload.representativeUser)
        return {
          ...state,
          account: {
            ...state.account,
            representativeUser: action.payload.representativeUser,
          },
        };
      if (action.payload.financialRepresentativeUser)
        return {
          ...state,
          account: {
            ...state.account,
            financialRepresentativeUser: action.payload.financialRepresentativeUser,
          },
        };
      return state;
    case SET_COMPANY_ID:
      return {
        ...state,
        company: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_BY_COMPANY_ID:
      return {
        ...state,
        usersByCompanyId: action.payload,
      };
    default:
      return state;
  }
};
