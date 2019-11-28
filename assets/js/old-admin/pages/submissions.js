import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'preact-router';
import _ from 'lodash';

import Table, { ReactTableDefaults } from 'react-table';
import FoldableTableHOC from 'react-table/lib/hoc/foldableTable';
const FoldableTable = FoldableTableHOC(Table);

import * as Actions from '../actions';

import Folder from '../components/foldable-header';
import RunCell from '../components/run-cell';
import RunnerCell from '../components/runner-cell';

const SubmissionsPage = ({ event, accounts, games, loading }) => {
  if (loading || event == null) return <h1 class="title">Loading...</h1>;

  const { name, runner_submissions } = event;

  const submissionsByAccount = _.keyBy(runner_submissions, 'account_id');

  const allRuns = _.reduce(
    runner_submissions,
    (acc, submission) => {
      return acc.concat(submission.run_submissions);
    },
    [],
  );

  const gameColumns = _.flow([
    columns => _.groupBy(columns, 'series'),
    columns =>
      _.map(columns, (seriesGames, series) => ({
        Header: _.capitalize(series),
        foldable: true,
        headerClassName: `${series}-bg`,
        columns: _.map(seriesGames, game => ({
          Header: game.name,
          id: `game-${game.id}`,
          accessor: sub => _.find(sub.run_submissions, g => g.game_id == game.id),
          Cell: ({ value: run }) => (
            <RunCell
              run={run}
              runner={run && accounts[run.account_id]}
              submission={run && submissionsByAccount[run.account_id]}
              games={games}
            />
          ),
        })),
      })),
  ])(Object.values(games));

  const columns = [
    {
      Header: 'Runner',
      id: 'runner',
      accessor: sub => accounts[sub.account_id].username,
      minWidth: 160,
      defaultPageSize: 20,
      Cell: ({ original: sub }) => <RunnerCell submission={sub} runner={accounts[sub.account_id]} />,
    },
    ...gameColumns,
  ];

  return (
    <div>
      <div class="container">
        <section class="section">
          <h1 class="title">Submissions for {name}</h1>
        </section>
      </div>

      <FoldableTable
        className="has-margin-bottom-lg -striped -highlight"
        data={runner_submissions}
        columns={columns}
        defaultSorted={[
          {
            id: 'runner',
            desc: false,
          },
        ]}
        FoldButtonComponent={Folder}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  event: state.events[props.eventId],
  accounts: state.accounts,
  games: state.games,
  loading: _.some(state.fetching),
});

const mapDispatchToProps = dispatch => ({
  dispatch: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
