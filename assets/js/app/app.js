import { h } from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';
import { Router, route } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AuthStore from './selectors/auth';
import * as MeStore from './selectors/me';
import * as AuthActions from './actions/auth';
import * as MeActions from './actions/me';

import AccountPage from './pages/account-page';
import AccountsNewPage from './pages/accounts-new-page';
import MePage from './pages/me-page';
import StreamsPage from './pages/streams-page';
import TeamPage from './pages/team-page';
import EventPage from './pages/event-page';
import EventsPage from './pages/events-page';
import LoginPage from './pages/login-page';
import Index from './static-pages/index';
import Volunteer from './static-pages/volunteer';
import NotFoundPage from './pages/not-found-page';

import AdminIndex from './modules/admin/components/index';

import {Routes} from './constants';

const App = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(AuthStore.isLoggedIn);
  const currentUser = useSelector(MeStore.getAccount);

  useEffect(() => {
    dispatch(AuthActions.loadSession());
  }, []);

  useEffect(() => {
    if(isLoggedIn && !currentUser) {
      dispatch(MeActions.fetchMe());
    }
  }, [isLoggedIn, currentUser]);


  const handleRouteChange = useCallback((e) => {
    const {url, current: requestedRoute} = e;
    const {needsAuth, needsAdmin} = requestedRoute.props;
    const isAdmin = currentUser && currentUser.admin;

    if(needsAuth && !isLoggedIn) route(Routes.LOGIN({redirect: url}), true);
    if(needsAdmin && !isAdmin) route(Routes.LOGIN({redirect: url}), true);
  }, [isLoggedIn, currentUser]);

  return (
    <Router onChange={handleRouteChange}>
      <Index path={Routes.HOME} exact />
      <Volunteer path={Routes.VOLUNTEER} />
      <LoginPage path={Routes.LOGIN()} />

      <TeamPage path="/teams/:teamId" />
      <EventsPage path={Routes.EVENTS} />
      <EventPage path="/events/:eventId" />
      <AccountsNewPage path={Routes.ACCOUNTS_NEW} />
      <AccountPage path="/accounts/:accountId" />
      <StreamsPage path={Routes.STREAMS} />

      <MePage path="/@me/:page?" needsAuth />

      <AdminIndex path={Routes.ADMIN} needsAdmin />
      <AdminIndex path={Routes.ADMIN_EVENT} needsAdmin />

      <NotFoundPage default />
    </Router>
  );
}

export default App;
