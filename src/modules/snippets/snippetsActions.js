import * as types from '../../constants/actionTypes';

import {fbToArray} from '../firebase/firebaseUtils';
import {USE_MOCK_APIS} from '../../constants/env';

import mockSnippetsApi from './snippetsApiMock';
import liveSnippetsApi from './snippetsApi';


const api = USE_MOCK_APIS ? mockSnippetsApi : liveSnippetsApi;


/*=============================================
 = 'fetch' actions
 =============================================*/
function fetchSnippetsSuccess(snippets) {
  return {
    type: types.FETCH_SNIPPETS_SUCCESS,
    snippets
  };
}

/*=============================================
 = 'create' actions
 =============================================*/
function createSnippetBegin() {
  return {
    type: types.CREATE_SNIPPET_BEGIN
  };
}

function createSnippetSuccess(snippet) {
  return {
    type: types.CREATE_SNIPPET_SUCCESS,
    snippet
  };
}

function createSnippetError(error) {
  return {
    type: types.CREATE_SNIPPET_ERROR,
    error
  };
}

/*=============================================
 = 'update' actions
 =============================================*/
function updateSnippetBegin() {
  return {
    type: types.UPDATE_SNIPPET_BEGIN
  };
}

function updateSnippetSuccess(snippet) {
  return {
    type: types.UPDATE_SNIPPET_SUCCESS,
    snippet
  };
}

function updateSnippetError(error) {
  return {
    type: types.UPDATE_SNIPPET_ERROR,
    error
  };
}

/*=============================================
 = 'delete' actions
 =============================================*/
function deleteSnippetBegin() {
  return {
    type: types.DELETE_SNIPPET_BEGIN
  };
}

function deleteSnippetSuccess(snippet) {
  return {
    type: types.DELETE_SNIPPET_SUCCESS,
    snippet
  };
}

function deleteSnippetError(error) {
  return {
    type: types.DELETE_SNIPPET_ERROR,
    error
  };
}

/*=============================================
 = Action Creators
 =============================================*/
export default {
  afterFetch: (snippets) => {
    return function(dispatch) {
      dispatch(fetchSnippetsSuccess(fbToArray(snippets)));
    };
  },

  create: (data) => {
    return (dispatch) => {
      dispatch(createSnippetBegin());
      return api.createRecord(data)
        .then(res => {
          dispatch(createSnippetSuccess(res));
        })
        .catch(err => {
          dispatch(createSnippetError(err));
          throw (err);
        });
    };
  },

  update: (snippet) => {
    return function(dispatch) {
      dispatch(updateSnippetBegin());
      return api.updateRecord(snippet)
        .then(res => {
          dispatch(updateSnippetSuccess(res));
        })
        .catch(err => {
          dispatch(updateSnippetError());
          throw (err);
        });
    };
  },

  remove(snippet) {
    return function(dispatch) {
      dispatch(deleteSnippetBegin());
      return api.destroyRecord(snippet)
        .then(() => {
          dispatch(deleteSnippetSuccess());
        })
        .catch(err => {
          dispatch(deleteSnippetError());
          throw (err);
        });
    };
  }
};

