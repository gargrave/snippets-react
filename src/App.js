import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';

// these two imports need to be called to initialize them; ignore any 'unused' errors
import firebaseConfig from './etc/firebaseConfig';
import bootstrap from 'bootstrap';

import FirebaseContainer from './modules/firebase/FirebaseContainer';
import Navbar from './modules/layout/components/Navbar';
import SlideInNavMenu from './modules/layout/components/SlideInNavMenu';


class App extends React.Component {
  render() {
    return (
      <div>

        <FirebaseContainer />

        <SlideInNavMenu
          location={this.props.location}
        />

        <Navbar
          user={this.props.user}
          location={this.props.location}
        />

        <div className="container-fluid">
          <main className="row">
            <div className="col-xs-12 main-content-area">
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

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
