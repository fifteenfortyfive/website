import { h } from 'preact';
import _ from 'lodash';

import EventCard from './EventCard';

const RunList = props => {
  const { runs } = props;

  const events = _.flow([
    _.partialRight(_.map, 'event'),
    _.partialRight(_.uniqBy, 'id'),
    _.partialRight(_.sortBy, 'start_time'),
    _.reverse,
  ])(runs);

  const teams = _.flow([_.partialRight(_.map, 'team'), _.partialRight(_.keyBy, 'id')])(runs);

  const runsByEvent = _.groupBy(runs, 'event_id');

  return (
    <div class="run-list">
      {_.map(events, event => {
        const runs = runsByEvent[event.id];
        return <EventCard event={event} team={teams[runs[0].team_id]} runs={runs} />;
      })}
    </div>
  );
};

export default RunList;
