import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import actions from '../snippetsActions';
import validate from '../../../utils/validate';
import goto from '../../../utils/goto';
import snippetData from '../snippetData';
import snippetStyles from '../helpers/snippetStyles';
import SnippetForm from '../components/SnippetForm';


class SnippetsCreatePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      snippet: snippetData.getNewRecord(),
      working: false,
      errors: {},
      apiError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.gotoLoginPage();
    }
  }

  redirectToListPage() {
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
    this.setState({snippet});
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.loggedIn && this.isValid()) {
      this.setState({working: true});
      this.props.actions.create(this.state.snippet)
        .then(() => {
          this.setState({working: false});
          toastr.success('Snippet created', 'Success');
          this.redirectToListPage();
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error creating snippet', 'Error');
        });
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.redirectToListPage();
  }

  /*=============================================
   = validation
   =============================================*/
  isValid() {
    let valid = true;
    let snippet = this.state.snippet;
    let errors = {};

    // validate title
    let titleParams = {minLength: 3};
    let titleVal = validate(snippet.title, titleParams);
    if (!titleVal.valid) {
      errors.title = titleVal.error;
      valid = false;
    }

    // validate url
    let urlParams = {required: true, format: 'url'};
    let urlVal = validate(snippet.url, urlParams);
    if (!urlVal.valid) {
      errors.url = urlVal.error;
      valid = false;
    }

    this.setState({errors});
    return valid;
  }

  render() {
    const {apiError, snippet} = this.state;
    return (
      <span>
        {apiError &&
        <div className="alert alert-danger">Error: {apiError}</div>
        }
        <div className={snippetStyles.snippetCreatePanel()}>

          <div className="panel-heading">
            <h3 className="panel-title">New Snippet</h3>
          </div>

          <div className="panel-body">
            <SnippetForm
              snippet={snippet}
              working={this.state.working}
              errors={this.state.errors}
              snippetIsDirty={true}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
            />
          </div>
        </div>
      </span>
    );
  }
}

SnippetsCreatePage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: !!state.user.email
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsCreatePage);
