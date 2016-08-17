import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isEqual} from 'lodash';
import toastr from 'toastr';

import actions from '../snippetsActions';
import validate from '../../../utils/validate';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import SnippetForm from '../components/SnippetForm';


class SnippetEditPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    let snippet = Object.assign({}, props.snippet);
    let snippetCopy = Object.assign({}, props.snippet);

    this.state = {
      snippet, // working snippet data
      snippetCopy, // unedited, original snippet (i.e. for dirty-checking)
      snippetIsDirty: false, // whether the editing snippet differs from original
      working: false,
      errors: {},
      apiError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onAddDate = this.onAddDate.bind(this);
    this.onRemoveDate = this.onRemoveDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  gotoListPage() {
    goto.route('/snippets');
  }

  gotoDetailsPage() {
    let id = this.state.snippet.id;
    goto.route(`/snippets/${id}`);
  }

  /** Checks if the snippet currently has unsaved edits */
  checkIfsnippetIsDirty() {
    let snippetIsDirty = false;

    // compare snippet 'title' properties
    let titleOrig = this.state.snippetCopy.title;
    let titleNew = this.state.snippet.title.trim();
    if (titleNew && titleNew !== titleOrig) {
      snippetIsDirty = true;
    }

    // compare platforms
    let urlOrig = this.state.snippetCopy.url;
    let urlNew = this.state.snippet.url;
    if (urlOrig !== urlNew) {
      snippetIsDirty = true;
    }

    this.setState({ snippetIsDirty });
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

  onCheckChange(event) {
    let propKey = event.target.name;
    let snippet = this.state.snippet;
    snippet[propKey] = event.target.checked;
    this.setState({ snippet });
    this.checkIfsnippetIsDirty();
  }

  onAddDate(date) {
    let snippet = this.state.snippet;
    snippet.dates.push(date);
    this.setState({ snippet });
    this.checkIfsnippetIsDirty();
  }

  onRemoveDate(date) {
    let snippet = this.state.snippet;
    snippet.dates = snippet.dates.filter((d) => d !== date);
    this.setState({ snippet });
    this.checkIfsnippetIsDirty();
  }

  onSubmit(event) {
    event.preventDefault();

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

  onCancel(event) {
    event.preventDefault();
    this.gotoDetailsPage();
  }

  /*=============================================
   = validation
   =============================================*/
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

  render() {
    let {apiError} = this.state;
    return (
      <div>
        <h3>Edit Snippet: {this.props.snippet.title}</h3>
        <hr/>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <SnippetForm
          snippet={this.state.snippet}
          working={this.state.working}
          errors={this.state.errors}
          snippetIsDirty={this.state.snippetIsDirty}
          onChange={this.onChange}
          onCheckChange={this.onCheckChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          onAddDate={this.onAddDate}
          onRemoveDate={this.onRemoveDate}
        />
        <br/>
      </div>
    );
  }
}

SnippetEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  snippet: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let snippetId = ownProps.params.id;
  let snippet = apiHelper.findRecordById(state.snippets, snippetId);

  return {
    snippet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetEditPage);
