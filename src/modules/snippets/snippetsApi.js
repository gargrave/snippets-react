import request from 'superagent';

import {fbToArray} from '../../utils/firebaseUtils';


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
  }
};
