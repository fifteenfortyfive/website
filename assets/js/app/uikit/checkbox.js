import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div class={`ff-checkbox ${disabled && '--disabled'} ${className || ''}`} onClick={() => !disabled && onChange(!checked)}>
      <div class="ff-checkbox__check">
        <span class={visibleUnchecked}>
          <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg" />
        </span>
        <span class={visibleChecked}>
          <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg" />
        </span>
      </div>
      <label>
        <h3 class="title is-5 has-margin-top-nudge has-margin-bottom-sm">{header}</h3>
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
