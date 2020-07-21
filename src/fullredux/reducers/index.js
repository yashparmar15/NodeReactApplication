import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { questionReducer } from './questionReducer';
import { projectReducer } from './projectReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  question: questionReducer,
  projects: projectReducer,
});

export default rootReducer;
