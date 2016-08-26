import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import firebaseConfig from '../../../../src/etc/firebaseConfig';
import SnippetColorPicker from '../../../../src/modules/snippets/components/SnippetColorPicker';


describe('<SnippetColorPicker />', () => {
  const props = {
    onColorSelect: sinon.spy(),
  };

  it('does not have any tests defined yet', () => {
    const wrapper = shallow(<SnippetColorPicker {...props} />);
  });
});
