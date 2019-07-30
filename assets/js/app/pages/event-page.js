import {h, Component} from 'preact';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as EventActions from '../actions/events';
import * as TeamActions from '../actions/teams';
import * as EventStore from '../selectors/events';
import * as FetchStore from '../selectors/fetch';

import {
  Columns,
  Column,
  Heading,
} from 'bloomer';
import EventHeader from '../components/events/event-header';
import Team from '../components/events/team';
import Container from '../uikit/container';
import Header from '../uikit/header';
import Text from '../uikit/text';

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

    if(loading || event == null) return <Container>Loading</Container>;

    return (
      <Container>
        <EventHeader event={event} />

        <Columns isMultiline>
          { _.map(teams, (team) => (team &&
              <Column isSize={3}>
                <Team team={team}></Team>
              </Column>
            ))
          }
        </Columns>
      </Container>
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
