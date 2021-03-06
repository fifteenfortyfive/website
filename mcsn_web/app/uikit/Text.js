import { h } from 'preact';
import classNames from 'classnames';

import styles from './Text.mod.css';

const Sizes = {
  SIZE_24: 'size24',
  SIZE_20: 'size20',
  SIZE_16: 'size16',
  SIZE_14: 'size14',
  SIZE_12: 'size12',
  SIZE_10: 'size10',
};

const Colors = {
  DEFAULT: 'colorDefault',
  MUTED: 'colorMuted',
  PRIMARY: 'colorPrimary',
  SECONDARY: 'colorSecondary',
  THEMED: 'colorThemed',
  BLACK: 'colorBlack',
  WHITE: 'colorWhite',
};

const Text = props => {
  const { size = Sizes.SIZE_16, color = Colors.DEFAULT, marginless = false, className, children } = props;

  return (
    <p
      className={classNames(styles.text, styles[color], styles[size], className, {
        [styles.marginless]: marginless,
      })}>
      {children}
    </p>
  );
};

Text.Sizes = Sizes;
Text.Colors = Colors;

export default Text;
