import React, {PropTypes} from 'react';


const SnippetListDetail = ({snippet, gotoDetailPage, onStarClick}) => {
  let panelColorStyle = '';
  switch (snippet.color) {
    case 'white':
      panelColorStyle = 'snippet-color-white';
      break;
    case 'red':
      panelColorStyle = 'snippet-color-red';
      break;
    case 'green':
      panelColorStyle = 'snippet-color-green';
      break;
    case 'blue':
      panelColorStyle = 'snippet-color-blue';
      break;
    case 'yellow':
      panelColorStyle = 'snippet-color-yellow';
      break;
    case 'orange':
      panelColorStyle = 'snippet-color-orange';
      break;
    case 'teal':
      panelColorStyle = 'snippet-color-teal';
      break;
    case 'gray':
      panelColorStyle = 'snippet-color-gray';
      break;
    default:
      panelColorStyle = 'snippet-color-white';
      break;
  }
  let panelFullStyle = `panel panel-default ${panelColorStyle}`;

  return (
    <div className={panelFullStyle}>
      <div className="panel-body">
        <h4 className="snippet-title">{snippet.title || 'Untitled Snippet'}</h4>
        <a href={snippet.url} className="text-muted snippet-url" target="_blank">{snippet.url}</a>
      </div>

      <div className="panel-footer snippet-controls">
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
