import {h, Component} from 'preact';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as EventActions from '../actions/events';
import * as TeamActions from '../actions/teams';
import * as EventStore from '../selectors/events';
import * as FetchStore from '../selectors/fetch';

import Container from '../uikit/container';
import Header from '../uikit/header';
import Text from '../uikit/text';

import {fullDate} from '../util';

class EventPage extends Component {
  componentDidMount() {
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

    const {
      name,
      series,
      summary,
      start_time
    } = event;

    return (
      <Container>
        <Header>{name}</Header>
        <Text size={Text.Sizes.SIZE_20}>
          { series && `${series.name} - `}
          Starts {fullDate(start_time)}
        </Text>
        <Text>
          {summary}
        </Text>
        { _.map(teams, (team) => <p>{team.name}</p>) }
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
