import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkbox = (props) => {
  const {
    checked = false,
    label,
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
        {label || children}
      </label>
    </div>
  );
}

export default Checkbox;
