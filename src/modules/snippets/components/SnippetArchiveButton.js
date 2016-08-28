import React, {Component, PropTypes} from 'react';


class SnippetArchiveButton extends Component {
  getIconClass() {
    let iconClass = this.props.snippet.archived ?
      'fa fa-refresh' : 'fa fa-archive';
    return `${iconClass} pointer snippet-control snippet-control-archive`;
  }

  render() {
    return (
      <span
        type="button"
        className={this.getIconClass()}
        onClick={this.props.onArchiveClick}
        aria-hidden="true">
      </span>
    );
  }
}

SnippetArchiveButton.propTypes = {
  snippet: PropTypes.object.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
};

export default SnippetArchiveButton;
