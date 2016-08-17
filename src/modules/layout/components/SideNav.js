import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';


const SideNav = ({loggedIn}) => {
  return (
    <div>
      <h4>Navigation</h4>
      <ul>
        <li><IndexLink to="/">Home</IndexLink></li>
        {loggedIn &&
          <span>
            <li><Link to="/snippets">Snippets</Link></li>
          </span>
        }
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <h4>Snippets</h4>
      <ul>
        <li><Link to="/snippets">My Snippets</Link></li>
        <li><Link to="/snippets">Starred</Link></li>
        <li><Link to="/snippets">Archived</Link></li>
      </ul>
    </div>
  );
};

SideNav.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default SideNav;
