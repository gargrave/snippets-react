import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import actions from '../snippetsActions';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import snippetData from '../snippetData';
import SnippetCard from '../components/SnippetCard';
import ActionCancelBtnGroup from '../../common/components/ActionCancelBtnGroup';


class SnippetDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      snippet: Object.assign({}, props.snippet),
      working: false,
      apiError: ''
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.gotoEditPage = this.gotoEditPage.bind(this);
  }

  componentWillMount() {
    // if we have an invalid snippet id, redirect back to list page
    if (!this.props.snippet.id) {
      this.gotoListPage();
    }
  }

  /*=============================================
   = routing
   =============================================*/
  gotoListPage() {
    goto.route('/snippets');
  }

  gotoEditPage() {
    let id = this.state.snippet.id;
    goto.route(`/snippets/${id}/edit`);
  }

  /*=============================================
   = event handlers
   =============================================*/
  onDeleteClick(event) {
    event.preventDefault();

    if (!this.state.working && confirm('Delete this snippet?')) {
      this.setState({ working: true });
      this.props.actions.remove(this.props.snippet)
        .then(() => {
          this.setState({ working: false });
          toastr.success('Snippet deleted', 'Success');
          this.gotoListPage();
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error deleting snippet', 'Error');
        });
    }
  }

  render() {
    const {snippet, working, apiError} = this.state;
    return (
      <div>
        <h3>{snippet.name}</h3>
        <hr/>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <SnippetCard
          snippet={snippet}
        />

        {/* edit/back buttons */}
        <ActionCancelBtnGroup
          working={working}
          onActionClick={() => this.gotoEditPage()}
          onCancelClick={() => this.gotoListPage()}
          actionText="Edit"
          cancelText="Back"
        />
        <hr/>

        <p>
          <a href="" onClick={this.onDeleteClick}>Delete this snippet</a>
        </p>
      </div>
    );
  }
}

SnippetDetailPage.propTypes = {
  actions: PropTypes.object.isRequired,
  snippet: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let snippetId = ownProps.params.id;
  let snippet = apiHelper.findRecordById(state.snippets, snippetId);
  if (!snippet) {
    snippet = snippetData.getNewRecord();
  }

  return {
    snippet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetDetailPage);
