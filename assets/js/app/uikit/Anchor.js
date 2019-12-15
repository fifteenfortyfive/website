import { h } from 'preact';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import * as RouterUtils from '../modules/router/RouterUtils';

import styles from './Anchor.mod.css';

// type AnchorProps = {
//   href: string,
//   target?: string,
//   rel?: string,
//   className?: string,
//   children: React.ReactNode,
// };

const Anchor = props => {
  const { children, className, href, ...linkProps } = props;

  const isLocal = RouterUtils.isLocalUrl(href);

  if (!isLocal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(styles.content, 'block-external', className)}
        {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} {...linkProps} className={classNames(styles.content, className)}>
      {children}
    </Link>
  );
};

export default Anchor;
