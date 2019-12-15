import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import AdminRouter from './admin/AdminRouter';
import AccountView from './modules/accounts/views/AccountView';
import NewAccountView from './modules/accounts/views/NewAccountView';
import * as AuthActions from './modules/auth/AuthActions';
import * as AuthStore from './modules/auth/AuthStore';
import LoginView from './modules/auth/views/LoginView';
import EventView from './modules/events/views/EventView';
import EventsView from './modules/events/views/EventsView';
import * as MeActions from './modules/me/MeActions';
import * as MeStore from './modules/me/MeStore';
import MeView from './modules/me/views/MeView';
import { history } from './modules/router/RouterUtils';
import StreamsView from './modules/streams/views/StreamsView';
import Submit from './modules/submissions/components/Submit';
import TeamView from './modules/teams/views/TeamView';
import NotFoundPage from './pages/NotFoundPage';
import CommunityChest from './static-pages/CommunityChest';
// import Index from './static-pages/Index';
import The1545 from './static-pages/The1545';
import Volunteer from './static-pages/Volunteer';
import AuthenticatedRoute from './AuthenticatedRoute';

import { CURRENT_EVENT_ID, Routes } from './Constants';

const App = props => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(AuthStore.isLoggedIn);
  const currentUser = useSelector(MeStore.getAccount);

  useEffect(() => {
    dispatch(AuthActions.loadSession());
  }, []);

  useEffect(() => {
    if (isLoggedIn && !currentUser) {
      dispatch(MeActions.fetchMe());
    }
  }, [isLoggedIn, currentUser]);

  return (
    <Router history={history}>
      <Switch>
        <Route path={Routes.HOME} exact component={The1545} />
        <Route path={Routes.VOLUNTEER} component={Volunteer} />
        <Route path={Routes.THE_1545} component={The1545} />
        <Route path={Routes.COMMUNITY_CHEST} component={CommunityChest} />
        <Route path={Routes.LOGIN()} component={LoginView} />

        <Route path={Routes.TEAM(':teamId')}>
          {({ match }) => <TeamView teamId={match.params.teamId} />}
        </Route>
        <Route path={Routes.ACCOUNTS_NEW} component={NewAccountView} />
        <Route path={Routes.ACCOUNT(':accountId')}>
          {({ match }) => <AccountView accountId={match.params.accountId} />}
        </Route>
        <Route path={Routes.STREAMS} component={StreamsView} />

        <AuthenticatedRoute path={Routes.ME}>
          <MeView eventId={CURRENT_EVENT_ID} />
        </AuthenticatedRoute>

        <Route path={Routes.EVENT(':eventId')}>
          {({ match }) => <EventView eventId={match.params.eventId} />}
        </Route>
        <Route exact path={Routes.EVENTS} component={EventsView} />
        <AuthenticatedRoute path={Routes.EVENT_SUBMIT_RUN(':eventId')}>
          {({ match }) => <Submit eventId={match.params.eventId} />}
        </AuthenticatedRoute>

        <AuthenticatedRoute path={Routes.ADMIN_BASE} component={AdminRouter} />

        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
