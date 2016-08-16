import * as types from '../../constants/actionTypes';

import {fbToArray} from '../../utils/firebaseUtils';
import api from './snippetsApi';


/*=============================================
 = 'fetch' actions
 =============================================*/
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
 = 'create' actions
 =============================================*/
function createBegin() {
  return {
    type: types.CREATE_SNIPPET_BEGIN
  };
}

function createSuccess(snippet) {
  return {
    type: types.CREATE_SNIPPET_SUCCESS,
    snippet
  };
}

function createError(error) {
  return {
    type: types.CREATE_SNIPPET_ERROR,
    error
  };
}

/*=============================================
 = Action Creators
 =============================================*/
export default {
  fetch: () => {
    return (dispatch) => {
      dispatch(fetchBegin());
      return api.getSnippets()
        .then(res => {
          dispatch(fetchSuccess(fbToArray(res)));
        })
        .catch(err => {
          dispatch(fetchError(err));
          throw (err);
        });
    };
  },

  create: (data) => {
    return (dispatch) => {
      dispatch(createBegin());
      return api.createSnippet(data)
        .then(res => {
          const snippet = Object.assign({}, data);
          snippet.id = res.name;
          dispatch(createSuccess(snippet));
        })
        .catch(err => {
          dispatch(createError(err));
          throw (err);
        });
    };
  }
};

