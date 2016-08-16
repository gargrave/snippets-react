import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import user from './authReducer';
import profile from './profileReducer';
import snippets from './snippetsReducer';


const rootReducer = combineReducers({
  user,
  profile,
  snippets,
  routing: routerReducer
});

export default rootReducer;
