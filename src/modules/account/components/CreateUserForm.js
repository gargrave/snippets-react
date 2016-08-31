import React, {PropTypes} from 'react';

import goto from '../../../utils/goto';
import TextInput from '../../common/components/TextInput';
import PasswordInput from '../../common/components/PasswordInput';


const CreateUserForm = ({working, user, onChange, onSubmit, errors}) => {
  function onLoginClick(event) {
    event.preventDefault();
    goto.route('/account/login');
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

        <TextInput
          label="Confirm Email"
          value={user.emailConfirm}
          placeholder="Re-enter Email"
          name="emailConfirm"
          onChange={onChange}
          error={errors.emailConfirm}
        />

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="Password"
          name="pass"
          onChange={onChange}
          error={errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          value={user.passConfirm}
          placeholder="Confirm Password"
          name="passConfirm"
          onChange={onChange}
          error={errors.passwordConfirm}
        />

        <input
          type="submit"
          value="Submit"
          className="btn btn-success"
          onClick={onSubmit}
          disabled={working}
        />&nbsp;

        <span
          className="btn btn-default pull-right"
          onClick={(e) => onLoginClick(e)}>
          Login
        </span>
      </form>
    </div>
  );
};

CreateUserForm.propTypes = {
  working: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGotoLogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CreateUserForm;
