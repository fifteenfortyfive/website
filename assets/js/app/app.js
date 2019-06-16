import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'preact-router';
import { createHashHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as EventActions from './actions/events';

import AccountPage from './pages/account-page';
import TeamsPage from './pages/teams-page';
import NotFoundPage from './pages/not-found-page';

class App extends Component {
  componentDidMount() {
    const {currentUserId, eventId, dispatch} = this.props;
    dispatch(EventActions.fetchEvent(eventId));
  }

  render() {
    const {currentUserId, eventId} = this.props;

    return (
      <div>
        <Router>
          <TeamsPage path="/teams" eventId={eventId} />
          <AccountPage path="/accounts/:accountId" />
          <NotFoundPage default />
        </Router>
      </div>
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
