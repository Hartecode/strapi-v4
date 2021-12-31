import React, { useState } from 'react';
// import PropTypes from 'prop-types';
//import { isEmpty } from 'lodash';

import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction } from '@strapi/design-system/Field';
import { Button } from '@strapi/design-system/Button';
// import { InputDescription, InputErrors } from 'strapi-helper-plugin';
import Editor from './CKEditor';
//import MediaLib from './MediaLib';
//import styled from 'styled-components';

// const Required = styled.span`
//   color: #d02b20;
//   font-size: 0.875rem;
// `;
// const FieldLabel = styled.p`
//   font-weight: 600;
//   color: #32324d;
//   font-size: 0.75rem;
//   line-height: 1.33;
// `;


// const Wysiwyg = ({
//   inputDescription,
//   errors,
//   intlLabel,
//   labelAction,
//   name,
//   onChange,
//   value,
//   required,
//   disabled
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   let spacer = !isEmpty(inputDescription) ? <div style={{ height: '.4rem' }} /> : <div />;

//   if (!isEmpty(errors)) {
//     spacer = <div />;
//   }

//   // const handleChange = data => {
//   //   if (data.mime.includes('image')) {
//   //     const imgTag = `<img src="${data.url}" srcset="${srcSet(data.formats)}" caption="${data.caption}" alt="${data.alternativeText}" loading="lazy"></img>`;
//   //     const newValue = value ? `${value}${imgTag}` : imgTag;
//   //     onChange({ target: { name, value: newValue } });
//   //   }

//   //   // Handle videos and other type of files by adding some code
//   // };

//   const handleToggle = () => setIsOpen(prev => !prev);
//   const onClose = () => setIsOpen(false);

//   return (
//     <div
//       style={{
//         marginBottom: '1.6rem',
//         fontSize: '1.3rem',
//         fontFamily: 'Lato',
//       }}
//     >
//       {/* <Label htmlFor={name} message={intlLabel} style={{ marginBottom: 10 }} /> */}
//       <p>
//         {intlLabel}
//         {/* {required && <Required>*</Required>} */}
//         {labelAction}
//       </p>
//       <div style={{
//         marginBottom: '1rem'
//       }}>
//         <button color="primary" onClick={handleToggle}>
//           MediaLib
//         </button>
//       </div>
//       {/* <Editor name={name} onChange={onChange} value={value} disabled={disabled} /> */}
//       {/* <InputDescription
//         message={inputDescription}
//         style={!isEmpty(inputDescription) ? { marginTop: '1.4rem' } : {}}
//       />
//       <InputErrors errors={(!noErrorsDescription && errors) || []} name={name} /> */}
//       {spacer}
//       {/* <MediaLib onClose={onClose} isOpen={isOpen} onChange={onChange} /> */}
//     </div>
//   );
// };
const Wysiwyg = ({
  intlLabel,
  disabled,
  name,
  onChange,
  value,
  error,
  required
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(prev => !prev);
  
  return (
    
    <Field name={name} error={error}>
      <Box paddingBottom={4} >
        <Flex justifyContent="space-between">
          <FieldLabel required={required}>{intlLabel.defaultMessage}</FieldLabel>
          <Button onClick={handleToggle}>
              MediaLib
          </Button>
        </Flex>
      </Box>
      <Editor
        name={name}
        value={value}
        onChange={onChange} disabled={disabled} />
      <FieldHint />
      <FieldError />
    </Field>
  )
}
// Wysiwyg.defaultProps = {
//   errors: [],
//   inputDescription: null,
//   label: '',
//   noErrorsDescription: false,
//   value: '',
// };

// attribute: {type: 'richtext'}
// contentTypeUID: "api::config.config"
// description: null
// disabled: false
// error: null
// intlLabel: {id: 'Rich_text', defaultMessage: 'Rich_text'}
// labelAction: undefined
// multiple: false
// name: "rich_text"
// onChange: ƒ (_ref4)
// options: [{…}]
// placeholder: null
// required: false
// type: "wysiwyg"
// value: null
// withDefaultValue: false

// Wysiwyg.propTypes = {
//   errors: PropTypes.array,
//   inputDescription: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.func,
//     PropTypes.shape({
//       id: PropTypes.string,
//       params: PropTypes.object,
//     }),
//   ]),
//   label: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.func,
//     PropTypes.shape({
//       id: PropTypes.string,
//       params: PropTypes.object,
//     }),
//   ]),
//   name: PropTypes.string.isRequired,
//   noErrorsDescription: PropTypes.bool,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string,
// };

export default Wysiwyg;