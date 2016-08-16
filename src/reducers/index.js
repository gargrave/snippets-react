import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import snippets from './snippetsReducer';


const rootReducer = combineReducers({
  snippets,
  routing: routerReducer
});

export default rootReducer;
