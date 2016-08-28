import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import firebaseConfig from '../../../../src/etc/firebaseConfig';
import SnippetListDetail from '../../../../src/modules/snippets/components/SnippetListDetail';


const DEFAULT_TITLE = 'Untitled Snippet';

let mockDate = new Date();
let timestamp = mockDate.getTime();
let snippet = {
  title: 'THE GOOGLE',
  url: 'https://google.com',
  archived: false,
  starred: false,
  color: 'blue',
  created: timestamp,
  modified: timestamp
};


describe('<SnippetListDetail />', () => {
  const props = {
    snippet,
    gotoDetailPage: sinon.spy(),
    onStarClick: sinon.spy(),
    onArchiveClick: sinon.spy(),
    onColorClick: sinon.spy()
  };

  it('should correctly display a Snippet with correct color values', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const titleParentNode = wrapper.find('.snippet-title');
    const titleUrlNode = wrapper.find('.snippet-title-url');
    const urlNode = wrapper.find('.snippet-url');

    expect(titleParentNode).to.have.length(1); // exactly one title element
    expect(titleUrlNode.get(0).props.children).to.contain(snippet.title); // correct title value
    expect(urlNode).to.have.length(1); // exactly one url element
    expect(urlNode.get(0).props.children).to.contain(snippet.url); // correct url value
    expect(wrapper.find('.snippet-controls')).to.have.length(1); // exactly one 'controls' element
  });

  it('should correctly display a Snippet with default values when left unspecified', () => {
    snippet.color = '';
    snippet.title = '';
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const titleUrlNode = wrapper.find('.snippet-title-url');

    expect(titleUrlNode.get(0).props.children).to.contain(DEFAULT_TITLE); // default title when no value is passed in
    expect(wrapper.is('.snippet-color-white')).to.equal(true); // default color when no value is passed in
  });

  it('should correctly display a Snippet with correct color classes', () => {
    snippet.color = 'red';
    const wrapper = shallow(<SnippetListDetail {...props} />);

    expect(wrapper.is('.snippet-color-red')).to.equal(true); // correct color when it has been changed
  });

  it('should display a Snippet with white color when an invalid value is passed', () => {
    snippet.color = 'wqoeiufh';
    const wrapper = shallow(<SnippetListDetail {...props} />);

    expect(wrapper.is('.snippet-color-white')).to.equal(true); // default color with invalid color value
  });

  it('should show non-starred icon when Snippet is not starred and should process clicks', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const starNode = wrapper.find('.fa-star-o');

    expect(starNode).to.have.length(1);
    starNode.simulate('click');
    expect(props.onStarClick).to.have.property('callCount', 1);
  });

  it('should show starred icon when Snippet is starred and should process clicks', () => {
    snippet.starred = true;
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const starNode = wrapper.find('.fa-star');

    expect(starNode).to.have.length(1);
    starNode.simulate('click');
    expect(props.onStarClick).to.have.property('callCount', 2);
  });

  it('should have a SnippetColorPicker', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const colorNode = wrapper.find('SnippetColorPicker');

    expect(colorNode).to.have.length(1);
  });

  it('should have a SnippetArchiveButton', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const archiveNode = wrapper.find('SnippetArchiveButton');

    expect(archiveNode).to.have.length(1);
  });
});
