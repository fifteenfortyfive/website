import { h } from 'preact';
import classNames from 'classnames';

import styles from './ButtonGroup.mod.css';

const ButtonGroup = props => {
  const { children, className } = props;

  return <div class={classNames(styles.group, className)}>{children}</div>;
};

export default ButtonGroup;
