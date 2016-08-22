import React, {PropTypes} from 'react';


const SnippetListDetail = ({snippet, gotoDetailPage}) => {

  return (
    <div className="panel panel-default">

      <div className="panel-heading">
        <h4 className="panel-title">
          {snippet.title || 'Untitled Snippet'}
          <span
            className="glyphicon glyphicon-cog pull-right pointer"
            aria-hidden="true"
            onClick={gotoDetailPage}>
          </span>
        </h4>
      </div>

      <div className="panel-body">
        <a href={snippet.url} className="text-muted" target="_blank">{snippet.url}</a>
      </div>

    </div>
  );
};

SnippetListDetail.propTypes = {
  snippet: PropTypes.object.isRequired,
  gotoDetailPage: PropTypes.func.isRequired,
};

export default SnippetListDetail;
