import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import firebaseConfig from '../../../../src/etc/firebaseConfig';
import NewSnippetPanel from '../../../../src/modules/snippets/components/NewSnippetPanel';


describe('<NewSnippetPanel />', () => {
  const props = {
    onPanelClick: sinon.spy(),
  };

  it('should have one main element with the appropriate class', () => {
    const wrapper = shallow(<NewSnippetPanel {...props} />);
    const mainNode = wrapper.find('.new-snippet-link-panel');

    expect(mainNode).to.have.length(1);
  });

  it('should call the click handler', () => {
    const wrapper = shallow(<NewSnippetPanel {...props} />);

    wrapper.simulate('click');
    expect(props.onPanelClick).to.have.property('callCount', 1);
  });
});
