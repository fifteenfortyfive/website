import {h, Component} from 'preact';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as EventActions from '../actions/events';
import * as TeamActions from '../modules/teams/TeamActions';
import * as EventStore from '../selectors/events';
import * as FetchStore from '../selectors/fetch';

import {
  Columns,
  Column,
  Heading,
} from 'bloomer';
import EventHeader from '../components/events/event-header';
import Team from '../components/events/team';
import Header from '../uikit/header';
import Text from '../uikit/text';
import Layout from './layout';

class EventPage extends Component {
  componentDidMount() {
    const { eventId, dispatch } = this.props;
    this.fetchEvent();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.eventId != this.props.eventId) {
      this.fetchEvent();
    }
  }

  fetchEvent() {
    const { eventId, dispatch } = this.props;
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(TeamActions.fetchTeams({eventId}));
  }

  render() {
    const {
      event,
      teams = [],
      loading
    } = this.props;

    if(loading || event == null) return <Layout>Loading</Layout>;

    return (
      <Layout>
        <EventHeader event={event} />

        <Columns isMultiline>
          { _.map(teams, (team) => (team &&
              <Column isSize={3}>
                <Team team={team}></Team>
              </Column>
            ))
          }
        </Columns>
      </Layout>
    );
  }
};

function mapStateToProps(state, props) {
  return {
    event: EventStore.getEvent(state, props),
    teams: EventStore.getEventTeams(state, props),
    loading: FetchStore.isFetching(state, {fetchGroup: `events.${props.eventId}`})
  }
}

export default connect(
  mapStateToProps
)(EventPage);
