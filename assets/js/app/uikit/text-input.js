import { h, Component } from 'preact';

const TextInput = (props) => {
  const {
    value,
    placeholder="",
    onChange,
    className
  } = props;

  return (
    <input
      type="text"
      class={`ff-input ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextInput;
