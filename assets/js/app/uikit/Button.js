import { h } from 'preact';
import classNames from 'classnames';

import styles from './Button.mod.css';

const Colors = {
  PRIMARY: 'colorPrimary',
  SECONDARY: 'colorSecondary',
  SUCCESS: 'colorSuccess',
  WARNING: 'colorWarning',
  DANGER: 'colorDanger',
  INFO: 'colorInfo',
  TRANSPARENT: 'colorTransparent',
  DEFAULT: 'colorDefault',
};

const Styles = {
  // Color-filled background, plain text
  NORMAL: 'styleNormal',
  // No background, colored text, colored border
  OUTLINED: 'styleOutlined',
  // Plain background, colord text, colored border
  INVERTED: 'styleInverted',
  // No background, colored text, no border, underline on hover
  TEXT: 'styleText',
  // Faded background, faded text
  DISABLED: 'styleDisabled',
};

const Button = props => {
  const {
    color = Colors.DEFAULT,
    style = Styles.NORMAL,
    fullwidth,
    onClick,
    children,
    disabled = false,
    className,
  } = props;

  return (
    <button
      class={classNames(styles.button, styles[color], styles[style], className, {
        [styles.isFullwidth]: fullwidth,
      })}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

Button.Colors = Colors;
Button.Styles = Styles;

export default Button;
