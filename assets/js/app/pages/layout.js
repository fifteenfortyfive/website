import {h} from 'preact';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';

import {
  Container,
  Section
} from 'bloomer';

import style from './layout.css';

const Layout = (props) => {
  const {
    withContainer=true,
    children
  } = props;

  return (
    <div>
      <Navbar />
      <div class={style.body}>
        { withContainer
          ? <Container>
              <Section>
                {children}
              </Section>
            </Container>
          : children
        }
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
