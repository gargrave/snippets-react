import * as types from '../../constants/actionTypes';

import {fbToArray} from '../../utils/firebaseUtils';
import api from './snippetsApi';


function fetchBegin() {
  return {
    type: types.FETCH_SNIPPETS_BEGIN
  };
}

function fetchSuccess(snippets) {
  return {
    type: types.FETCH_SNIPPETS_SUCCESS,
    snippets
  };
}

function fetchError(error) {
  return {
    type: types.FETCH_SNIPPETS_ERROR,
    error
  };
}

/*=============================================
 = Action Creators
 =============================================*/

export function fetch() {
  return function(dispatch) {
    dispatch(fetchBegin());
    return api.getSnippets()
      .then(res => {
        dispatch(fetchSuccess(fbToArray(res)));
      })
      .catch(err => {
        dispatch(fetchError(err));
      });
  }
}
