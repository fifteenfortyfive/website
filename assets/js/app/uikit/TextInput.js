import { h, Component } from 'preact';
import classNames from 'classnames';

import InputWrapper from './InputWrapper';

import style from './TextInput.css';

const TextInput = props => {
  const {
    name,
    value,
    label,
    note,
    placeholder = '',
    multiline = false,
    editable = true,
    onChange,
    onInput,
    className,
    ...inputProps
  } = props;

  return (
    <InputWrapper name={name} label={label} note={note} className={className}>
      <input
        {...inputProps}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        class={style.input}
        onChange={onChange}
        onInput={onInput}
        disabled={!editable}
      />
    </InputWrapper>
  );
};

export default TextInput;
