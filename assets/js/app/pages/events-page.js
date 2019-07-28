import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as EventActions from '../actions/events';
import * as EventStore from '../selectors/events';
import EventCard from '../components/events/event-card';
import Header from '../uikit/header';


class EventsPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(EventActions.fetchEvents());
  }

  render() {
    const {eventIds} = this.props;

    return (
      <div class="container">
        <section class="section">
          <Header size={Header.Sizes.H1}>Events</Header>

          { _.map(eventIds, (eventId) => <EventCard eventId={eventId} />)}
        </section>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    eventIds: EventStore.getEventIds(state, props),
  };
}

export default connect(
  mapStateToProps,
)(EventsPage);
