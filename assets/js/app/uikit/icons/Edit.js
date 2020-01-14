import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Edit = props => {
  return <FontAwesomeIcon fixedWidth {...props} icon={faEdit} />;
};

export default Edit;
