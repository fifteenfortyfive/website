import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../../../uikit/Header';
import Layout from '../../layout/components/Layout';
import * as EventActions from '../EventActions';
import * as EventStore from '../EventStore';
import EventCard from '../components/EventCard';


class EventsView extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(EventActions.fetchEvents());
  }

  render() {
    const {eventIds} = this.props;

    return (
      <Layout>
        <Header size={Header.Sizes.H1}>Events</Header>

        { _.map(eventIds, (eventId) => <EventCard eventId={eventId} />)}
      </Layout>
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
)(EventsView);
