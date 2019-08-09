import {h, Fragment} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {connect, useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as MeActions from '../../actions/me';
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
  Buttons,
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
  const user = useSelector(MeStore.getAccount);
  const isAdmin = user && user.admin;

  const dispatch = useDispatch();
  useEffect(() => dispatch(MeActions.fetchMe()), []);

  return (
    <Navbar isTransparent={isDark}>
      <Container>
        <NavbarBrand>
          <NavbarItem href={Routes.HOME} native>
            <BrandLogo className={style.brandLogo} />
          </NavbarItem>
          <NavbarBurger onClick={() => setIsActive(!isActive)} />
        </NavbarBrand>

        <NavbarMenu isActive={isActive}>
          <NavbarStart>
            <NavbarItem href={Routes.TEAMS} native>Teams</NavbarItem>

            <NavbarItem href={Routes.STREAMS}>Streams</NavbarItem>

            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>More</NavbarLink>
              <NavbarDropdown isBoxed>
                <NavbarItem href={ExternalRoutes.CONTACT_URL} native>Contact</NavbarItem>
                <NavbarItem href={Routes.VOLUNTEER} native>Volunteer</NavbarItem>
              </NavbarDropdown>
            </NavbarItem>

            { isAdmin &&
              <NavbarItem hasDropdown isHoverable>
                <NavbarLink href={Routes.ADMIN} native>Admin</NavbarLink>

                <NavbarDropdown isBoxed>
                  <NavbarItem href={Routes.ADMIN_USERS} native>
                    Account Management
                  </NavbarItem>
                  <NavbarItem href={Routes.ADMIN_EVENTS} native>
                    Events
                  </NavbarItem>
                </NavbarDropdown>
              </NavbarItem>
            }
          </NavbarStart>

          <NavbarEnd>
            { user != null
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
                      <NavbarItem href="/signout">Log Out</NavbarItem>
                    </NavbarDropdown>
                  </NavbarItem>

                </Fragment>
              : <NavbarItem isPaddingless>
                  <div class="buttons">
                    <a class="button is-small is-danger is-outlined" href="/signin" native>
                      Sign In
                    </a>
                    <a class="button is-small is-dark is-outlined" href={Routes.ACCOUNTS_NEW} native>
                      Create an Account
                    </a>
                  </div>
                </NavbarItem>
            }

            <div class={style.divider} />

            <NavbarItem isPaddingless>
              <Buttons>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.DISCORD_URL} target="_blank" native>
                  <FontAwesomeIcon icon={['fab', 'discord']}></FontAwesomeIcon>
                </Button>
                <Button isColor={isDark ? 'dark' : 'white'} href={ExternalRoutes.SRCOM_URL} target="_blank" native>
                  <FontAwesomeIcon icon="trophy"></FontAwesomeIcon>
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
              </Buttons>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Container>
    </Navbar>
  );
};

export default LayoutNavbar;
