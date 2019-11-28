import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Footer, Container, Columns, Column } from 'bloomer';
import BoxLink from '../../../uikit/BoxLink';
import BrandLogo from '../../../uikit/BrandLogo';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';
import Link from '../../../uikit/Link';

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
                  <a href={ExternalRoutes.DISCORD_URL} target="_blank" native>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'discord']} fixedWidth />
                    </span>
                    Discord
                  </a>
                </p>
                <p>
                  <a href={ExternalRoutes.SRCOM_URL} target="_blank" native>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon="trophy" fixedWidth />
                    </span>
                    speedrun.com
                  </a>
                </p>
                <p>
                  <a href={ExternalRoutes.TWITCH_URL} target="_blank" native>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'twitch']} fixedWidth />
                    </span>
                    Twitch
                  </a>
                </p>
                <p>
                  <a href={ExternalRoutes.TWITTER_URL} target="_blank" native>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'twitter']} fixedWidth />
                    </span>
                    Twitter
                  </a>
                </p>
                <p>
                  <a href={ExternalRoutes.YOUTUBE_URL} target="_blank" native>
                    <span class={style.linkIcon}>
                      <FontAwesomeIcon icon={['fab', 'youtube']} fixedWidth />
                    </span>
                    YouTube
                  </a>
                </p>
              </Column>

              <Column isSize="1/2">
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>
                  More Info
                </Header>
                <p>
                  <a href={ExternalRoutes.CONTACT_URL}>Contact</a>
                </p>
                <p>
                  <a href={ExternalRoutes.GITHUB_URL} target="_blank">
                    Software
                  </a>
                </p>
                <p>
                  <a href={Routes.VOLUNTEER}>Volunteer</a>
                </p>
              </Column>

              <Column isSize="1/2">
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>
                  Past Events
                </Header>
                <p>
                  <Link href={Routes.EVENT(16)}>Summer 2019</Link>
                </p>
                <p>
                  <Link href={Routes.EVENT(19)}>Summer 2018</Link>
                </p>
                <p>
                  <Link href={Routes.EVENT(20)}>Summer 2017</Link>
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
              &copy; 2019 <BrandLogo />. Site designed by{' '}
              <a href={ExternalRoutes.GITHUB_FAULTY_URL} native target="_blank">
                faulty
              </a>
              .
            </Text>
          </Column>
        </Columns>
      </Container>
    </Footer>
  );
};

export default LayoutFooter;
