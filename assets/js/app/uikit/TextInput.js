import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import InputWrapper from './InputWrapper';

import styles from './TextInput.mod.css';

const TextInput = props => {
  const {
    name,
    value,
    label,
    note,
    placeholder = '',
    editable = true,
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

  return (
    <InputWrapper name={name} label={label} note={note} className={className}>
      <input
        {...inputProps}
        type="text"
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
