import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "ckeditor5-build-strapi-wysiwyg";
import styled from 'styled-components';

// add styling here to edit the content look
// https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/content-styles.html
const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
    
    > .ck.ck-content {
      color: #424242;
    }

    pre {
        background: black;
        color: #fff;
    }
  }
`;


const configuration = {
  toolbar: [
    'heading',
    '|',
    'alignment', '|',
    'bold',
    'italic',
    'link',
    'strikethrough',
    'underline',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'indent',
    'outdent',
    '|',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'codeBlock',
    'htmlEmbed',
    '|',
    'fullscreen',
    'undo',
    'redo',
  ],
  codeBlock: {
    languages: [
        { language: 'javascript', label: 'JavaScript' },
        { language: 'html', label: 'HTML' }
    ]
}
};

const Editor = ({ onChange, name, value, disabled }) => {
  return (
    <Wrapper>
      <CKEditor
        editor={ClassicEditor}
        config={configuration}
        data={value}
        onReady={editor => editor.setData(value)}
        disabled={disabled}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;