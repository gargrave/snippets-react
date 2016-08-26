import React, {Component, PropTypes} from 'react';

class NewSnippetPanel extends Component {
  render() {
    return (
      <div
        className="panel panel-default snippet-panel new-snippet-panel snippet-color-white"
        onClick={this.props.onPanelClick}>
        <div className="panel-body">
          <h4 className="text-muted">Add a New Snippet...</h4>
        </div>
      </div>
    );
  }
}

NewSnippetPanel.propTypes = {
  onPanelClick: PropTypes.func.isRequired,
};

export default NewSnippetPanel;
