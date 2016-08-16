import * as types from '../constants/actionTypes';
import initialState from './initialState';


export default function snippetsReducer(state = initialState.snippets, action) {
  switch (action.type) {

    case types.FETCH_SNIPPETS_SUCCESS:
      return action.snippets;

    case types.CREATE_SNIPPET_SUCCESS:
      return [...state, action.snippet];

    case types.LOGOUT_SUCCESS:
      return [];

    default:
      return state;
  }
}
