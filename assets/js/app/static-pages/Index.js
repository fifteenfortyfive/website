import { h } from 'preact';

import Layout from '../modules/layout/components/Layout';
import Anchor from '../uikit/Anchor';
import Header from '../uikit/Header';
import Icon from '../uikit/Icon';
import Text from '../uikit/Text';
import ThemeProvider from '../uikit/ThemeProvider';

import { Container, Columns, Column } from 'bloomer';
import { Routes } from '../Constants';
import styles from './Index.mod.css';

const Index = props => {
  return (
    <ThemeProvider>
      <Layout>
        <Container>
          <Columns>
            <Column isSize={5}>
              <div className={styles.logo}>
                <Icon className={styles.logoImage} name={Icon.Names.MCSN} look="full" />
              </div>
            </Column>
            <Column isSize={7}>
              <Text size={Text.Sizes.SIZE_20}>
                Multi-Community Speedrun Network is a group dedicated to putting on speedrunning events that
                showcase a variety of games and highlight the communities around them.
              </Text>
            </Column>
          </Columns>

          <hr />

          <div className={styles.events}>
            <Header className={styles.eventsHeader} size={Header.Sizes.H1}>
              Our Events
            </Header>
            <Columns className={styles.event}>
              <Column isSize={3}>
                <Anchor href={Routes.THE_1545}>
                  <Icon className={styles.eventLogo} name={Icon.Names.THE_1545} />
                </Anchor>
              </Column>
              <Column>
                <Text>
                  Now in it's fourth year, The 1545 is a massive relay race of Mario, Crash, Banjo, Spyro, and
                  Donkey Kong games. Teams compete over the course of an entire weekend to complete all 13
                  games to 100% as quickly as possible.
                </Text>
              </Column>
            </Columns>
            <Columns className={styles.event}>
              <Column isSize={3}>
                <Anchor href={Routes.COMMUNITY_CHEST}>
                  <Icon className={styles.eventLogo} name={Icon.Names.COMMUNITY_CHEST} />
                </Anchor>
              </Column>
              <Column>
                <Text>
                  Community Chest is our first expansion into new types events. A weekend-long traditional
                  marathon intended to give runners an opportunity to share their excitement for speedrunning.
                </Text>
              </Column>
            </Columns>
          </div>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
