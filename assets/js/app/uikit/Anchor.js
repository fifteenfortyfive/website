import { h } from 'preact';
import classNames from 'classnames';
import { setLinkProps } from 'hookrouter';

import * as RouterUtils from '../modules/router/RouterUtils';

import styles from './Anchor.mod.css';

const Anchor = props => {
  const { children, className, ...linkProps } = props;
  const { href } = linkProps;

  const isLocal = RouterUtils.isLocalUrl(href);

  if (!isLocal) {
    return (
      <a
        {...linkProps}
        className={classNames(styles.content, className)}
        target="_blank"
        rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a {...setLinkProps(linkProps)} className={classNames(styles.content, className)}>
      {children}
    </a>
  );
};

export default Anchor;
