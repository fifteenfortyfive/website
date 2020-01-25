import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const Minus = props => {
  return <FontAwesomeIcon fixedWidth {...props} icon={faMinus} />;
};

export default Minus;
