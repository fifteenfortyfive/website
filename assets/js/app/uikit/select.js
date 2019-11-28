import {h, Fragment} from 'preact';
import classNames from 'classnames';

import InputWrapper from './InputWrapper';

import style from './Select.css';

/*
  Simple select input styled like all other inputs. `options` is either a list
  of strings, or a list if `{name, value}` objects.
*/
const Select = (props) => {
  const {
    name,
    value,
    options=[],
    label,
    note,
    placeholder=null,
    multiline=false,
    editable=true,
    onChange,
    className,
    ...inputProps
  } = props;

  return (
    <InputWrapper
        name={name}
        label={label}
        note={note}
        className={className}
      >
      <select class={style.input} onChange={onChange} disabled={!editable} value={value}>
        { placeholder &&
          <option disabled selected value="">{placeholder}</option>
        }
        { options.map((option) => {
            if(typeof(option) === 'object') {
              return <option value={option.value}>{option.name}</option>
            } else {
              return <option value={option}>{option}</option>
            }
          })
        }
      </select>
    </InputWrapper>
  );

};

export default Select;
