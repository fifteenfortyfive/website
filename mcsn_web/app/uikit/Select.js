import { h } from 'preact';

import InputWrapper from './InputWrapper';

import styles from './Select.mod.css';

/*
  Simple select input styled like all other inputs. `options` is either a list
  of strings, or a list if `{name, value}` objects.
*/
const Select = props => {
  const {
    name,
    value,
    options = [],
    label,
    note,
    placeholder = null,
    editable = true,
    onChange,
    className,
  } = props;

  return (
    <InputWrapper name={name} label={label} note={note} className={className}>
      <select class={styles.input} onChange={onChange} disabled={!editable} value={value}>
        {placeholder && (
          <option disabled selected value="">
            {placeholder}
          </option>
        )}
        {options.map(option => {
          if (typeof option === 'object') {
            return <option value={option.value}>{option.name}</option>;
          } else {
            return <option value={option}>{option}</option>;
          }
        })}
      </select>
    </InputWrapper>
  );
};

export default Select;
