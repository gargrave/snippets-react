import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';

import {AUTH_API} from '../../../constants/env';
import goto from '../../../utils/goto';
import validate from '../../../utils/validate';
import LoginForm from '../components/LoginForm';


class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.resetState();

    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.gotoCreatePage = this.gotoCreatePage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.gotoAccountPage();
    }
  }

  resetState() {
    this.state = {
      working: false,
      // user details for existing users
      loginUser: {
        email: '',
        pass: ''
      },
      // validation errors
      errors: {
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: ''
      },
      // server/ajax error
      apiError: ''
    };
  }

  gotoAccountPage() {
    goto.route('/account');
  }

  gotoCreatePage() {
    goto.route('/account/create');
  }

  gotoListPage() {
    goto.route('/snippets');
  }

  /*==============================================
   = Validation
   ==============================================*/
  isValid(user) {
    let valid = true;
    let errors = {};

    // validate email
    let emailParams = { required: true, format: 'email' };
    let emailVal = validate(user.email, emailParams);
    if (!emailVal.valid) {
      errors.email = emailVal.error;
      valid = false;
    }

    // validate password
    let passParams = { required: true, minLength: 6 };
    let passVal = validate(user.pass, passParams);
    if (!passVal.valid) {
      errors.password = passVal.error;
      valid = false;
    }

    this.setState({ errors });
    return valid;
  }

  /*==============================================
   = Event Handlers
   ==============================================*/
  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let user = this.state.loginUser;
    user[propKey] = event.target.value;
    this.setState({ user });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid(this.state.loginUser)) {
      let user = this.state.loginUser;
      this.setState({
        working: true,
        apiError: ''
      });

      AUTH_API.signInWithEmail(user.email, user.pass)
        .then(() => {
          this.resetState();
          toastr.success('Logged in', 'Success');
          this.gotoListPage();
        })
        .catch(err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Login error', 'Error');
        });
    }
  }

  /*==============================================
   = Render
   ==============================================*/
  render() {
    const {apiError} = this.state;
    return (
      <div>
        {apiError &&
          <div className="alert alert-danger">{apiError}</div>
        }

        <div className="panel panel-default snippet-panel">

          <div className="panel-heading">
            <h3 className="panel-title">Login</h3>
          </div>

          <div className="panel-body">
            <LoginForm
              working={this.state.working}
              user={this.state.loginUser}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              errors={this.state.errors}
              apiError={this.state.apiError}
            />
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
