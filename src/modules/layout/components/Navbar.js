import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import toastr from 'toastr';


class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  getActiveClass(path) {
    return path == location.pathname ? 'active' : '';
  }

  /** Handler for 'Logout' button; ends the current session. */
  onLogoutClick(event) {
    event.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Snippets</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-right">
              <li className={this.getActiveClass('/game')}>
                <Link to="/account/login">Login</Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  location: PropTypes.object
};

export default Navbar;
