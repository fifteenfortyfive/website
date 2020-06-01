import { h, Fragment } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AuthActions from '../../auth/AuthActions';
import * as AuthStore from '../../auth/AuthStore';
import * as MeStore from '../../me/MeStore';
import * as RouterUtils from '../../router/RouterUtils';

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
import Anchor from '../../../uikit/Anchor';
import Avatar from '../../../uikit/Avatar';
import BrandLogo from '../../../uikit/BrandLogo';

import { Routes, ExternalRoutes } from '../../../Constants';
import styles from './LayoutNavbar.mod.css';

const LayoutNavbar = props => {
  const { isDark = false, className } = props;

  const [isActive, setIsActive] = useState(false);
  const loggedIn = useSelector(AuthStore.isLoggedIn);
  const user = useSelector(MeStore.getAccount);

  const isAdmin = loggedIn && user != null && user.admin;

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(AuthActions.logout()).then(() => RouterUtils.navigateTo(Routes.HOME));
  }, [dispatch]);

  return (
    <Navbar
      isTransparent={isDark}
      className={classNames(styles.container, className, { [styles.dark]: isDark })}>
      <Container>
        <NavbarBrand>
          <Anchor className="navbar-item" href={Routes.HOME}>
            <BrandLogo className={styles.brandLogo} size={20} />
          </Anchor>
          <NavbarBurger onClick={() => setIsActive(!isActive)} />
        </NavbarBrand>

        <NavbarMenu isActive={isActive}>
          <NavbarStart>
            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>Events</NavbarLink>
              <NavbarDropdown isBoxed>
                <Anchor className="navbar-item" href={Routes.THE_1545}>
                  The 1545
                </Anchor>
                <Anchor className="navbar-item" href={Routes.EVENT(24)}>
                  The 1545 - Summer 2020
                </Anchor>
              </NavbarDropdown>
            </NavbarItem>
            <Anchor className="navbar-item" href={Routes.STREAMS}>
              Streams
            </Anchor>

            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>More</NavbarLink>
              <NavbarDropdown isBoxed>
                <Anchor className="navbar-item" href={ExternalRoutes.CONTACT_URL}>
                  Contact
                </Anchor>
                <Anchor className="navbar-item" href={Routes.VOLUNTEER}>
                  Volunteer
                </Anchor>
              </NavbarDropdown>
            </NavbarItem>

            {isAdmin && (
              <Anchor className="navbar-item" href={Routes.ADMIN_BASE}>
                Admin
              </Anchor>
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
                    <Anchor className="navbar-item" href={Routes.ME}>
                      Profile
                    </Anchor>
                    <Anchor className="navbar-item" href={Routes.ME_EDIT}>
                      Edit Account
                    </Anchor>
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
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.DISCORD_URL} target="_blank">
                  <FontAwesomeIcon icon={['fab', 'discord']} />
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.SRCOM_URL} target="_blank">
                  <FontAwesomeIcon icon={['fas', 'trophy']} />
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.TWITCH_URL} target="_blank">
                  <FontAwesomeIcon icon={['fab', 'twitch']} />
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.TWITTER_URL} target="_blank">
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.YOUTUBE_URL} target="_blank">
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
