import { h, Component } from 'preact';

const TextInput = (props) => {
  const {
    label,
    name,
    value,
    placeholder="",
    multiline=false,
    onChange,
    onInput,
    className,
    ...inputProps
  } = props;

  return (
    <div class="ff-text-input ${className}">
      <h3 class="title is-6 has-margin-bottom-sm">{label}</h3>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onInput={onInput}
        {...inputProps}
      />
    </div>
  );
};

export default TextInput;
