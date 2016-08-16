import React from 'react';
import request from 'superagent';


class HomePage extends React.Component {
  testGet() {
    request
      .get('https://snippets-dev-c5838.firebaseio.com/snippets.json')
      .end((err, res) => {
        if (err) {
          console.log('err:');
          console.log(err);
        } else {
          console.log('res.body:');
          console.log(res.body);
        }
      });
    console.log('test GET request');
  }

  testPost() {
    console.log('test POST request');
  }

  render() {
    return (
      <div>
        <h2>Snippets</h2>
        <hr/>

        <span
          className="btn btn-primary"
          onClick={() => this.testGet()}>
          Test GET
        </span>

        <br/>
        <br/>

        <span
          className="btn btn-info"
          onClick={() => this.testPost()}>
          Test POST
        </span>
      </div>
    );
  }
}

export default HomePage;
