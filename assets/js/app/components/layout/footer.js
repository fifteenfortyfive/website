import {h} from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Footer,
  Container,
  Columns,
  Column,
} from 'bloomer';
import BoxLink from '../../uikit/box-link';
import BrandLogo from '../../uikit/brand-logo';
import Header from '../../uikit/header';
import Text from '../../uikit/text';
import Link from '../../uikit/link';

import {Routes, ExternalRoutes} from '../../constants';
import style from './footer.css';

const LayoutFooter = (props) => {
  return (
    <Footer className={style.footer}>
      <Container>
        <Columns>
          <Column isSize={6}>
            <Columns isMultiline isMobile>
              <Column isSize="1/2">
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>Social</Header>
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
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>More Info</Header>
                <p>
                  <a href="mailto:{{conn.constants.contact_email}}">Contact</a>
                </p>
                <p>
                  <a href="https://github.com/fifteenfortyfive" target="_blank">Software</a>
                </p>
                <p>
                  <a href="/volunteer" native>Volunteer</a>
                </p>
              </Column>

              <Column isSize="1/2">
                <Header className={style.sectionHeader} size={Header.Sizes.H4}>Past Events</Header>
                <p>
                  <Link href="/events/16">Summer 2019</Link>
                </p>
                <p>
                  <Link href="/events/19">Summer 2018</Link>
                </p>
                <p>
                  <Link href="/events/20">Summer 2017</Link>
                </p>
              </Column>
            </Columns>
          </Column>

          <Column>
            <Header className={style.sectionHeader} size={Header.Sizes.H4}>Other Events</Header>
            <BoxLink
                href="https://twitch.tv/rareware301"
                target="_blank"
                title="Rareware 301"
                className={style.boxLink}
              >
              Banjo Kazooie, Banjo Tooie, and Donkey Kong 64 played to full completion. Hosted annually in January.
            </BoxLink>

            <BoxLink
                href="https://www.twitch.tv/crashmarathon"
                target="_blank"
                title="Crash Marathon"
                className={style.boxLink}
              >
              A marathon dedicated to showcasing the speedruns of the Crash Bandicoot series.
            </BoxLink>

            <BoxLink
                href="https://docs.google.com/spreadsheets/d/1n1bZ8DV7vhFT0X2fLaXpThEZa9M8aNNyIN1SqR8dr-Q/edit?usp=sharing"
                target="_blank"
                title="Sprashfecta"
                className={style.boxLink}
              >
              The original Spyro and Crash trilogies played to full completion. Hosted annually in December.
            </BoxLink>

            <BoxLink
                href="https://spyrothon.marathons.gg"
                target="_blank"
                title="Spyrothon"
                className={style.boxLink}
              >
              The Spyro speedrunning community marathon. Usually hosted at the end of Summer.
            </BoxLink>

            <BoxLink
                href="https://twitch.tv/602Race"
                target="_blank"
                title="Super Mario 602"
                className={style.boxLink}
              >
              Super Mario 64, Sunshine, Galaxy, and Galaxy 2 played to full completion. Hosted every Summer and Winter.
            </BoxLink>
          </Column>
        </Columns>

        <Columns>
          <Column>
            <Text>
              &copy; 2019 <BrandLogo />.
              Site designed by <a href="https://github.com/faultyserver" native target="_blank">faulty</a>.
            </Text>
          </Column>
        </Columns>
      </Container>
    </Footer>

  );
};

export default LayoutFooter;
