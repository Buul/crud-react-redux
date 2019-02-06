import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import busyCounterReducer from './busyCounterReducer';
import dialogReducer from './dialogReducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  busyCounterReducer,
  dialogReducer,
});

export default rootReducer;
