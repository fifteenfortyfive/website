import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Plus = props => {
  return <FontAwesomeIcon fixedWidth {...props} icon={faPlus} />;
};

export default Plus;
