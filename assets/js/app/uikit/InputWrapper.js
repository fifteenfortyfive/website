import { h } from 'preact';
import classNames from 'classnames';

import style from './InputWrapper.css';

const InputWrapper = props => {
  const { name, label, note, children, className } = props;

  return (
    <div class={classNames(style.container, className)}>
      <div class={style.control}>
        <label for={name} class={style.label}>
          {label}
        </label>
        {children}
      </div>
      {note && <p class={style.note}>{note}</p>}
    </div>
  );
};

export default InputWrapper;
