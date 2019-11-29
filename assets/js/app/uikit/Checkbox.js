import { h } from 'preact';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './Header';

import style from './Checkbox.css';

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
      class={classNames(style.checkbox, className, {
        [style.disabled]: disabled,
        [style.marginless]: marginless,
      })}
      tabindex="0"
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={handleKeyDown}
      aria-role="checkbox"
      aria-checked={checked}>
      <div class={style.check}>
        <span class={classNames({ [style.visible]: !checked })}>
          <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg" />
        </span>
        <span class={classNames({ [style.visible]: checked })}>
          <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg" />
        </span>
      </div>
      <label class={style.label}>{children}</label>
    </div>
  );
};

Checkbox.Header = ({ children, ...props }) => (
  <Header size={Header.Sizes.H5} {...props} className={style.header}>
    {children}
  </Header>
);

export default Checkbox;
