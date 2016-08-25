import React, {PropTypes} from 'react';

import snippetData from '../snippetData';
import SnippetColorPicker from './SnippetColorPicker';


const SnippetListDetail = ({snippet, gotoDetailPage, onStarClick, onColorClick}) => {
  /**
   * Builds and returns the style string for the top-level element, including the color
   * of the Snippet panel, based on teh Snippet's 'color' property
   *
   * @returns The style string for the top-level element
   */
  function getMainClass() {
    const colorClass = snippetData.isValidColor(snippet.color) ?
      `snippet-color-${snippet.color}` :
      'snippet-color-white';
    return `panel panel-default snippet-panel ${colorClass}`;
  }

  /**
   * Returns the full class for the star/unstar button, based on the 'starred'
   * state of the supplied Snippet.
   *
   * @returns The full class for the star/unstar button
   */
  function getStarClass() {
    return snippet.starred ?
      'snippet-control-star glyphicon glyphicon-star pointer' :
      'snippet-control-star glyphicon glyphicon-star-empty pointer';
  }

  function onColorSelect(event, color) {
    onColorClick(event, snippet, color);
  }

  return (
    <div className={getMainClass()}>
      <div className="panel-body">
        <h4 className="snippet-title">{snippet.title || 'Untitled Snippet'}</h4>
        <a href={snippet.url} className="text-muted snippet-url" target="_blank">{snippet.url}</a>
      </div>

      <div className="panel-footer snippet-controls">
        {/* star/unstar button */}
        <span
          className={getStarClass()}
          aria-hidden="true"
          onClick={onStarClick}>
        </span>&nbsp;

        {/* color picker */}
        <SnippetColorPicker onColorSelect={onColorSelect} />

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
  onColorClick: PropTypes.func.isRequired,
};

export default SnippetListDetail;
