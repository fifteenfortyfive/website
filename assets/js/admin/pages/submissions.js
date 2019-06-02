import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { Link } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import Duration from 'luxon/src/duration';

import Table, { ReactTableDefaults } from 'react-table';

import * as Actions from '../actions';


const SubmissionsPage = ({event, accounts, games, loading}) => {
  if(loading || event == null) return <h1 class="title">Loading...</h1>;

  const {name, runner_submissions} = event;

  const submissionsByAccount = _.keyBy(runner_submissions, 'account_id');

  const allRuns = _.reduce(runner_submissions, (acc, submission) => {
    return acc.concat(submission.run_submissions);
  }, []);

  const gameColumns = _.map(games, (game, gameId) => ({
    Header: game.name,
    id: `game-${gameId}`,
    accessor: sub => {
      const run = _.find(sub.run_submissions, (g) => g.game_id == gameId);
      return run
        ? Duration.fromMillis(run.pb_seconds * 1000).toFormat("hh:mm:ss")
        : null;
    }
  }));

  const columns = [
    {
      Header: 'Runner',
      id: 'runner',
      accessor: run => accounts[run.account_id].username,
      Cell: ({original: run}) => {
        const runner = accounts[run.account_id];
        const submission = submissionsByAccount[run.account_id];
        return (
          <div>
            <strong>{runner.username}</strong>
            <br />
            <small>{submission.max_games} Games / {submission.max_time}</small>
          </div>
        );
      }
    },
    ...gameColumns
  ];

  return (
    <div>
      <div class="container">
        <section class="section">
          <h1 class="title">Submissions for {name}</h1>
        </section>
      </div>

      <Table
        className="-highlight"
        data={runner_submissions}
        columns={columns}
        defaultSorted={[
          {
            id: "runner",
            desc: false
          }
        ]}
      />
    </div>
  );
};


const mapStateToProps = (state, props) => ({
  event: state.events[props.eventId],
  accounts: state.accounts,
  games: state.games,
  loading: _.some(state.fetching)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionsPage);
