import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { questionReducer } from './questionReducer';
import { projectReducer } from './projectReducer';
import { internshipReducer } from './internshipReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  projects: projectReducer,
  internships: internshipReducer,
});

export default rootReducer;
