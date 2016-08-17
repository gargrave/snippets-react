import React, {PropTypes} from 'react';

import SubmitCancelBtnGroup from '../../common/components/SubmitCancelBtnGroup';
import TextInput from '../../common/components/TextInput';


const SnippetForm = ({
  snippet, working, errors, snippetIsDirty,
  onChange, onSubmit, onCancel}) => {
  return (
    <form>
      <TextInput
        label="Title"
        name="title"
        value={snippet.title}
        placeholder="Title (Optional)"
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        label="URL"
        name="url"
        value={snippet.url}
        placeholder="URL"
        onChange={onChange}
        error={errors.url}
      />
      <hr/>

      <SubmitCancelBtnGroup
        working={working}
        disableSubmit={!snippetIsDirty}
        onSubmit={onSubmit}
        onCancelClick={onCancel}
      />
    </form>
  );
};

SnippetForm.propTypes = {
  snippet: PropTypes.object.isRequired,
  working: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  snippetIsDirty: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default SnippetForm;
