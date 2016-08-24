import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

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
    gotoDetailPage: () => null,
    onStarClick: () => null
  };

  it('should correctly display a Snippet with correct color values', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const titleNode = wrapper.find('.snippet-title');
    const urlNode = wrapper.find('.snippet-url');

    expect(wrapper.is('.snippet-color-blue')).to.equal(true); // blue color property
    expect(titleNode).to.have.length(1); // exactly one title element
    expect(titleNode.get(0).props.children).to.contain(snippet.title); // correct title value
    expect(urlNode).to.have.length(1); // exactly one url element
    expect(urlNode.get(0).props.children).to.contain(snippet.url); // correct url value
    expect(wrapper.find('.snippet-controls')).to.have.length(1); // exactly one 'controls' element
  });

  it('should correctly display a Snippet with default values when left unspecified', () => {
    snippet.color = '';
    snippet.title = '';
    const wrapper = shallow(<SnippetListDetail {...props} />);
    const titleNode = wrapper.find('.snippet-title');

    expect(titleNode.get(0).props.children).to.contain(DEFAULT_TITLE); // default title when no value is passed in
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

  it('starred icon should show when Snippet is starred', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    expect('TEST NOT IMPLEMENTED').to.equal('');
  });

  it('non-starred icon should show when Snippet is not starred', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    expect('TEST NOT IMPLEMENTED').to.equal('');
  });

  it('should call gotoDetailPage correct', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    expect('TEST NOT IMPLEMENTED').to.equal('');
  });

  it('should call onStarClick correct', () => {
    const wrapper = shallow(<SnippetListDetail {...props} />);
    expect('TEST NOT IMPLEMENTED').to.equal('');
  });
});