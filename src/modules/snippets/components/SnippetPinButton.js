import React, {Component, PropTypes} from 'react';


class SnippetPinButton extends Component {
  getIconClass() {
    let iconClass = this.props.snippet.pinned ?
      'fa fa-bookmark' : 'fa fa-bookmark-o';
    return `${iconClass} pointer snippet-control snippet-control-pin`;
  }

  render() {
    return (
      <span
        type="button"
        className={this.getIconClass()}
        onClick={this.props.onPinClick}
        aria-hidden="true">
      </span>
    );
  }
}

SnippetPinButton.propTypes = {
  snippet: PropTypes.object.isRequired,
  onPinClick: PropTypes.func.isRequired,
};

export default SnippetPinButton;
