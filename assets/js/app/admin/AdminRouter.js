import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Route, Switch } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import RouterUtils from '../modules/router/RouterUtils';
import AdminIndex from './pages/AdminIndex';
import Accounts from './modules/accounts/components/Accounts';
import Event from './modules/events/components/Event';
import Events from './modules/events/components/Events';
import SchedulingEvent from './modules/scheduling/components/SchedulingEvent';

import { Routes } from '../Constants';

export const AdminRoutes = {
  HOME: '/admin',
  EVENTS: '/admin/events',
  EVENT: ({ eventId }) => `/admin/events/${eventId}`,
  EVENT_SCHEDULING: ({ eventId }) => `/admin/events/${eventId}/schedule`,
  ACCOUNTS: '/admin/accounts',
};

const AdminRouter = () => {
  const { isLoggedIn, account, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      RouterUtils.navigateTo(Routes.LOGIN, { replace: false });
      return;
    }

    if (isLoaded && account != null && !account.admin) {
      RouterUtils.navigateTo(Routes.HOME, { replace: true });
    }
  }, [isLoggedIn, account, isLoaded]);

  return (
    <Switch>
      <Route exact path={AdminRoutes.HOME} component={AdminIndex} />
      <Route exact path={AdminRoutes.EVENTS} component={Events} />
      <Route exact path={AdminRoutes.EVENT({ eventId: ':eventId' })}>
        {({ match }) => <Event eventId={match.params.eventId} />}
      </Route>
      <Route path={AdminRoutes.EVENT_SCHEDULING({ eventId: ':eventId' })}>
        {({ match }) => <SchedulingEvent eventId={match.params.eventId} />}
      </Route>
      <Route exact path={AdminRoutes.ACCOUNTS} component={Accounts} />
    </Switch>
  );
};

export default AdminRouter;
