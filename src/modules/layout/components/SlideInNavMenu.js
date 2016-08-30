import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import uiActions from '../uiActions';


class SlideInNavMenu extends Component {
  onExpandCollapse(e) {
    e.preventDefault();
    this.props.uiActions.toggleCollapseView();
  }

  onLogoutClick(e) {
    e.preventDefault();
  }

  render() {
    const {user} = this.props;
    return (
      <aside className="navmenu navmenu-default navmenu-fixed-left offcanvas-sm">

        {!user.email &&
          <ul className="nav navmenu-nav">
            <li><h4>Account</h4></li>
            <li><Link to="/account/login">Login</Link></li>
            <li><Link to="/account/create">New Account</Link></li>
          </ul>
        }

        {!!user.email &&
          <ul className="nav navmenu-nav">
            <li><h4>Navigation</h4></li>
            <li className="active"><Link to="/snippets">My Snippets</Link></li>
            <li><Link to="/snippets/filter/starred">Starred</Link></li>
            <li><Link to="/snippets/filter/archived">Archived</Link></li>
          </ul>
        }
        {!!user.email &&
          <ul className="nav navmenu-nav">
            <li><h4>In Dev</h4></li>
            <li><a href="#" onClick={(e) => this.onExpandCollapse(e)}>Expand/Collapse</a></li>
          </ul>
        }
        {!!user.email &&
          <ul className="nav navmenu-nav">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <strong>{user.email}</strong> <b className="caret"></b>
              </a>

              <ul className="dropdown-menu navmenu-nav">
                <li>
                  <Link to="/account">
                    <span className="fa fa-user fa-lg"></span>&nbsp; &nbsp;
                    Profile
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={(e) => this.onLogoutClick(e)}>
                    <span className="fa fa-sign-out fa-lg"></span>&nbsp; &nbsp;
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        }
      </aside>
    );
  }
}

SlideInNavMenu.propTypes = {
  user: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  uiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    collapsed: state.ui.collapsed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideInNavMenu);
