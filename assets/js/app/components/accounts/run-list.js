import {h} from 'preact';
import _ from 'lodash';

import EventCard from './event-card';

const RunList = (props) => {
  const {
    runs
  } = props;

  const events = _.chain(runs)
      .map('event')
      .keyBy('id')
      .value();

  const teams = _.chain(runs)
      .map('team')
      .keyBy('id')
      .value();

  const runsByEvent = _.groupBy(runs, 'event_id');

  return (
    <div class="run-list">
      { _.map(runsByEvent, (runs, eventId) => {
          return <EventCard event={events[eventId]} team={teams[runs[0].team_id]} runs={runs} />;
        })
      }
    </div>
  );
}

export default RunList;


