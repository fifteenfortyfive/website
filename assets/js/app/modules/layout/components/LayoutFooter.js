import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Footer, Container, Columns, Column } from 'bloomer';
import Anchor from '../../../uikit/Anchor';
import BoxLink from '../../../uikit/BoxLink';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';

import { Routes, ExternalRoutes } from '../../../Constants';
import style from './LayoutFooter.css';

const LayoutFooter = props => {
  return (
    <Footer className={style.footer}>
      <Container>
        <Columns>
          <Column isSize={6}>
            <Columns isMultiline isMobile>
              <Column isSize="1/2">
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>
                  Social
                </Header>
                <p>
                  <Anchor href={ExternalRoutes.DISCORD_URL}>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'discord']} fixedWidth />
                    </span>
                    Discord
                  </Anchor>
                </p>
                <p>
                  <Anchor href={ExternalRoutes.SRCOM_URL}>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon="trophy" fixedWidth />
                    </span>
                    speedrun.com
                  </Anchor>
                </p>
                <p>
                  <Anchor href={ExternalRoutes.TWITCH_URL}>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'twitch']} fixedWidth />
                    </span>
                    Twitch
                  </Anchor>
                </p>
                <p>
                  <Anchor href={ExternalRoutes.TWITTER_URL}>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'twitter']} fixedWidth />
                    </span>
                    Twitter
                  </Anchor>
                </p>
                <p>
                  <Anchor href={ExternalRoutes.YOUTUBE_URL}>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'youtube']} fixedWidth />
                    </span>
                    YouTube
                  </Anchor>
                </p>
              </Column>

              <Column isSize="1/2">
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>
                  More Info
                </Header>
                <p>
                  <Anchor href={ExternalRoutes.CONTACT_URL}>Contact</Anchor>
                </p>
                <p>
                  <Anchor href={ExternalRoutes.GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    Software
                  </Anchor>
                </p>
                <p>
                  <Anchor href={Routes.VOLUNTEER}>Volunteer</Anchor>
                </p>
              </Column>

              <Column isSize="1/2">
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>
                  Past Events
                </Header>
                <p>
                  <Anchor href={Routes.EVENT(16)}>Summer 2019</Anchor>
                </p>
                <p>
                  <Anchor href={Routes.EVENT(19)}>Summer 2018</Anchor>
                </p>
                <p>
                  <Anchor href={Routes.EVENT(20)}>Summer 2017</Anchor>
                </p>
              </Column>
            </Columns>
          </Column>

          <Column>
            <Header className={style.sectionHeader} size={Header.Sizes.H4}>
              Other Events
            </Header>
            <BoxLink
              href={ExternalRoutes.RAREWARE_301_URL}
              target="_blank"
              title="Rareware 301"
              className={style.boxLink}>
              Banjo Kazooie, Banjo Tooie, and Donkey Kong 64 played to full completion. Hosted annually in
              January.
            </BoxLink>

            <BoxLink
              href={ExternalRoutes.CRASH_MARATHON_URL}
              target="_blank"
              title="Crash Marathon"
              className={style.boxLink}>
              A marathon dedicated to showcasing the speedruns of the Crash Bandicoot series.
            </BoxLink>

            <BoxLink
              href={ExternalRoutes.SPRASHFECTA_URL}
              target="_blank"
              title="Sprashfecta"
              className={style.boxLink}>
              The original Spyro and Crash trilogies played to full completion. Hosted annually in December.
            </BoxLink>

            <BoxLink
              href={ExternalRoutes.SPYROTHON_URL}
              target="_blank"
              title="Spyrothon"
              className={style.boxLink}>
              The Spyro speedrunning community marathon. Usually hosted at the end of Summer.
            </BoxLink>

            <BoxLink
              href={ExternalRoutes.MARIO_602_URL}
              target="_blank"
              title="Super Mario 602"
              className={style.boxLink}>
              Super Mario 64, Sunshine, Galaxy, and Galaxy 2 played to full completion. Hosted every Summer
              and Winter.
            </BoxLink>
          </Column>
        </Columns>

        <Columns>
          <Column>
            <Text>
              &copy; 2019 <strong>MCSN</strong>. Site designed by{' '}
              <Anchor href={ExternalRoutes.GITHUB_FAULTY_URL}>faulty</Anchor>.
            </Text>
          </Column>
        </Columns>
      </Container>
    </Footer>
  );
};

export default LayoutFooter;
