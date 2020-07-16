import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { questionReducer } from './questionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
});

export default rootReducer;
