import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../bookmarksActions';
import validate from '../../../utils/validate';
import goto from '../../../utils/goto';
import BookmarkForm from '../components/BookmarkForm';


class BookmarkCreatePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bookmark: {},
      working: false,
      errors: {},
      apiError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  /*=============================================
   = event handlers
   =============================================*/
  onChange(event) {
    event.preventDefault();

    let propKey = event.target.name;
    let bookmark = this.state.bookmark;
    bookmark[propKey] = event.target.value;
    this.setState({ bookmark });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ working: true });
      this.props.actions.create(this.state.bookmark)
        .then(res => {
          this.setState({ working: false });
          toastr.success('Bookmark created', 'Success');
          this.redirectToListPage();
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error creating bookmark', 'Error');
        });
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.redirectToListPage();
  }

  render() {
    return (
      <div>
        <BookmarkForm
          bookmark={this.state.bookmark}
          working={this.state.working}
          errors={this.state.errors}
          bookmarkIsDirty={true}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

BookmarkCreatePage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkCreatePage);
