import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import actions from '../uiActions';


class SideNav extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onExpandCollapse(e) {
    e.preventDefault();

    this.props.actions.toggleCollapseView();
  }

  render(){
    const {loggedIn, collapsed} = this.props;
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

            <h4>In Dev</h4>
            <ul onClick={(e) => this.onExpandCollapse(e)}>
              <li><a href>Expand/Collapse</a></li>
            </ul>
          </span>
        }
      </div>
    );
  }
}

SideNav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email,
    collapsed: state.ui.collapsed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
