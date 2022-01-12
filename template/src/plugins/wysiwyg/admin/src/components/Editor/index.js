import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import MediaIcon from '@strapi/icons/PicturePlus';
import { Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system/Field';
import { Button } from '@strapi/design-system/Button';
import Editor from './CKEditor';
import MediaLib from './MediaLib';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

const errorBorder = {
  borderColor:"danger600",
  borderStyle:"solid",
  borderWidth:"1px",
  marginBottom: 2
};

const Wysiwyg = ({
  intlLabel,
  disabled,
  name,
  onChange,
  value,
  error,
  required
}) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(prev => !prev);
  const onClose = () => setIsOpen(false);
  const showErrorState = (e) => e ? errorBorder : {};

  return (
    
    <Field name={name} error={error ? formatMessage({
        id: error,
        defaultMessage:  `${name} error`,
      }): ''}>
      <Box paddingBottom={4} >
        <Flex justifyContent="space-between">
          <FieldLabel required={required}>{intlLabel.defaultMessage}</FieldLabel>
          <Button 
            type="button"
            startIcon={<MediaIcon />}
            variant="secondary"
            onClick={handleToggle}>
              {formatMessage({
                id: getTrad('plugin.button.img.text'),
                defaultMessage: 'Add Image',
              })}
          </Button>
        </Flex>
      </Box>
      <Box {...showErrorState(error)} >
        <Editor
          name={name}
          value={value}
          onChange={onChange} disabled={disabled} />
      </Box>

      <FieldHint />
      <FieldError />
      
      <MediaLib 
        name={name}
        value={value}
        onClose={onClose}
        isOpen={isOpen}
        onChange={onChange} />
    </Field>
  )
}

Wysiwyg.propTypes = {
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool
};

export default Wysiwyg;