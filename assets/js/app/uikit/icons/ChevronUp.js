import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ChevronUp = props => {
  return <FontAwesomeIcon fixedWidth {...props} icon={faChevronUp} />;
};

export default ChevronUp;
