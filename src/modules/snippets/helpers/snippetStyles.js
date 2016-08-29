import snippetData from '../snippetData';


export default {
  /**
   * Builds and returns the style string for the top-level element, including the color
   * of the Snippet panel, based on teh Snippet's 'color' property
   *
   * @param {object} snippet - The Snippet instance for the panel
   * @returns The style string for the top-level element
   */
  snippetPanel: function(snippet) {
    const colorClass = snippetData.isValidColor(snippet.color) ?
      `snippet-color-${snippet.color}` :
      'snippet-color-white';
    return `panel panel-default snippet-panel ${colorClass}`;
  },

  snippetCreatePanel: function() {
    return 'panel panel-default snippet-panel snippet-color-white new-snippet-form-panel';
  }
};
