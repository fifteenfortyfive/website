import {h, Fragment} from 'preact';
import classNames from 'classnames';

import InputWrapper from './input-wrapper';

import style from './select.css';

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
    placeholder="",
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
      <select class={style.input} onChange={onChange}>
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
