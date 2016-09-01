import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import firebaseConfig from '../../../../src/etc/firebaseConfig';
import {validColors} from '../../../../src/modules/snippets/snippetData';
import SnippetArchiveButton from '../../../../src/modules/snippets/components/SnippetArchiveButton';


describe('<SnippetArchiveButton />', () => {
  const props = {
    snippet: {
      archived: false
    },
    onArchiveClick: sinon.spy(),
  };

  it('should have one element with the correct class', () => {
    const wrapper = shallow(<SnippetArchiveButton {...props} />);
    const desiredNode = wrapper.find('.snippet-control-archive');

    expect(desiredNode).to.have.length(1);
  });

  it('should display the "archived" button when snippet is not archived', () => {
    const wrapper = shallow(<SnippetArchiveButton {...props} />);
    const desiredNode = wrapper.find('.fa-archive');
    const undesiredNode = wrapper.find('.fa-refresh');

    expect(desiredNode).to.have.length(1);
    expect(undesiredNode).to.have.length(0);
  });

  it('should display the "refresh" button when snippet is archived', () => {
    props.snippet.archived = true;
    const wrapper = shallow(<SnippetArchiveButton {...props} />);
    const desiredNode = wrapper.find('.fa-archive');
    const undesiredNode = wrapper.find('.fa-refresh');

    expect(desiredNode).to.have.length(0);
    expect(undesiredNode).to.have.length(1);
  });

  it('should call the click handler', () => {
    const wrapper = shallow(<SnippetArchiveButton {...props} />);

    wrapper.simulate('click');
    expect(props.onArchiveClick).to.have.property('callCount', 1);
  });
});
