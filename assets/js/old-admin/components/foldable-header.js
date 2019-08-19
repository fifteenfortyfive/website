import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Folder = ({ header, collapsed, icon, onClick }) => {
  return (
    <div className="foldable-header" onClick={onClick}>
      <FontAwesomeIcon
        icon={collapsed ? "chevron-right" : "chevron-left"}
        size="sm"
        className="has-margin-right-sm has-text-grey"
      />
      {!collapsed && header}
    </div>
  );
};

export default Folder;
