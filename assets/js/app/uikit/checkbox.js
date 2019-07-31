import { h } from 'preact';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './header';

import style from './checkbox.css';

const Checkbox = (props) => {
  const {
    checked = false,
    header,
    disabled,
    children,
    onChange,
    className
  } = props;

  const visibleUnchecked = checked ? "hidden" : "visible";
  const visibleChecked = checked ? "visible" : "hidden";

  return (
    <div
        class={classNames(style.checkbox, {
          [style.disabled]: disabled
        })}
        onClick={() => !disabled && onChange(!checked)}
      >
      <div class={style.check}>
        <span class={classNames({[style.visible]: !checked})}>
          <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg" />
        </span>
        <span class={classNames({[style.visible]: checked})}>
          <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg" />
        </span>
      </div>
      <label class={style.label}>
        <Header size={Header.Sizes.H5} className="has-margin-top-nudge has-margin-bottom-sm">
          {header}
        </Header>
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
