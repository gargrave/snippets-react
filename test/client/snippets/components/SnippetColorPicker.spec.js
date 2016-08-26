import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import firebaseConfig from '../../../../src/etc/firebaseConfig';
import {validColors} from '../../../../src/modules/snippets/snippetData';
import SnippetColorPicker from '../../../../src/modules/snippets/components/SnippetColorPicker';


describe('<SnippetColorPicker />', () => {
  const props = {
    onColorSelect: sinon.spy(),
  };

  it('should have one color list element', () => {
    const wrapper = shallow(<SnippetColorPicker {...props} />);
    const colorNodes = wrapper.find('.color-picker-list');

    expect(colorNodes).to.have.length(1);
  });

  it('should have an option for each color', () => {
    const wrapper = shallow(<SnippetColorPicker {...props} />);
    const colorNodes = wrapper.find('.color-picker-item');

    expect(colorNodes).to.have.length(validColors.length);
  });

  it('should call the click handler with the correct color', () => {
    const testColor = 'blue';
    const wrapper = shallow(<SnippetColorPicker {...props} />);
    const testColorClickNode = wrapper.find(`.color-picker-click-${testColor}`);

    expect(testColorClickNode).to.have.length(1);
    testColorClickNode.simulate('click');
    expect(props.onColorSelect).to.have.property('callCount', 1);
    expect(props.onColorSelect.firstCall.args).to.contain(testColor);
  });
});
