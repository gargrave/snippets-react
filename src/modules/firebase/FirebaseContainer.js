import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import authActions from '../auth/authActions';
import profileActions from '../profile/profileActions';
import snippetsActions from '../snippets/snippetsActions';

import {USE_MOCK_APIS} from '../../constants/env';
import _authApi from '../auth/authApi';
import _authApiMock from '../auth/authApiMock';
import _profileApi from '../profile/profileApi';
import _profileApiMock from '../profile/profileApiMock';
import _snippetsApi from '../snippets/snippetsApi';
import _snippetsApiMock from '../snippets/snippetsApiMock';


const AUTH_API = USE_MOCK_APIS ? _authApiMock : _authApi;
const PROFILES_API = USE_MOCK_APIS ? _profileApiMock : _profileApi;
const SNIPPETS_API = USE_MOCK_APIS ? _snippetsApiMock : _snippetsApi;

class FirebaseContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onAuthStateChange = this.onAuthStateChange.bind(this);
    this.onProfileValueChange = this.onProfileValueChange.bind(this);
    this.onSnippetsValueChange = this.onSnippetsValueChange.bind(this);
  }

  componentWillMount() {
    AUTH_API.addAuthStateListener(this.onAuthStateChange);
  }

  onAuthStateChange(user) {
    if (user) {
      // if logged in, watch for changes to relavent databases
      PROFILES_API.addDbListener(this.onProfileValueChange);
      SNIPPETS_API.addDbListener(this.onSnippetsValueChange);
      this.props.authActions.loginSuccess(user);
    } else {
      // if logged out, clear all listeners
      PROFILES_API.removeDbListener(this.onProfileValueChange);
      SNIPPETS_API.removeDbListener(this.onSnippetsValueChange);
      this.props.authActions.logoutSuccess();
    }
  }

  onProfileValueChange(snapshot) {
    this.props.profileActions.fetchProfileSuccess(snapshot.val());
  }

  onSnippetsValueChange(snapshot) {
    this.props.snippetsActions.afterFetch(snapshot.val());
  }

  render() {
    return (
      <span></span>
    );
  }
}

FirebaseContainer.propTypes = {
  authActions: PropTypes.object.isRequired,
  profileActions: PropTypes.object.isRequired,
  snippetsActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
    snippetsActions: bindActionCreators(snippetsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseContainer);
