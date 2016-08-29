import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isEqual} from 'lodash';
import toastr from 'toastr';

import actions from '../snippetsActions';
import validate from '../../../utils/validate';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import snippetStyles from '../helpers/snippetStyles';
import SnippetForm from '../components/SnippetForm';


class SnippetDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    let snippet = Object.assign({}, props.snippet);
    let snippetCopy = Object.assign({}, props.snippet);
    let archiveIconClass = snippet.archived ?
      'fa fa-refresh fa-lg' : 'fa fa-archive fa-lg';

    this.state = {
      snippet, // working snippet data
      snippetCopy, // unedited, original snippet (i.e. for dirty-checking)
      snippetIsDirty: false, // whether the editing snippet differs from original
      working: false,
      errors: {},
      apiError: '',
      archiveIconClass
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.gotoLoginPage();
    } else {
      // if we have an invalid snippet id, redirect back to list page
      if (!this.props.snippet.id) {
        this.gotoListPage();
      }
    }
  }

  /*=============================================
   = routing methods
   =============================================*/
  gotoListPage() {
    goto.route('/snippets');
  }

  /*=============================================
   = event handlers
   =============================================*/
  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let snippet = this.state.snippet;
    snippet[propKey] = event.target.value;
    this.setState({ snippet });
    this.checkIfsnippetIsDirty();
  }

  onSubmit(event) {
    event.preventDefault();
    this.submitUpdate();
  }

  onArchiveClick() {
    let snippet = this.state.snippet;
    snippet.archived = !snippet.archived;
    this.setState({ snippet });
    this.submitUpdate();
  }

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

  onCancel(event) {
    event.preventDefault();
    this.gotoListPage();
  }

  submitUpdate() {
    if (this.isValid()) {
      this.setState({ working: true });
      this.props.actions.update(this.state.snippet)
        .then(res => {
          this.setState({ working: false });
          toastr.success('Snippet updated', 'Success');
          this.gotoListPage();
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
   = validation
   =============================================*/
  /** Checks if the snippet currently has unsaved edits */
  checkIfsnippetIsDirty() {
    let snippetIsDirty = false;

    // compare snippet 'title' properties
    let titleOrig = this.state.snippetCopy.title;
    let titleNew = this.state.snippet.title.trim();
    if (titleNew !== titleOrig) {
      snippetIsDirty = true;
    }

    // compare platforms
    let urlOrig = this.state.snippetCopy.url;
    let urlNew = this.state.snippet.url;
    if (urlNew && urlOrig !== urlNew) {
      snippetIsDirty = true;
    }

    this.setState({ snippetIsDirty });
  }

  isValid() {
    let valid = true;
    let snippet = this.state.snippet;
    let errors = {};

    // validate title
    let titleParams = { minLength: 3 };
    let titleVal = validate(snippet.title, titleParams);
    if (!titleVal.valid) {
      errors.title = titleVal.error;
      valid = false;
    }

    // validate url
    let urlParams = { required: true, format: 'url' };
    let urlVal = validate(snippet.url, urlParams);
    if (!urlVal.valid) {
      errors.url = urlVal.error;
      valid = false;
    }

    this.setState({ errors });
    return valid;
  }

  /*=============================================
   = render
   =============================================*/
  render() {
    let {snippet, apiError} = this.state;
    return (
      <div>
        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <div className={snippetStyles.snippetPanel(snippet)}>
          <div className="panel-heading">
            <h4 className="panel-title">
              {this.props.snippet.title}
            </h4>
          </div>

          <div className="panel-body">
            <SnippetForm
              snippet={snippet}
              working={this.state.working}
              errors={this.state.errors}
              snippetIsDirty={this.state.snippetIsDirty}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              />
          </div>
        </div>

        <a href onClick={(e) => this.onDeleteClick(e)}>Delete this Snippet</a>
        <br/>
      </div>
    );
  }
}

SnippetDetailPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  snippet: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let snippetId = ownProps.params.id;
  let snippet = apiHelper.findRecordById(state.snippets, snippetId);

  return {
    loggedIn: !!state.user.email,
    snippet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetDetailPage);
