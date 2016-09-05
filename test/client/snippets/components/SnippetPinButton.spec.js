import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import firebaseConfig from '../../../../src/etc/firebaseConfig';
import {validColors} from '../../../../src/modules/snippets/snippetData';
import SnippetPinButton from '../../../../src/modules/snippets/components/SnippetPinButton';


describe('<SnippetPinButton />', () => {
  const props = {
    snippet: {
      pinned: false
    },
    onPinClick: sinon.spy(),
  };

  it('should have one element with the correct class', () => {
    const wrapper = shallow(<SnippetPinButton {...props} />);
    const desiredNode = wrapper.find('.snippet-control-pin');

    expect(desiredNode).to.have.length(1);
  });

  it('should display the "bookmark" button when snippet is not pinned', () => {
    const wrapper = shallow(<SnippetPinButton {...props} />);
    const desiredNode = wrapper.find('.fa-bookmark-o');
    const undesiredNode = wrapper.find('.fa-bookmark');

    expect(desiredNode).to.have.length(1);
    expect(undesiredNode).to.have.length(0);
  });

  it('should display the "open bookmark" button when snippet is pinned', () => {
    props.snippet.pinned = true;
    const wrapper = shallow(<SnippetPinButton {...props} />);
    const desiredNode = wrapper.find('.fa-bookmark');
    const undesiredNode = wrapper.find('.fa-bookmark-o');

    expect(desiredNode).to.have.length(1);
    expect(undesiredNode).to.have.length(0);
  });

  it('should call the click handler', () => {
    const wrapper = shallow(<SnippetPinButton {...props} />);

    wrapper.simulate('click');
    expect(props.onPinClick).to.have.property('callCount', 1);
  });
});
