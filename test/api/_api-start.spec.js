import {expect} from 'chai';
import {chalkWarning} from '../../tools/chalkConfig';


describe('Async test start message', () => {
  it('should display a simple message', () => {
    console.log(chalkWarning('================================================'));
    console.log(chalkWarning('=  Starting async tests. Please be patient...  ='));
    console.log(chalkWarning('================================================'));
    console.log(chalkWarning('\n'));
    expect(true).to.be.true;
  });
});
