import React from 'react';
import {expect} from 'chai';
import firebase from '../src/etc/firebaseConfig';


// testuser@fbtest.com
// testpassword
// WmK0yFR5z2X7KhUxXvDZNPWErBG3
describe('API Test Setup', () => {
  it('should fail, because no tests are implement yet', () => {
    // const actions = {
    //   saveFuelSavings: () => { },
    //   calculateFuelSavings: () => { }
    // };
    // const fuelSavings = {};
    // const wrapper = shallow(<FuelSavingsPage actions={actions} fuelSavings={fuelSavings}/>);

    // expect(wrapper.find(FuelSavingsForm)).to.be.length(1);
    return firebase.auth()
      .signInWithEmailAndPassword('testuser@fbtest.com', 'testpassword')
      .then((user) => {
        console.log('user:');
        console.log(user);
        expect(false).to.be.true;
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('error:');
        console.log(error);
        expect(true).to.be.false;
      });
  });
});
