import {expect} from 'chai';
import request from 'superagent';

import firebase from '../src/etc/firebaseConfig';
import {fbToArray} from '../src/modules/firebase/firebaseUtils';


const DB = firebase.database();
const MODULE_NAME = 'snippets';
const TEST_USER = 'testuser@fbtest.com';
const TEST_PASS = 'testpassword';
const UID = 'WmK0yFR5z2X7KhUxXvDZNPWErBG3';
const REF = DB.ref(`${MODULE_NAME}/${UID}`);

let dbRef = null;

/**
 * Checks if we successfully have authenticated and have a valid
 * Firebase.database() ref. It not, none of the tests can proceed,
 * and as such, we are throwing a VERY obvious error message here,
 * since the tests themselves will not understand the conditions.
 */
const checkDbRef = () => {
  if (!dbRef) {
    console.log('\n');
    console.log('==================================================');
    console.log('=  Authentication failed. Tests cannot proceed.  =');
    console.log('==================================================');
    console.log('\n');
    expect(dbRef).to.not.be.null;
    return false;
  }
  return true;
}

describe('API Test Setup', () => {
  it('should login with test credentials', () => {
    return new Promise((resolve, reject) => firebase.auth()
      .signInWithEmailAndPassword(TEST_USER, TEST_PASS)
      .then((user) => {
        dbRef = DB.ref(`${MODULE_NAME}/${UID}`);
        resolve(user);
      })
      .catch((error) => {
        console.log('\nAuthentication Error:');
        console.log(`${error.message}\n`);
        reject(error);
      })
    );
  });
});

describe('Retrieve test', () => {
  it('should retrieve values and convert them to an array', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      dbRef.once('value', (snapshot) => {
        // check the response object
        const snippets = snapshot.val();
        expect(snippets).to.be.an('object');

        // user conversion util to convert FB object to array
        const snippsetArray = fbToArray(snippets);
        expect(snippsetArray).to.be.an('array');
        expect(snippsetArray.length).to.be.above(0);
        resolve();
      });
    });
  });
});
