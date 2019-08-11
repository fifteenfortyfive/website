import { h, render, Component } from 'preact';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from 'preact-router';
import { Match } from 'preact-router/match';
import { createHashHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AuthActions from './actions/auth';
import * as EventActions from './actions/events';
import * as MeActions from './actions/me';

import AccountPage from './pages/account-page';
import MePage from './pages/me-page';
import StreamsPage from './pages/streams-page';
import TeamPage from './pages/team-page';
import EventPage from './pages/event-page';
import EventsPage from './pages/events-page';
import LoginPage from './pages/login-page';
import Index from './static-pages/index';
import Volunteer from './static-pages/volunteer';
import NotFoundPage from './pages/not-found-page';

class App extends Component {
  componentDidMount() {
    const {currentUserId, eventId, dispatch} = this.props;
    dispatch(AuthActions.loadSession());
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(MeActions.fetchMe());
  }

  render() {
    const {currentUserId, eventId} = this.props;

    return (
      <Router>
        <Index path="/" exact />
        <TeamPage path="/teams/:teamId" />
        <EventsPage path="/events" />
        <EventPage path="/events/:eventId" />
        <AccountPage path="/accounts/:accountId" currentUserId={currentUserId} />
        <MePage path="/@me/:page?" eventId={eventId} />
        <StreamsPage path="/streams" />
        <LoginPage path="/login" />
        <Volunteer path="/volunteer" />
        <NotFoundPage default />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  currentUserId: window.currentUserId,
  eventId: window.mainEventId,
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
