import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ChevronDown = props => {
  return <FontAwesomeIcon fixedWidth {...props} icon={faChevronDown} />;
};

export default ChevronDown;
