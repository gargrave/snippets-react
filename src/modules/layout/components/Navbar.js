import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {AUTH_API} from '../../../constants/env';
import goto from '../../../utils/goto';


class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  getActiveClass(path) {
    return path == location.pathname ? 'active' : '';
  }

  getNavbarBrandText() {
    let path = '';
    let loc = this.props.location.pathname;
    if (loc.includes('filter/starred')) {
      path = <span>&nbsp;&nbsp;|&nbsp;&nbsp;Starred</span>;
    } else if (loc.includes('filter/archived')) {
      path = <span>&nbsp;&nbsp;|&nbsp;&nbsp;Archived</span>;
    }
    return <span>Snippets{path}</span>;
  }

  /** Handler for 'Logout' button; ends the current session. */
  onLogoutClick(event) {
    event.preventDefault();

    this.setState({working: true});
    AUTH_API.signOut()
      .then(() => {
        this.setState({working: false});
        goto.route('/account/login');
      });
  }

  render() {
    const loggedIn = !!this.props.user.email;
    const {user} = this.props;

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="offcanvas" data-target=".navmenu">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">
              {this.getNavbarBrandText()}
            </Link>
          </div>

          <div className="collapse navbar-collapse">
            {/* account/profile dropdown, when user is logged in */}
            {!!loggedIn &&
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                  {user.email} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">

                  <li className={this.getActiveClass('/account')}>
                    <Link to="/account">
                      <span className="fa fa-user fa-lg"></span>&nbsp; &nbsp;
                      Profile
                    </Link>
                  </li>

                  <li>
                    <a href="" onClick={this.onLogoutClick}>
                      <span className="fa fa-sign-out fa-lg"></span>&nbsp; &nbsp;
                      Logout
                    </a>
                  </li>

                </ul>
              </li>
            </ul>
            }

            {/* login link, when user is not logged in */}
            {!user.email &&
            <ul className="nav navbar-nav navbar-right">
              <li className={this.getActiveClass('/game')}>
                <Link to="/account/login">Login</Link>
              </li>
            </ul>
            }

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object
};

export default Navbar;
