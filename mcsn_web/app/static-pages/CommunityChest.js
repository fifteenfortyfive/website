import { h } from 'preact';

import LayoutFooter from '../modules/layout/components/LayoutFooter';
import LayoutNavbar from '../modules/layout/components/LayoutNavbar';
import Header from '../uikit/Header';
import Icon from '../uikit/Icon';
import Text from '../uikit/Text';
import ThemeProvider from '../uikit/ThemeProvider';

import { Columns, Column, Container, Hero, HeroBody, HeroHeader, Section } from 'bloomer';

import styles from './The1545.mod.css';

const The1545 = props => {
  return (
    <ThemeProvider>
      <Hero className={styles.splash} isColor="dark" isFullHeight>
        <HeroHeader>
          <LayoutNavbar isDark />
        </HeroHeader>

        <HeroBody className={styles.splashPrimary}>
          <Container>
            <Columns isVCentered>
              <Column isSize={5} isOffset={1}>
                <Icon name={Icon.Names.COMMUNITY_CHEST} size={150} />
              </Column>
              <Column isSize={6}>
                <Text size={Text.Sizes.SIZE_24} color={Text.Colors.WHITE}>
                  <strong>Announcement:</strong>{' '}
                  <span style={{ display: 'inline-block' }}>Dec 21st, 2019</span>
                </Text>
                <Text size={Text.Sizes.SIZE_24} color={Text.Colors.WHITE}>
                  <strong>Signups:</strong>{' '}
                  <span style={{ display: 'inline-block' }}>Jan 18th - Feb 1st, 2020</span>
                </Text>
                <Text size={Text.Sizes.SIZE_24} color={Text.Colors.WHITE}>
                  <strong>Run List:</strong> <span style={{ display: 'inline-block' }}>Feb 16th, 2020</span>
                </Text>
                <Text size={Text.Sizes.SIZE_24} color={Text.Colors.WHITE}>
                  <strong>Schedule:</strong> <span style={{ display: 'inline-block' }}>Mar 1st, 2020</span>
                </Text>
                <Text size={Text.Sizes.SIZE_24} color={Text.Colors.WHITE}>
                  <strong>Main Event:</strong>{' '}
                  <span style={{ display: 'inline-block' }}>Mar 27th-29th, 2020</span>
                </Text>
              </Column>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>

      <Container>
        <Section>
          <Header size={Header.Sizes.H1} withMargin>
            Community Chest
          </Header>
          <Text size={Text.Sizes.SIZE_20}>
            Community Chest is our first expansion into new types events. A weekend-long, online speedrunning
            marathon, intended to showcase the excitement that runners and communities have for their games.
          </Text>
          <Text>
            Community Chest is open to everyone, and every game. If you're excited by your speedgame, submit
            it! If you run multiple games, submit them all! If you want to race, get your friends involved! We
            want to give as many people as possible the opportunity to present what they love to the world.
          </Text>
        </Section>
      </Container>

      <LayoutFooter />
    </ThemeProvider>
  );
};

export default The1545;
