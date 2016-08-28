import React, {PropTypes} from 'react';

import snippetData from '../snippetData';
import SnippetArchiveButton from './SnippetArchiveButton';
import SnippetColorPicker from './SnippetColorPicker';


const SnippetListDetail = ({snippet, onStarClick, onArchiveClick, gotoDetailPage}) => {
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
      'fa fa-star pointer snippet-control snippet-control-star' :
      'fa fa-star-o pointer snippet-control snippet-control-star';
  }

  function onColorSelect(event, color) {
    this.props.onColorClick(event, snippet, color);
  }

  return (
    <div className={getMainClass()}>
      <div className="panel-body">
        {/* Snippet title */}
        <h4 className="snippet-title">
          <a
            href={snippet.url}
            className="snippet-title-url"
            target="_blank"
            rel="noopener noreferrer">
            {snippet.title || 'Untitled Snippet'}
          </a>
        </h4>

        {/* Snippet URL */}
        <a
          href={snippet.url}
          className="text-muted snippet-url"
          target="_blank"
          rel="noopener noreferrer">
          {snippet.url}
        </a>
      </div>

      <div className="panel-footer snippet-controls">
        {/* star/unstar button */}
        <span
          className={getStarClass()}
          aria-hidden="true"
          onClick={onStarClick}>
        </span>

        {/* color picker */}
        <SnippetColorPicker onColorSelect={onColorSelect} />

        {/* archive/unarchive button */}
        <SnippetArchiveButton
          snippet={snippet}
          onArchiveClick={onArchiveClick}
        />

        {/* goto detail view button */}
        <span
          className="fa fa-ellipsis-v fa-pull-right pointer snippet-control"
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
  onArchiveClick: PropTypes.func.isRequired,
  onColorClick: PropTypes.func.isRequired,
};

export default SnippetListDetail;
