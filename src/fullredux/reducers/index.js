import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { questionReducer } from './questionReducer';

import {userReducer} from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  question: questionReducer,
});

export default rootReducer;
