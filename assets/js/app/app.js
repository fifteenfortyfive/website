import { h } from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';
import { Router, Route, route } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AuthStore from './selectors/auth';
import * as MeStore from './selectors/me';
import * as AuthActions from './actions/auth';
import * as MeActions from './actions/me';

import AdminRouter from './admin/router';
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
import Submit from './modules/submissions/components/submit';
import NotFoundPage from './pages/not-found-page';

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

      <TeamPage path={Routes.TEAM(":teamId")} />
      <AccountsNewPage path={Routes.ACCOUNTS_NEW} />
      <AccountPage path={Routes.ACCOUNT(":accountId")} />
      <StreamsPage path={Routes.STREAMS} />

      <MePage path="/@me/:page?" needsAuth />

      <EventsPage path={Routes.EVENTS} />
      <EventPage path={Routes.EVENT(":eventId")} />
      <Submit path={Routes.EVENT_SUBMIT_RUN(":eventId")} needsAuth />

      <AdminRouter path={Routes.ADMIN_BASE} needsAdmin />

      <NotFoundPage default />
    </Router>
  );
}

export default App;
