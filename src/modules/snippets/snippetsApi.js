import firebase from '../../etc/firebaseConfig';

import auth from '../auth/authApi';
import snippetData from './snippetData';


const getUrlFor = function(user, obj) {
  return DB.ref(`${MODULE_NAME}/${user.uid}/${obj.id}`);
};

const MODULE_NAME = 'snippets';
const DB = firebase.database();

let currentUserId = null;

export default {
  createRecord: (record) => {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let userId = auth.user().uid.toString();
        let dbRef = DB.ref(`${MODULE_NAME}/${userId}`);
        let newRecordData = snippetData.buildRecordData(record);
        let newRecordRef = dbRef.push();

        newRecordRef.set(newRecordData, err => {
          if (err) {
            reject(err);
          } else {
            dbRef.limitToLast(1).once('value', snapshot => {
              resolve(snapshot.val());
            });
          }
        });
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  },

  /** Updates an existing record in the DB. */
  updateRecord: (record) => {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let recordUrl = getUrlFor(auth.user(), record);
        let snippet = snippetData.buildRecordData(record);

        if (record.created) {
          snippet.created = record.created;
        }

        recordUrl.update(snippet, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  },

  /** Destroys an existing record from the DB */
  destroyRecord: (record) => {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let recordUrl = getUrlFor(auth.user(), record);

        recordUrl.remove()
          .then(function() {
            resolve();
          })
          .catch(function(err) {
            reject(err);
          });
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  },

  /** Adds a listener to db state change events. */
  addDbListener: (callback) => {
    currentUserId = auth.user().uid.toString();
    DB.ref(`${MODULE_NAME}/${currentUserId}`).on('value', callback);
  },

  /** Removes a listener to db state change events. */
  removeDbListener: (callback) => {
    DB.ref(`${MODULE_NAME}/${currentUserId}`).off('value', callback);
  }
};
