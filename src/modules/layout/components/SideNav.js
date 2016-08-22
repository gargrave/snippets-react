import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';


const SideNav = ({loggedIn}) => {
  return (
    <div>
      <h4>Navigation</h4>

      {!loggedIn &&
        <ul>
          <li><Link to="/account/login">Login</Link></li>
          <li><Link to="/account/create">New Account</Link></li>
        </ul>
      }

      {loggedIn &&
        <span>
          <ul>
            <li><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <h4>Snippets</h4>
          <ul>
            <li><Link to="/snippets">My Snippets</Link></li>
            <li><Link to="/snippets/filter/starred">Starred</Link></li>
            <li><Link to="/snippets/filter/archived">Archived</Link></li>
          </ul>
        </span>
      }
    </div>
  );
};

SideNav.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default SideNav;
