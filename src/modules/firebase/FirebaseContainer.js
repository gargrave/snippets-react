import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import authActions from '../auth/authActions';
import profileActions from '../profile/profileActions';

import {USE_MOCK_APIS} from '../../constants/env';
import _authApi from '../auth/authApi';
import _authApiMock from '../auth/authApiMock';
import _profileApi from '../profile/profileApi';
import _profileApiMock from '../profile/profileApiMock';


const AUTH_API = USE_MOCK_APIS ? _authApiMock : _authApi;
const PROFILE_API = USE_MOCK_APIS ? _profileApiMock : _profileApi;


class FirebaseContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onAuthStateChange = this.onAuthStateChange.bind(this);
    this.onProfileValueChange = this.onProfileValueChange.bind(this);
  }

  componentWillMount() {
    AUTH_API.addAuthStateListener(this.onAuthStateChange);
  }

  onAuthStateChange(user) {
    if (user) {
      // if logged in, watch for changes to relavent databases
      PROFILE_API.addDbListener(this.onProfileValueChange);
      this.props.authActions.loginSuccess(user);
    } else {
      // if logged out, clear all listeners
      PROFILE_API.removeDbListener(this.onProfileValueChange);
      this.props.authActions.logoutSuccess();
    }
  }

  onProfileValueChange(snapshot) {
    this.props.profileActions.fetchProfileSuccess(snapshot.val());
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
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseContainer);
