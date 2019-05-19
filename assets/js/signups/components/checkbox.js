import { h, render } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkbox = (props) => {
  const {
    checked = false,
    label,
    onClick
  } = props;

  const visibleUnchecked = checked ? "hidden" : "visible";
  const visibleChecked = checked ? "visible" : "hidden";

  console.log(checked)

  return (
    <div class="checkbox" onClick={() => onClick(!checked)}>
      <div class="checkbox__check">
        <span class={visibleUnchecked}>
          <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg" />
        </span>
        <span class={visibleChecked}>
          <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg" />
        </span>
      </div>
      <label>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
