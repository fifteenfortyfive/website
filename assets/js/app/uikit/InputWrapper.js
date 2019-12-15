import { h } from 'preact';
import classNames from 'classnames';

import styles from './InputWrapper.mod.css';

const InputWrapper = props => {
  const { name, label, note, children, className } = props;

  return (
    <div class={classNames(styles.container, className)}>
      <div class={styles.control}>
        <label for={name} class={styles.label}>
          {label}
        </label>
        {children}
      </div>
      {note && <p class={styles.note}>{note}</p>}
    </div>
  );
};

export default InputWrapper;
