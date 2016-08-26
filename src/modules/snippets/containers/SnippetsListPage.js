import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import actions from '../snippetsActions';
import goto from '../../../utils/goto';
import snippetData from '../snippetData';
import SnippetListDetail from '../components/SnippetListDetail';


export class SnippetsListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const pageVars = this.getPageVarsFromProps(props);
    this.state = {
      snippet: null,
      fullListView: pageVars.fullListView,
      pageHeader: pageVars.pageHeader,
      working: false,
      apiError: '',
    };
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.gotoLoginPage();
    }
  }

  componentWillReceiveProps(nextProps) {
    const pageVars = this.getPageVarsFromProps(nextProps);
    this.setState({
      fullListView: pageVars.fullListView,
      pageHeader: pageVars.pageHeader
    });
  }

  /*=============================================
   = routing methods
   =============================================*/
  gotoLoginPage() {
    goto.route('account/login');
  }

  gotoCreatePage() {
    goto.route('/snippets/new');
  }

  gotoDetailPage(snippetId) {
    goto.route(`/snippets/${snippetId}`);
  }

  /*=============================================
   = helper methods
   =============================================*/
  getPageVarsFromProps(props) {
    let fullListView = true;
    let pageHeader = 'My Snippets';
    let filterBy = props.filterBy;

    if (filterBy === 'starred') {
      fullListView = false;
      pageHeader = 'Starred Snippets';
    } else if (filterBy === 'archived') {
      fullListView = false;
      pageHeader = 'Archived Snippets';
    }

    return { fullListView, pageHeader };
  }

  submitUpdate(snippet, successToast = true) {
    if (this.props.loggedIn && !this.state.working && snippet) {
      this.setState({ working: true });
      this.props.actions.update(snippet)
        .then(res => {
          this.setState({ working: false });
          if (successToast) {
            toastr.success('Snippet updated', 'Success');
          }
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error updating snippet', 'Error');
        });
    }
  }

  /*=============================================
   = action handlers
   =============================================*/
  onStarClick(event, _snippet) {
    event.preventDefault();

    let snippet = Object.assign({}, _snippet);
    snippet.starred = !snippet.starred;
    this.submitUpdate(snippet, false);
  }

  onColorClick(event, _snippet, color) {
    event.preventDefault();

    let colorValue = color.trim().toLocaleLowerCase() || 'white';
    if (snippetData.isValidColor(colorValue) && _snippet.color !== colorValue) {
      let snippet = Object.assign({}, _snippet);
      snippet.color = colorValue;
      this.submitUpdate(snippet, false);
    }
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    let {apiError} = this.state;
    return (
      <div>
        <h2>
          {this.state.pageHeader}
        </h2>
        <hr/>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        {/* 'add snippet' button, when logged in and on main list view */}
        {this.props.loggedIn && this.state.fullListView &&
          <p>
            <span
              className="btn btn-success"
              onClick={() => this.gotoCreatePage()}>
              Add a New Snippet
            </span>
          </p>
        }

        {this.props.snippets.map(snippet =>
          <SnippetListDetail
            key={snippet.id}
            snippet={snippet}
            gotoDetailPage={() => this.gotoDetailPage(snippet.id)}
            onStarClick={(e) => this.onStarClick(e, snippet)}
            onColorClick={this.onColorClick.bind(this)}
          />
        )}
      </div>
    );
  }
}

SnippetsListPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  snippets: PropTypes.array.isRequired,
  filterBy: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  let filterBy = ownProps.params.filterBy;
  let snippets;


  switch (filterBy) {
    case 'archived':
      snippets = state.snippets.filter(s => s.archived);
      break;
    case 'starred':
      snippets = state.snippets.filter(s => s.starred);
      break;
    default:
      snippets = state.snippets.filter(s => !s.archived);
  }
  snippets.sort((a, b) => a.modified < b.modified ? 1 : -1 );

  return {
    loggedIn: !!state.user.email,
    snippets,
    filterBy
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsListPage);
