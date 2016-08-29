import * as types from '../constants/actionTypes';
import initialState from './initialState';


export default function uiReducer(state = initialState.ui, action) {
  switch (action.type) {

    case types.TOGGLE_COLLAPSE_VIEW:
      state.collapsed = !state.collapsed;
      return Object.assign({}, state);

    default:
      return state;
  }
}
