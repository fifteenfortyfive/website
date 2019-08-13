import {h, Fragment} from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {connect, useDispatch, useSelector} from 'react-redux';
import {route} from 'preact-router';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AuthActions from '../../actions/auth';
import * as MeActions from '../../actions/me';
import * as AuthStore from '../../selectors/auth';
import * as MeStore from '../../selectors/me';

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
  Container
} from 'bloomer';
import Avatar from '../../uikit/avatar';
import BrandLogo from '../../uikit/brand-logo';

import {Routes, ExternalRoutes} from '../../constants';
import style from './navbar.css';

const LayoutNavbar = (props) => {
  const {
    isDark=false,
    className
  } = props;

  const [isActive, setIsActive] = useState(false);
  const loggedIn = useSelector(AuthStore.isLoggedIn);
  const user = useSelector(MeStore.getAccount);

  const isAdmin = loggedIn && user != null && user.admin;

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(AuthActions.logout())
      .then(() => route(Routes.HOME));
  }, [dispatch]);

  return (
    <Navbar isTransparent={isDark}>
      <Container>
        <NavbarBrand>
          <NavbarItem href={Routes.HOME}>
            <BrandLogo className={style.brandLogo} />
          </NavbarItem>
          <NavbarBurger onClick={() => setIsActive(!isActive)} />
        </NavbarBrand>

        <NavbarMenu isActive={isActive}>
          <NavbarStart>
            <NavbarItem href={Routes.TEAMS}>Teams</NavbarItem>

            <NavbarItem href={Routes.STREAMS}>Streams</NavbarItem>

            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>More</NavbarLink>
              <NavbarDropdown isBoxed>
                <NavbarItem href={ExternalRoutes.CONTACT_URL} native>Contact</NavbarItem>
                <NavbarItem href={Routes.VOLUNTEER}>Volunteer</NavbarItem>
              </NavbarDropdown>
            </NavbarItem>

            { isAdmin &&
              <NavbarItem href={Routes.ADMIN_V2} native>Admin</NavbarItem>
            }
          </NavbarStart>

          <NavbarEnd>
            { loggedIn && user != null
              ? <Fragment>
                  <NavbarItem hasDropdown isHoverable isPaddingless>
                    <NavbarLink>
                      { user.avatar_hash &&
                        <Avatar
                          className={style.avatar}
                          src={user.avatar_hash}
                          size={28}
                        />
                      }
                      { user.username}
                    </NavbarLink>

                    <NavbarDropdown isBoxed>
                      <NavbarItem href={Routes.ME}>Profile</NavbarItem>
                      <NavbarItem href={Routes.ME_EDIT}>Edit Account</NavbarItem>
                      <NavbarDivider />
                      <NavbarItem tag="a" onClick={handleLogout}>Log Out</NavbarItem>
                    </NavbarDropdown>
                  </NavbarItem>

                </Fragment>
              : <NavbarItem isPaddingless>
                  <div class={style.buttonGroup}>
                    <Button className={style.navButton} isSize="small" isColor="danger" isOutlined href={Routes.LOGIN()}>
                      Sign In
                    </Button>
                    <Button className={style.navButton} isSize="small" isColor={isDark ? 'white' : 'dark'} isOutlined href={Routes.ACCOUNTS_NEW}>
                      Create an Account
                    </Button>
                  </div>
                </NavbarItem>
            }

            <div class={style.divider} />

            <NavbarItem isPaddingless>
              <div class={style.buttonGroup}>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.DISCORD_URL} target="_blank" native>
                  <FontAwesomeIcon icon={['fab', 'discord']}></FontAwesomeIcon>
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.SRCOM_URL} target="_blank" native>
                  <FontAwesomeIcon icon={['fas', 'trophy']}></FontAwesomeIcon>
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.TWITCH_URL} target="_blank" native>
                  <FontAwesomeIcon icon={['fab', 'twitch']}></FontAwesomeIcon>
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.TWITTER_URL} target="_blank" native>
                  <FontAwesomeIcon icon={['fab', 'twitter']}></FontAwesomeIcon>
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.YOUTUBE_URL} target="_blank" native>
                  <FontAwesomeIcon icon={['fab', 'youtube']}></FontAwesomeIcon>
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
