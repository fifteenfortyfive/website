import {h} from 'preact';
import classNames from 'classnames';
import {Link} from 'preact-router';

import style from './link.css';

const UILink = (props) => {
  const {
    className,
    children,
    ...linkProps
  } = props;

  return (
    <Link className={classNames(className, style.wrapper)} {...linkProps}>
      {children}
    </Link>
  )
}

export default UILink;
