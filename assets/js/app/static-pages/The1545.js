import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LayoutFooter from '../modules/layout/components/LayoutFooter';
import LayoutNavbar from '../modules/layout/components/LayoutNavbar';
import Anchor from '../uikit/Anchor';
import Icon from '../uikit/Icon';
import ThemeProvider from '../uikit/ThemeProvider';

import {
  Column,
  Columns,
  Container,
  Content,
  Hero,
  HeroBody,
  HeroFooter,
  HeroHeader,
  Section,
} from 'bloomer';

import { ExternalRoutes } from '../Constants';
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
            <Icon name={Icon.Names.THE_1545} size={150} />
            <h2 class={styles.subtitle}>Summer 2020</h2>
            <div class={styles.heroActions} />
          </Container>
        </HeroBody>

        <HeroFooter className={styles.heroFoot}>
          <Container className={styles.textCentered}>
            <FontAwesomeIcon size="large" icon="arrow-circle-down" />
          </Container>
        </HeroFooter>
      </Hero>

      <Section>
        <Container>
          <Content>
            <Columns isDesktop>
              <Column size={8}>
                <h1 class="title">The Relay</h1>
                <p class="is-size-4">
                  The 1545 is a massive annual speedrunning relay race where teams of runners will complete
                  the Super Mario 602, the Rareware 301%, and the Sprashfecta, all in a row, back to back to
                  back.
                </p>
                <p>
                  Every year, dozens of runners from the three communities come together in one of the largest
                  single races in speedrunning to date. Last year, more than 70 runners took part, with times
                  averaging around 48 hours per team.
                </p>
              </Column>

              <Column size={4}>
                <h1 class="title">Summer 2020</h1>
                <p>
                  Our plans for a 2020 have not yet been announced! Follow us on{' '}
                  <Anchor href={ExternalRoutes.TWITTER_URL}>Twitter</Anchor> to keep up with announcements and
                  hear when we announce this year's schedule.
                </p>
              </Column>
            </Columns>
          </Content>
        </Container>
      </Section>

      <LayoutFooter />
    </ThemeProvider>
  );
};

export default The1545;
