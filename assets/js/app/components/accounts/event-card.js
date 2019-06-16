import {h} from 'preact';
import _ from 'lodash';

import {runTime} from '../../util';

const EventCard = (props) => {
  const {
    event,
    team,
    runs
  } = props;

  const orderedRuns = _.sortBy(runs, (run) => run.index);


  return (
    <div class="box has-margin-bottom-md">
      <h2 class="title is-5">{event.name}</h2>
      { team &&
        <p class="subtitle is-6" style={{color: `#${team.color}`}}>Run for {team.name}</p>
      }

      { _.map(orderedRuns, (run) => {
          return (
            <div>{run.game.name} - {runTime(run.est_seconds)}</div>
          );
        })
      }
    </div>
  );
}

export default EventCard;


