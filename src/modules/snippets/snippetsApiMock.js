/* eslint-disable no-console */
import auth from '../auth/authApiMock';
import {each} from 'lodash';

import {MOCK_API_DELAY} from '../../constants/env';
import snippetData from './snippetData';


let snippetId = 10;
let mockDate = new Date();
let timestamp = mockDate.getTime();
let snippets = {
  '0': {
    '0': {
      title: 'A Home Maintenance Checklist',
      url: 'http://www.artofmanliness.com/2013/10/08/keep-your-house-in-tip-top-shape-an-incredibly-handy-home-maintenance-checklist/',
      archived: false,
      created: timestamp,
      modified: timestamp
    },
    '1': {
      title: 'My Retirement Plan',
      url: 'https://connect.secure.wellsfargo.com/auth/logout?origin=irt&code=7101',
      archived: false,
      created: timestamp,
      modified: timestamp
    },
    '2': {
      title: 'Lodash Docs',
      url: 'https://lodash.com/docs',
      archived: true,
      created: timestamp,
      modified: timestamp
    }
  }
};

/** Auth state change listeners; this is to mock the real-time nature of firebase. */
let listeners = [];


class SnippetApiMock {
  /** Creates and saves a new record to the DB. */
  static createRecord(record) {
    console.log('MOCK SNIPPET API: using mock API -> createRecord()');
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        setTimeout(() => {
          let userId = auth.user().uid.toString();
          let userSnippets = snippets[userId];

          let id = (snippetId++).toString();
          let snippet = snippetData.buildRecordData(record);
          userSnippets[id] = snippet;

          this.notifyListeners();
          resolve(snippet);
        }, MOCK_API_DELAY);
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Updates an existing record in the DB. */
  static updateRecord(record) {
    console.log('MOCK SNIPPET API: using mock API -> updateRecord()');
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let userSnippets = snippets[auth.user().uid.toString()];
        let id = record.id;

        if (userSnippets[id]) {
          setTimeout(() => {
            let snippet = snippetData.buildRecordData(record);
            snippet.id = id;
            snippet.created = record.created;
            userSnippets[id] = snippet;

            this.notifyListeners();
            resolve();
          }, MOCK_API_DELAY);
        } else {
          reject(`No Snippet found with id: ${id}.`);
        }
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Destroys an existing record from the DB */
  static destroyRecord(record) {
    console.log('MOCK SNIPPET API: using mock API -> destroyRecord()');
    if (auth.isLoggedIn()) {
      let userSnippets = snippets[auth.user().uid.toString()];

      if (userSnippets[record.id]) {
        return new Promise((resolve) => {
          setTimeout(() => {
            delete userSnippets[record.id];
            this.notifyListeners();
            resolve();
          }, MOCK_API_DELAY);
        });
      }
    }
  }

  /** Adds a listener to db state change events. */
  static addDbListener(callback) {
    console.log('MOCK SNIPPET API: using mock API -> addDbListener()');
    listeners.push(callback);
    callback({
      val: function() {
        return snippets[auth.user().uid.toString()];
      }
    });
  }

  /** Calls all registered state change listeners */
  static notifyListeners() {
    console.log('MOCK SNIPPET API: using mock API -> notifyListeners()');
    each(listeners, callback => {
      callback({
        val: function() {
          return snippets[auth.user().uid.toString()];
        }
      });
    });
  }

  /** Adds a listener to db state change events. */
  static removeDbListener(callback) {
    console.log('MOCK SNIPPET API: using mock API -> removeDbListener()');
    listeners = [];
  }
}

export default SnippetApiMock;
