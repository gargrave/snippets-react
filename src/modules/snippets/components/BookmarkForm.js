import React, {PropTypes} from 'react';

import SubmitCancelBtnGroup from '../../common/components/SubmitCancelBtnGroup';
import TextInput from '../../common/components/TextInput';


const BookmarkForm = ({
  bookmark, working, errors, bookmarkIsDirty,
  onChange, onSubmit, onCancel}) => {
  return (
    <form>
      <TextInput
        label="Bookmark Name"
        name="name"
        value={bookmark.name}
        placeholder="Bookmark Name"
        onChange={onChange}
        error={errors.name}
        />

      <SubmitCancelBtnGroup
        working={working}
        disableSubmit={!bookmarkIsDirty}
        onSubmit={onSubmit}
        onCancelClick={onCancel}
      />
    </form>
  );
};

BookmarkForm.propTypes = {
  bookmark: PropTypes.object.isRequired,
  working: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  bookmarkIsDirty: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default BookmarkForm;
