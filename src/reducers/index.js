import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import user from './authReducer';
import profile from './profileReducer';
import ui from './uiReducer';
import snippets from './snippetsReducer';


const rootReducer = combineReducers({
  user,
  profile,
  ui,
  snippets,
  routing: routerReducer
});

export default rootReducer;
