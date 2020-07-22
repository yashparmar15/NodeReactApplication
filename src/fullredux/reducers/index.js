import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { questionReducer } from './questionReducer';
import { projectReducer } from './projectReducer';
import { userReducer } from './userReducer';
import {allUserReducer} from './allUserReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  question: questionReducer,
  projects: projectReducer,
  users : allUserReducer,
});

export default rootReducer;
