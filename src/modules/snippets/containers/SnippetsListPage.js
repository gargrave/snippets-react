import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import actions from '../snippetsActions';
import goto from '../../../utils/goto';
import SnippetListDetail from '../components/SnippetListDetail';


class SnippetsListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const pageVars = this.getPageVarsFromProps(props);
    this.state = {
      fullListView: pageVars.fullListView,
      pageHeader: pageVars.pageHeader
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
      pageHeader = 'Starred Snippets (not implemented yet)';
    } else if (filterBy === 'archived') {
      fullListView = false;
      pageHeader = 'Archived Snippets';
    }

    return { fullListView, pageHeader };
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div>
        <h2>
          {this.state.pageHeader}
        </h2>
        <hr/>

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
            gotoDetailPage={() => this.gotoDetailPage(snippet.id) }
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
      snippets = state.snippets.filter(s => !s.archived);
      break;
    default:
      snippets = state.snippets.filter(s => !s.archived);
  }

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
