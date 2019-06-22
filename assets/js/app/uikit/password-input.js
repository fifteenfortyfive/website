import { h, Component } from 'preact';

// Password inputs are intentionally uncontrolled to avoid potentially leaking
// the value
const PasswordInput = (props) => {
  const {
    label,
    placeholder="",
    multiline=false,
    onChange,
    className,
    ...inputProps
  } = props;

  return (
    <div class="ff-text-input ${className}">
      <h3 class="title is-6 has-margin-bottom-sm">{label}</h3>
      <input
        type="password"
        placeholder={placeholder}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
};

export default PasswordInput;
