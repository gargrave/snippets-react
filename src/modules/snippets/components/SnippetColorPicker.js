import React, {Component, PropTypes} from 'react';

import {validColors} from '../snippetData';


class SnippetColorPicker extends Component {
  getClassByColor(color) {
    return `color-picker-item snippet-color-${color}`;
  }

  render() {
    return (
      <span className="dropdown">
        <span
          className="glyphicon glyphicon-tint dropdown-toggle pointer snippet-control snippet-control-color"
          type="button"
          data-toggle="dropdown"
          aria-hidden="true">
        </span>
        <ul className="dropdown-menu color-picker-list">
          {validColors.map((color) =>
            <li
              key={color}
              className={this.getClassByColor(color)}>
              <a onClick={(e) => this.props.onColorSelect(e, color)}>
              </a>
            </li>
          )}
        </ul>
      </span>
    );
  }
}

SnippetColorPicker.propTypes = {
  onColorSelect: PropTypes.func.isRequired,
};

export default SnippetColorPicker;
