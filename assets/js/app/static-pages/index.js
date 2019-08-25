import {h, Fragment} from 'preact';
import {Link} from 'preact-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Footer from '../components/layout/footer';
import Navbar from '../components/layout/navbar';

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
import BrandLogo from '../uikit/brand-logo';
import Button from '../uikit/button';

import {Routes} from '../constants';
import style from './index.css';

const Index = (props) => {
  return (
    <Fragment>
      <Hero className={style.splash} isColor="dark" isFullHeight>
        <HeroHeader>
          <Navbar isDark />
        </HeroHeader>

        <HeroBody className={style.splashPrimary}>
          <Container className={style.textCentered}>
            <BrandLogo className={style.brandLogo} />
            <h2 class={style.subtitle}>
              Any% Relay - September 21st, 2019
            </h2>
            <div class={style.heroActions} />
          </Container>
        </HeroBody>

        <HeroFooter className={style.heroFoot}>
          <Container className={style.textCentered}>
            <FontAwesomeIcon size="large" icon="arrow-circle-down" />
          </Container>
        </HeroFooter>
      </Hero>


      <Section>
        <Container>
          <Content>
            <Columns isDesktop>
              <Column size={7}>
                <h1 class="title">The Relay</h1>
                <p class="is-size-4">The 1545 is a massive annual speedrunning relay race where teams of runners will complete the Super Mario 602, the Rareware 301%, and the Sprashfecta, all in a row, back to back to back.</p>
                <p>Every year, dozens of runners from the three communities come together in one of the largest single races in speedrunning to date. Last year, more than 70 runners took part, with times averaging just over 50 hours per team.</p>
              </Column>

              <Column size={5}>
                <h1 class="title">Summer 2019</h1>
                <p>This year's event schedule is now live. Check out the <a href="/events">Event Calendar</a> for more details on signups, team announcements, and all of the other events we have planned for this year!</p>
                <p>Follow us on <a href="https://twitter.com/The_1545">Twitter</a> to keep up with these and other updates throughout the year.</p>
              </Column>
            </Columns>
          </Content>
        </Container>
      </Section>

      <Footer />
    </Fragment>
  );
}

export default Index;
