import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { questionReducer } from './questionReducer';
import { projectReducer } from './projectReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  projects: projectReducer,
});

export default rootReducer;
