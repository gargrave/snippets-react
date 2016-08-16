import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from '../snippetsActions';
import goto from '../../../utils/goto';
import SnippetDetail from '../components/SnippetDetail';


class SnippetsListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  testApi() {
    this.props.actions.fetch();
  }

  gotoCreatePage() {
    goto.route('/snippets/new');
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div>
        <h2>
          My Snippets
        </h2>
        <hr/>

        <p>
          <span
            className="btn btn-primary"
            onClick={() => this.testApi()}>
            Load Snippets
          </span>&nbsp;
          <span
            className="btn btn-success"
            onClick={() => this.gotoCreatePage()}>
            Add a New Snippet
          </span>
        </p>

        {this.props.snippets.map(snippet =>
          <SnippetDetail
            key={snippet.id}
            snippet={snippet}
          />
        )}
      </div>
    );
  }
}

SnippetsListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  snippets: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    snippets: state.snippets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsListPage);
