import { h } from 'preact';

import ThemeProvider from '../../../uikit/ThemeProvider';
import LayoutNavbar from './LayoutNavbar';
import LayoutFooter from './LayoutFooter';

import { Container, Section } from 'bloomer';

import styles from './Layout.mod.css';

const Layout = props => {
  const { withContainer = true, children } = props;

  return (
    <ThemeProvider>
      <div className={styles.layout}>
        <LayoutNavbar />
        <div class={styles.body}>
          {withContainer ? (
            <Container>
              <Section>{children}</Section>
            </Container>
          ) : (
            children
          )}
        </div>
        <LayoutFooter />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
