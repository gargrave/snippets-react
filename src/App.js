import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import firebaseConfig from './etc/firebaseConfig';
import bootstrap from 'bootstrap';

import FirebaseContainer from './modules/firebase/FirebaseContainer';
import Navbar from './modules/layout/components/Navbar';
import SideNav from './modules/layout/components/SideNav';


class App extends React.Component {
  render() {
    return (
      <div>

        <FirebaseContainer />
        <Navbar
          user={this.props.user}
          location={this.props.location}
        />

        <div className="container-fluid">

          <aside className="col-md-2 col-md-offset-1 hidden-sm hidden-xs">
            <div className="row">
              <SideNav />
            </div>
          </aside>

          <main className="col-md-8">
            <div className="row">
              {this.props.children}
            </div>
          </main>

        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
