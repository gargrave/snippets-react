import React, {Component, PropTypes} from 'react';

class SnippetCard extends Component {
  render() {
    const {snippet} = this.props;
    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <h4 className="panel-title">
            {snippet.title}
          </h4>
        </div>

        <div className="panel-body">
          <a
            href={snippet.url}
            className="text-muted"
            target="_blank"
            rel="noopener noreferrer">
            {snippet.url}
          </a>
        </div>

      </div>
    );
  }
}

SnippetCard.propTypes = {
  snippet: PropTypes.object.isRequired,
};

export default SnippetCard;
