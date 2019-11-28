import { h, Component } from 'preact';
import _ from 'lodash';
import Duration from 'luxon/src/duration';

const RunCell = props => {
  const { run, runner, submission, games } = props;

  if (run == null) return null;

  console.log(games);

  const game = games[run.game_id];
  const pb = Duration.fromMillis(run.pb_seconds * 1000).toFormat('hh:mm:ss');
  const est = Duration.fromMillis(run.est_seconds * 1000).toFormat('hh:mm:ss');
  const pairs = _.flow([p => _.split(p, ','), _.filter, p => _.map(_.trim)])(submission.pair_with);
  const avoids = _.flow([a => _.split(a, ','), _.filter, a => _.map(_.trim)])(submission.pair_with);

  return (
    <div class="has-hover-card">
      <strong>{pb}</strong>
      <br />
      <strong class="has-text-grey-light">{est}</strong>

      <div class="hover-card-container">
        <div class="hover-card">
          <div class="verti-flex">
            <div class="has-margin-bottom-sm">
              <strong class="header">Run</strong>
              <p>
                <strong>
                  {pb}
                  <span class="has-text-grey-light"> / {est}</span>
                </strong>
              </p>
              <p>{game.name}</p>
            </div>

            <div class="has-margin-bottom-sm">
              <strong class="header">Runner</strong>
              <p>
                <strong>{runner.username}</strong>
              </p>
              <p>
                <small>
                  {runner.discord_username}#{runner.discord_discriminator}
                </small>
              </p>
              {runner.timezone && (
                <p>
                  <small>Timezone: {runner.timezone}</small>
                </p>
              )}
              {submission.captain && (
                <p>
                  <small>Willing to be Captain</small>
                </p>
              )}
            </div>

            <div class="has-margin-bottom-sm">
              <strong class="header">Pairing</strong>
              {pairs.length > 0 ? (
                <p>
                  Pair With:
                  <ul>
                    {_.map(pairs, pair => (
                      <li>&ndash; {pair}</li>
                    ))}
                  </ul>
                </p>
              ) : (
                <p>
                  <em>No pairing requests</em>
                </p>
              )}
              {avoids.length > 0 ? (
                <p>
                  Avoid:
                  <ul>
                    {_.map(avoids, avoid => (
                      <li>&ndash; {avoid}</li>
                    ))}
                  </ul>
                </p>
              ) : (
                <p>
                  <em>No avoid requests</em>
                </p>
              )}
            </div>

            <div class="has-margin-bottom-sm">
              <strong class="header">Ranking</strong>
              <ul>
                {_.map(submission.run_submissions, subRun => {
                  const game = games[subRun.game_id];
                  const isThisGame = subRun.game_id == run.game_id;
                  return (
                    <li class={isThisGame ? 'has-text-weight-bold' : ''}>
                      <strong>{subRun.rank} - </strong>
                      {game ? game.name : subRun.game_id}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div class="has-margin-bottom-sm">
              <strong class="header">Limits</strong>
              <p>Max Games: {submission.max_games || 'No limit'}</p>
              <p>Max Time: {submission.max_time || 'No limit'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunCell;
