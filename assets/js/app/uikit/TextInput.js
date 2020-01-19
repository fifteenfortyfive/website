import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import InputWrapper from './InputWrapper';

import styles from './TextInput.mod.css';

const TextInputTypes = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
};

const TextInput = props => {
  const {
    name,
    type = TextInputTypes.TEXT,
    value,
    label,
    note,
    placeholder = '',
    editable = true,
    multiline = false,
    onChange,
    onInput,
    className,
    ...inputProps
  } = props;

  const handleChange = useCallback(
    event => {
      const { value } = event.target;
      onChange != null && onChange(value);
    },
    [onChange]
  );

  const Tag = multiline ? 'textarea' : 'input';

  return (
    <InputWrapper name={name} label={label} note={note} className={className}>
      <Tag
        {...inputProps}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        class={styles.input}
        onChange={handleChange}
        onInput={onInput}
        disabled={!editable}
      />
    </InputWrapper>
  );
};

export default TextInput;
