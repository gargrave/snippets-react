import React, {PropTypes} from 'react';

import goto from '../../../utils/goto';
import TextInput from '../../common/components/TextInput';
import PasswordInput from '../../common/components/PasswordInput';


const LoginForm = ({working, user, onChange, onSubmit, errors}) => {
  function onSignupClick(event) {
    event.preventDefault();
    goto.route('/account/create');
  }

  return (
    <div>
      <form>
        <TextInput
          label="Email"
          value={user.email}
          placeholder="Email"
          name="email"
          onChange={onChange}
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="Password"
          name="pass"
          onChange={onChange}
          error={errors.password}
        />

        <input
          type="submit"
          value="Submit"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={working}
        />&nbsp;

        <span
          className="btn btn-default pull-right"
          onClick={(e) => onSignupClick(e)}>
          Sign Up
        </span>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  working: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default LoginForm;
