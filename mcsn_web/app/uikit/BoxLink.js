import { h } from 'preact';

import Anchor from './Anchor';
import Text from './Text';

import styles from './BoxLink.mod.css';

const BoxLink = props => {
  const { title, children, href, className, ...linkProps } = props;

  return (
    <p className={className}>
      <Anchor className={styles.boxLink} href={href} {...linkProps}>
        <Text className={styles.header} color={Text.Colors.PRIMARY} marginless>
          {title}
        </Text>
        <Text className={styles.body} marginless>
          {children}
        </Text>
      </Anchor>
    </p>
  );
};

export default BoxLink;
