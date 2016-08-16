import request from 'superagent';

import {fbToArray} from '../firebase/firebaseUtils';


const API_ROOT = 'https://snippets-dev-c5838.firebaseio.com/snippets';

export default {
  getSnippets() {
    return new Promise((resolve, reject) => {
      request.get(API_ROOT + '.json')
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    });
  },

  createSnippet(data) {
    return new Promise((resolve, reject) => {
      request.post(API_ROOT + '.json')
        .send(data)
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    });
  }
};
