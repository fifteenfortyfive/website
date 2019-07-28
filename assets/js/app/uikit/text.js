import {h} from 'preact';
import classNames from 'classnames';

import style from './text.css';

const Sizes = {
  SIZE_24: 'size24',
  SIZE_20: 'size20',
  SIZE_16: 'size16',
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

const Text = (props) => {
  const {
    size = Sizes.SIZE_16,
    color = Colors.DEFAULT,
    className,
    children
  } = props;

  return (
    <p className={classNames(style.header, style[color], style[size], className)}>
      {children}
    </p>
  )
};

Text.Sizes = Sizes;
Text.Colors = Colors;

export default Text;
