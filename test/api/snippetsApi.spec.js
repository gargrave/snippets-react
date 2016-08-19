/* eslint-disable no-console*/
import {expect} from 'chai';
import request from 'superagent';

import firebase from '../../src/etc/firebaseConfig';
import {fbToArray} from '../../src/modules/firebase/firebaseUtils';


const DB = firebase.database();
const MODULE_NAME = 'snippets';
const TEST_USER = 'testuser@fbtest.com';
const TEST_PASS = 'testpassword';
const UID = 'WmK0yFR5z2X7KhUxXvDZNPWErBG3';
const REF = DB.ref(`${MODULE_NAME}/${UID}`);
const NOW = new Date();
const TIMESTAMP = NOW.getTime();

let dbRef = null;

/**
 * Checks if we successfully have authenticated and have a valid
 * Firebase.database() ref. It not, none of the tests can proceed,
 * and as such, we are throwing a VERY obvious error message here,
 * since the tests themselves will not understand the conditions.
 */
function checkDbRef() {
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

function logFirebaseWarning() {
  console.log('\n\nTesting Firebase submission with bad data.');
  console.log('An error message is expected: ');
}

function getValidSnippet() {
  return {
    title: 'Great New Snippet',
    url: 'https://duckduckgo.com',
    archived: false,
    created: TIMESTAMP,
    modified: TIMESTAMP
  };
}

describe('Auth API', () => {
  // no read without auth test
  it('should not be able read or write when not logged in', () => {
    return new Promise((resolve, reject) => {
      DB.ref(`${MODULE_NAME}/${UID}`).once('value', (snapshot) => {
        expect(true).to.be.false;
        reject();
      })
        .catch((err) => {
          resolve();
        });
    });
  });
});

describe('Auth API', () => {
  // login tests
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

describe('Snippets API', () => {
  // proper write test
  it('should accept a valid Snippet', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();

      // submit with good data
      testRecordRef.set(testRecordData, err => {
        console.log('\nTesting writing valid Snippet data...\n');
        expect(err).to.be.null;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });

  // 'url' tests
  it('should reject data with no "url" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with no URL
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      delete testRecordData.url;
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  it('should reject data with a blank "url" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with no URL
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      testRecordData.url = '';
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  it('should reject data with a malformed "url" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with malformed URL
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      testRecordData.url = 'thisIsNotAValidURL';
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  // 'title' tests
  it('should accept an empty "title" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with too-short title
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      testRecordData.title = '';
      testRecordRef.update(testRecordData, err => {
        expect(err).to.be.null;
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  });

  it('should reject data with no "title" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with too-short title
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      delete testRecordData.title;
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  it('should reject data with an insufficient "title" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with too-short title
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      testRecordData.title = 'a';
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  // 'archived' tests
  it('should reject data with no "archived" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with no 'archived' field
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      delete testRecordData.archived;
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  it('should reject data with an invalid "archived" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with malformed 'archived' field
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      testRecordData.archived = 123;
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  // 'created' tests
  it('should reject data with no "created" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with no 'created' field
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      delete testRecordData.created;
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  it('should reject data with an invalid "created" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with malformed 'created' field
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      testRecordData.created = 'invalid';
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  // 'modified' tests
  it('should reject data with no "modified" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with no 'modified' field
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      delete testRecordData.modified;
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  it('should reject data with an invalid "modified" field', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      // submit with malformed 'modified' field
      logFirebaseWarning();
      let testRecordRef = dbRef.push();
      let testRecordData = getValidSnippet();
      testRecordData.modified = 'invalid';
      testRecordRef.update(testRecordData, err => {
        expect(err).to.not.be.null;
        if (err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  // retrieval tests
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

  // deletion tests
  it('should remove the test data without throwing any errors', () => {
    return new Promise((resolve, reject) => {
      if (!checkDbRef()) {
        reject();
      }

      dbRef.set(null, err => {
        console.log('\nCleaning up test data...\n');
        expect(err).to.be.null;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
});
