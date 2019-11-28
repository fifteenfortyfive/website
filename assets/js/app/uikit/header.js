import {h} from 'preact';
import classNames from 'classnames';

import style from './Header.css';

const Sizes = {
  H1: 'size1',
  H2: 'size2',
  H3: 'size3',
  H4: 'size4',
  H5: 'size5',
  H6: 'size6',
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

const Header = (props) => {
  const {
    size = Sizes.H2,
    color = Colors.DEFAULT,
    withMargin=false,
    className,
    children
  } = props;

  return (
    <h1 className={classNames(
          style.header,
          style[color],
          style[size],
          className,
          {
            [style.withMargin]: withMargin
          }
        )}>
      {children}
    </h1>
  )
};

Header.Sizes = Sizes;
Header.Colors = Colors;

export default Header;
