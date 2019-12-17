import { h } from 'preact';

import LayoutFooter from '../modules/layout/components/LayoutFooter';
import LayoutNavbar from '../modules/layout/components/LayoutNavbar';
import Header from '../uikit/Header';
import Icon from '../uikit/Icon';
import ThemeProvider from '../uikit/ThemeProvider';

import { Container, Hero, HeroBody, HeroHeader } from 'bloomer';

import styles from './The1545.mod.css';

const The1545 = props => {
  return (
    <ThemeProvider>
      <Hero className={styles.splash} isColor="dark" isFullHeight>
        <HeroHeader>
          <LayoutNavbar isDark />
        </HeroHeader>

        <HeroBody className={styles.splashPrimary}>
          <Container className={styles.textCentered}>
            <Icon name={Icon.Names.COMMUNITY_CHEST} size={120} />
            <Header size={Header.Sizes.H2} color={Header.Colors.WHITE}>
              March 27-29, 2020
            </Header>
            <div class={styles.heroActions} />
          </Container>
        </HeroBody>
      </Hero>

      <LayoutFooter />
    </ThemeProvider>
  );
};

export default The1545;
