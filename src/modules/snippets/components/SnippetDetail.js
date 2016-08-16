import React, {PropTypes} from 'react';


const SnippetDetail = ({snippet}) => {

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4 className="panel-title">{snippet.title}</h4>
      </div>
      <div className="panel-body">
        <a href={snippet.url} className="text-muted" target="_blank">{snippet.url}</a>
      </div>
    </div>
  );
};

SnippetDetail.propTypes = {
  snippet: PropTypes.object.isRequired,
};

export default SnippetDetail;
