import * as types from '../../constants/actionTypes';
import authData from './authData';


function _authAjaxStart() {
  return {
    type: types.AUTH_AJAX_START
  };
}

function _authAjaxEnd() {
  return {
    type: types.AUTH_AJAX_END
  };
}

function _loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

function _loginError(error) {
  return {
    type: types.LOGIN_ERROR,
    error
  };
}

function _logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

/*==============================================
 = Action Creators
 ==============================================*/
export default {
  authAjaxStart: () => {
    return function(dispatch) {
      dispatch(_authAjaxStart());
    };
  },

  authAjaxEnd: () => {
    return function(dispatch) {
      dispatch(_authAjaxEnd());
    };
  },

  loginSuccess: (user) => {
    return function(dispatch) {
      let cleanUserData = authData.buildUserData(user);
      dispatch(_loginSuccess(cleanUserData));
      dispatch(_authAjaxEnd());
    };
  },

  loginError: (error) => {
    return function(dispatch) {
      dispatch(_loginError(error));
      dispatch(_authAjaxEnd());
    };
  },

  logoutSuccess: () => {
    return function(dispatch) {
      dispatch(_logoutSuccess());
      dispatch(_authAjaxEnd());
    };
  }
}
