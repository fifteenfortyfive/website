import { h } from 'preact';
import _ from 'lodash';

import Anchor from '../../../uikit/Anchor';

import { Routes } from '../../../Constants';
import { runTime, fullDate } from '../../../utils/TimeUtils';

import styles from './EventCard.mod.css';

const EventCard = props => {
  const { event, team, runs } = props;

  const startTime = event.start_time;
  const orderedRuns = _.sortBy(runs, run => run.index);

  const color = team && team.color ? `#${team.color}` : 'hsl(0, 0%, 71%)';

  return (
    <div class={styles.card}>
      <div class={styles.header} style={{ backgroundColor: `${color}` }}>
        <div class="is-pulled-right">
          <p>{fullDate(startTime)}</p>
        </div>
        {team && (
          <Anchor href={Routes.TEAM(team.id)}>
            <span class="has-text-weight-bold has-text-white">{team.name}</span>
          </Anchor>
        )}
      </div>

      <div class={styles.body} style={{ border: `3px solid #${color}` }}>
        <h2 class="is-size-5 has-text-weight-bold">{event.name}</h2>

        <table class="table is-fullwidth is-narrow">
          <tbody>
            {_.map(orderedRuns, run => {
              return (
                <tr>
                  <td>
                    {run.game.name} - {run.category.name}
                  </td>
                  <td class="has-text-right">
                    {run.est_seconds && (
                      <span class="has-text-grey-light">{runTime(run.est_seconds)} / </span>
                    )}
                    {run.finished ? (
                      run.actual_seconds ? (
                        runTime(run.actual_seconds)
                      ) : (
                        <span class="has-text-grey-light">No time recorded</span>
                      )
                    ) : (
                      <span class="has-text-grey-light has-text-weight-bold">DNF</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventCard;
