import { h } from 'preact';

const Folder = ({ header, collapsed, icon, onClick }) => {
  return (
    <div className="foldable-header" onClick={onClick}>
      {collapsed ? '>' : '<'}
      {!collapsed && header}
    </div>
  );
};

export default Folder;
