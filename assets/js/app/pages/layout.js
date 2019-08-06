import {h} from 'preact';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';

import {
  Container,
  Section
} from 'bloomer';

const Layout = (props) => {
  const {
    withContainer=true,
    children
  } = props;

  return (
    <div>
      <Navbar />
      { withContainer
        ? <Container>
            <Section>
              {children}
            </Section>
          </Container>
        : children
      }
      <Footer />
    </div>
  );
};

export default Layout;
