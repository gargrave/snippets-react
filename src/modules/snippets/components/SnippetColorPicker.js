import React, {Component, PropTypes} from 'react';

import {validColors} from '../snippetData';


class SnippetColorPicker extends Component {
  render() {
    return (
      <span className="dropdown">
        <span
          className="snippet-control-color glyphicon glyphicon-tint pointer"
          type="button" data-toggle="dropdown"
          aria-hidden="true">
        </span>
        <div className="dropdown-menu list-group">
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'white')}>White</a>
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'red')}>Red</a>
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'green')}>Green</a>
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'blue')}>Blue</a>
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'yellow')}>Yellow</a>
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'orange')}>Orange</a>
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'teal')}>Teal</a>
          <a className="list-group-item pointer" onClick={(e) => this.props.onColorSelect(e, 'gray')}>Gray</a>
        </div>
      </span>
    );
  }
}

SnippetColorPicker.propTypes = {
  onColorSelect: PropTypes.func.isRequired,
};

export default SnippetColorPicker;
