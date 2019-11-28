import {h} from 'preact';

import LayoutNavbar from './LayoutNavbar';
import LayoutFooter from './LayoutFooter';

import {
  Container,
  Section
} from 'bloomer';

import style from './Layout.css';

const Layout = (props) => {
  const {
    withContainer=true,
    children,
  } = props;

  return (
    <div>
      <LayoutNavbar />
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
      <LayoutFooter />
    </div>
  );
};

export default Layout;
