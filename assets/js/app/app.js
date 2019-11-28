import { h } from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';
import { Router, Route, route } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AuthActions from './modules/auth/AuthActions';
import * as AuthStore from './modules/auth/AuthStore';
import * as MeActions from './modules/me/MeActions';
import * as MeStore from './modules/me/MeStore';

import AdminRouter from './admin/router';
import AccountView from './modules/accounts/views/AccountView';
import NewAccountView from './modules/accounts/views/NewAccountView';
import LoginPage from './modules/auth/views/LoginView';
import MeView from './modules/me/views/MeView';
import StreamsView from './modules/streams/views/StreamsView';
import TeamView from './modules/teams/views/TeamView';
import EventView from './modules/events/views/EventView';
import EventsView from './modules/events/views/EventsView';
import Index from './static-pages/index';
import Volunteer from './static-pages/volunteer';
import Submit from './modules/submissions/components/submit';
import NotFoundPage from './pages/not-found-page';

import {CURRENT_EVENT_ID, Routes} from './constants';

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

      <TeamView path={Routes.TEAM(":teamId")} />
      <NewAccountView path={Routes.ACCOUNTS_NEW} />
      <AccountView path={Routes.ACCOUNT(":accountId")} />
      <StreamsView path={Routes.STREAMS} />

      <MeView path="/@me/:page?" eventId={CURRENT_EVENT_ID} needsAuth />

      <EventsView path={Routes.EVENTS} />
      <EventView path={Routes.EVENT(":eventId")} />
      <Submit path={Routes.EVENT_SUBMIT_RUN(":eventId")} needsAuth />

      <AdminRouter path={Routes.ADMIN_BASE} needsAdmin />

      <NotFoundPage default />
    </Router>
  );
}

export default App;
