import { h } from 'preact';

import styles from './ThemeProvider.mod.css';

const ThemeProvider = props => {
  const { children } = props;
  return <div className={styles.theme}>{children}</div>;
};

export default ThemeProvider;
