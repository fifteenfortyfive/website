import {h} from 'preact';

import Link from './link';
import Text from './text';

import style from './box-link.css';

const BoxLink = (props) => {
  const {
    title,
    children,
    href,
    className,
    ...linkProps
  } = props;

  return (
    <p className={className}>
      <a className={style.boxLink} href={href} {...linkProps}>
        <Text className={style.header} color={Text.Colors.PRIMARY}>
          {title}
        </Text>
        <Text className={style.body}>
          {children}
        </Text>
      </a>
    </p>
  );
};

export default BoxLink;
