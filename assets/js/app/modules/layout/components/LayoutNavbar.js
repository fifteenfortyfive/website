import { h, Fragment } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { route } from 'preact-router';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AuthActions from '../../auth/AuthActions';
import * as AuthStore from '../../auth/AuthStore';
import * as MeStore from '../../me/MeStore';

import {
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarDivider,
  NavbarDropdown,
  NavbarEnd,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  NavbarStart,
  Button,
  Container,
} from 'bloomer';
import Avatar from '../../../uikit/Avatar';
import BrandLogo from '../../../uikit/BrandLogo';

import { Routes, ExternalRoutes } from '../../../Constants';
import styles from './LayoutNavbar.css';

const LayoutNavbar = props => {
  const { isDark = false, className } = props;

  const [isActive, setIsActive] = useState(false);
  const loggedIn = useSelector(AuthStore.isLoggedIn);
  const user = useSelector(MeStore.getAccount);

  const isAdmin = loggedIn && user != null && user.admin;

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(AuthActions.logout()).then(() => route(Routes.HOME));
  }, [dispatch]);

  return (
    <Navbar
      isTransparent={isDark}
      className={classNames(styles.container, className, { [styles.dark]: isDark })}>
      <Container>
        <NavbarBrand>
          <NavbarItem href={Routes.HOME}>
            <BrandLogo className={styles.brandLogo} color={isDark ? 'white' : 'black'} />
          </NavbarItem>
          <NavbarBurger onClick={() => setIsActive(!isActive)} />
        </NavbarBrand>

        <NavbarMenu isActive={isActive}>
          <NavbarStart>
            <NavbarItem href={Routes.STREAMS}>Streams</NavbarItem>

            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>More</NavbarLink>
              <NavbarDropdown isBoxed>
                <NavbarItem href={ExternalRoutes.CONTACT_URL} native>
                  Contact
                </NavbarItem>
                <NavbarItem href={Routes.VOLUNTEER}>Volunteer</NavbarItem>
              </NavbarDropdown>
            </NavbarItem>

            {isAdmin && (
              <NavbarItem href={Routes.ADMIN_V2} native>
                Admin
              </NavbarItem>
            )}
          </NavbarStart>

          <NavbarEnd>
            {loggedIn && user != null ? (
              <Fragment>
                <NavbarItem hasDropdown isHoverable isPaddingless>
                  <NavbarLink>
                    {user.avatar_hash && (
                      <Avatar className={styles.avatar} src={user.avatar_hash} size={28} />
                    )}
                    {user.username}
                  </NavbarLink>

                  <NavbarDropdown isBoxed>
                    <NavbarItem href={Routes.ME}>Profile</NavbarItem>
                    <NavbarItem href={Routes.ME_EDIT}>Edit Account</NavbarItem>
                    <NavbarDivider />
                    <NavbarItem tag="a" onClick={handleLogout}>
                      Log Out
                    </NavbarItem>
                  </NavbarDropdown>
                </NavbarItem>
              </Fragment>
            ) : (
              <NavbarItem isPaddingless>
                <div class={styles.buttonGroup}>
                  <Button
                    className={styles.navButton}
                    isSize="small"
                    isColor="danger"
                    isOutlined
                    href={Routes.LOGIN()}>
                    Sign In
                  </Button>
                  <Button
                    className={styles.navButton}
                    isSize="small"
                    isColor={isDark ? 'white' : 'dark'}
                    isOutlined
                    href={Routes.ACCOUNTS_NEW}>
                    Create an Account
                  </Button>
                </div>
              </NavbarItem>
            )}

            <div class={styles.divider} />

            <NavbarItem isPaddingless>
              <div class={styles.buttonGroup}>
                <Button
                  isColor={isDark ? 'dark' : 'white'}
                  href={ExternalRoutes.DISCORD_URL}
                  target="_blank"
                  native>
                  <FontAwesomeIcon icon={['fab', 'discord']} />
                </Button>
                <Button
                  isColor={isDark ? 'dark' : 'white'}
                  href={ExternalRoutes.SRCOM_URL}
                  target="_blank"
                  native>
                  <FontAwesomeIcon icon={['fas', 'trophy']} />
                </Button>
                <Button
                  isColor={isDark ? 'dark' : 'white'}
                  href={ExternalRoutes.TWITCH_URL}
                  target="_blank"
                  native>
                  <FontAwesomeIcon icon={['fab', 'twitch']} />
                </Button>
                <Button
                  isColor={isDark ? 'dark' : 'white'}
                  href={ExternalRoutes.TWITTER_URL}
                  target="_blank"
                  native>
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </Button>
                <Button
                  isColor={isDark ? 'dark' : 'white'}
                  href={ExternalRoutes.YOUTUBE_URL}
                  target="_blank"
                  native>
                  <FontAwesomeIcon icon={['fab', 'youtube']} />
                </Button>
              </div>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Container>
    </Navbar>
  );
};

export default LayoutNavbar;