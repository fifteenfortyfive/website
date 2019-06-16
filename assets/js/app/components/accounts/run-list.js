import {h} from 'preact';
import _ from 'lodash';

import EventCard from './event-card';

const RunList = (props) => {
  const {
    runs
  } = props;

  const events = _.chain(runs)
      .map('event')
      .uniqBy('id')
      .sortBy('start_time')
      .reverse()
      .value();

  const teams = _.chain(runs)
      .map('team')
      .keyBy('id')
      .value();

  const runsByEvent = _.groupBy(runs, 'event_id');

  return (
    <div class="run-list">
      { _.map(events, (event) => {
          const runs = runsByEvent[event.id];
          return <EventCard event={event} team={teams[runs[0].team_id]} runs={runs} />;
        })
      }
    </div>
  );
}

export default RunList;


