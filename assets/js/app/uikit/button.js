import {h} from 'preact';
import _ from 'lodash';
import classNames from 'classnames';

import buttonStyle from './button.css';

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


const Button = (props) => {
  const {
    color = Colors.DEFAULT,
    style = Styles.NORMAL,
    fullwidth,
    onClick,
    children,
    className
  } = props;

  return (
    <button
        class={classNames(
          buttonStyle.button,
          buttonStyle[color],
          buttonStyle[style],
          className, {
            [buttonStyle.isFullwidth]: fullwidth
          }
        )}
        onClick={onClick}
      >
      {children}
    </button>
  );
};

Button.Colors = Colors;
Button.Styles = Styles;

export default Button;
