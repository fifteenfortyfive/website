import { h } from 'preact';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './Header';

import styles from './Checkbox.mod.css';

const Checkbox = props => {
  const { checked = false, disabled, marginless = false, children, onChange, className } = props;

  const handleKeyDown = event => {
    const { key } = event;
    if (key === ' ' || key === 'Enter' || key === 'Spacebar') {
      event.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div
      class={classNames(styles.checkbox, className, {
        [styles.disabled]: disabled,
        [styles.marginless]: marginless,
      })}
      tabindex="0"
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={handleKeyDown}
      aria-role="checkbox"
      aria-checked={checked}>
      <div class={styles.check}>
        <span class={classNames({ [styles.visible]: !checked })}>
          <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg" />
        </span>
        <span class={classNames({ [styles.visible]: checked })}>
          <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg" />
        </span>
      </div>
      <label class={styles.label}>{children}</label>
    </div>
  );
};

Checkbox.Header = ({ children, ...props }) => (
  <Header size={Header.Sizes.H5} {...props} className={styles.header}>
    {children}
  </Header>
);

export default Checkbox;
