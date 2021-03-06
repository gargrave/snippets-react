import React, {PropTypes} from 'react';

import snippetStyles from '../helpers/snippetStyles';
import SnippetArchiveButton from './SnippetArchiveButton';
import SnippetPinButton from './SnippetPinButton';
import SnippetColorPicker from './SnippetColorPicker';


const SnippetListDetail = ({
  snippet, collapsedView, onPinClick, onStarClick,
  onArchiveClick, onColorClick, gotoDetailPage,
  hidePinButton
}) => {
  /**
   * Returns the full class for the star/unstar button, based on the 'starred'
   * state of the supplied Snippet.
   *
   * @returns {string} The full class for the star/unstar button
   */
  function getStarClass() {
    return snippet.starred ?
      'fa fa-star pointer snippet-control snippet-control-star' :
      'fa fa-star-o pointer snippet-control snippet-control-star';
  }

  function onColorSelect(event, color) {
    onColorClick(event, snippet, color);
  }

  return (
    <div className={snippetStyles.snippetPanel(snippet)}>
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
        {!collapsedView &&
        <a
          href={snippet.url}
          className="text-muted snippet-url"
          target="_blank"
          rel="noopener noreferrer">
          {snippet.url}
        </a>
        }
      </div>

      <div className="panel-footer snippet-controls">
        {/* pin/unpin button */}
        {(!snippet.archived && !hidePinButton) &&
        <SnippetPinButton
          snippet={snippet}
          onPinClick={onPinClick}
        />
        }

        {/* star/unstar button */}
        <span
          className={getStarClass()}
          aria-hidden="true"
          onClick={onStarClick}>
        </span>

        {/* color picker */}
        <SnippetColorPicker onColorSelect={onColorSelect}/>

        {/* archive/unarchive button */}
        <SnippetArchiveButton
          snippet={snippet}
          onArchiveClick={onArchiveClick}
        />

        {/* goto detail view button */}
        <span
          className="fa fa-cog fa-pull-right pointer snippet-control"
          aria-hidden="true"
          onClick={gotoDetailPage}>
        </span>
      </div>

    </div>
  );
};

SnippetListDetail.propTypes = {
  snippet: PropTypes.object.isRequired,
  collapsedView: PropTypes.bool.isRequired,
  gotoDetailPage: PropTypes.func.isRequired,
  onPinClick: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onColorClick: PropTypes.func.isRequired,
  hidePinButton: PropTypes.bool,
};

export default SnippetListDetail;
