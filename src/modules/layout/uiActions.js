import * as types from '../../constants/actionTypes';


function _toggleCollapseView() {
  return {
    type: types.TOGGLE_COLLAPSE_VIEW
  };
}

export default {
  toggleCollapseView: () => {
    return (dispatch) => {
      return dispatch(_toggleCollapseView());
    };
  }
};
