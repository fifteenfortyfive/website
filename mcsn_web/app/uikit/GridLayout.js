import { h } from 'preact';
import classNames from 'classnames';

import styles from './GridLayout.mod.css';

const GridLayout = props => {
  const { className, children } = props;

  return <div className={classNames(styles.layout, className)}>{children}</div>;
};

const GridCell = props => {
  const { span, spanSmall = span, spanRegular = span, spanLarge = span, className, children } = props;

  return (
    <div
      className={classNames(styles.cell, className)}
      style={{
        '--_grid__span-small': spanSmall,
        '--_grid__span-regular': spanRegular,
        '--_grid__span-large': spanLarge,
      }}>
      {children}
    </div>
  );
};

export { GridCell, GridLayout };
