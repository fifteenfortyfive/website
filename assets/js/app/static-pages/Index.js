import { h } from 'preact';

import Layout from '../modules/layout/components/Layout';
import { GridLayout, GridCell } from '../uikit/GridLayout';
import Text from '../uikit/Text';
import Icon from '../uikit/Icon';
import ThemeProvider from '../uikit/ThemeProvider';

import styles from './Index.mod.css';

const Index = props => {
  return (
    <ThemeProvider>
      <Layout>
        <GridLayout>
          <GridCell span={7}>
            <div className={styles.logo}>
              <Icon className={styles.logoImage} name={Icon.Names.MCSN} look="full" />
            </div>
          </GridCell>

          <GridCell span={1} spanMobile={0} />
          <GridCell span={8}>
            <Text size={Text.Sizes.SIZE_20}>
              Multi-Community Speedrun Network is a group dedicated to putting on speedrunning events that
              showcase a variety of games and highlight the communities around them.
            </Text>
          </GridCell>
        </GridLayout>

        <div className={styles.events}>
          <div className={styles.event}>
            <Icon className={styles.eventLogo} name={Icon.Names.THE_1545} />
            <Text>
              The event that started it all in 2017, The 1545 is a massive relay race of Mario, Crash, Banjo,
              Spyro, and Donkey Kong games. Teams compete over the course of an entire weekend to complete all
              13 games to 100% as quickly as possible.
            </Text>
          </div>
          <div className={styles.event}>
            <Icon className={styles.eventLogo} name={Icon.Names.MCSN} look="monotone" />
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
