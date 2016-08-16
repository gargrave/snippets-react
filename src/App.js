import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import bootstrap from 'bootstrap';

import Navbar from './modules/layout/components/Navbar';


class App extends React.Component {
  render() {
    return (
      <div>

        <Navbar />

        <div className="container">
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

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
