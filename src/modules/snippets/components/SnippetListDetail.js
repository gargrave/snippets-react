import React, {PropTypes} from 'react';


const SnippetListDetail = ({snippet, gotoDetailPage, onStarClick}) => {

  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <h4>{snippet.title || 'Untitled Snippet'}</h4>
        <a href={snippet.url} className="text-muted" target="_blank">{snippet.url}</a>
      </div>

      <div className="panel-footer">
        {/* star/unstar button */}
        {snippet.starred &&
          <span onClick={onStarClick}>&nbsp;
            <span className="glyphicon glyphicon-star pointer" aria-hidden="true"></span>
          </span>
        }

        {/* star/unstar button */}
        {!snippet.starred &&
          <span onClick={onStarClick}>&nbsp;
            <span className="glyphicon glyphicon-star-empty pointer" aria-hidden="true"></span>
          </span>
        }

        {/* goto detail view button */}
        <span
          className="glyphicon glyphicon-cog pull-right pointer"
          aria-hidden="true"
          onClick={gotoDetailPage}>
        </span>
      </div>

    </div>
  );
};

SnippetListDetail.propTypes = {
  snippet: PropTypes.object.isRequired,
  gotoDetailPage: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
};

export default SnippetListDetail;
