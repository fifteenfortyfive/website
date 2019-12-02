import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import Anchor from '../../../uikit/Anchor';
import Avatar from '../../../uikit/Avatar';
import * as AccountStore from '../../accounts/AccountStore';
import Layout from '../../layout/components/Layout';
import * as RunActions from '../../runs/RunActions';
import * as TeamActions from '../TeamActions';
import * as TeamStore from '../TeamStore';

import { Routes } from '../../../Constants';
import { runTime } from '../../../utils/TimeUtils';
import style from './TeamView.css';

class TeamView extends Component {
  componentDidMount() {
    const { dispatch, teamId } = this.props;
    dispatch(TeamActions.fetchTeam(teamId));
    dispatch(RunActions.fetchRuns({ teamId, embeds: ['game', 'category', 'account'] }));
  }

  render() {
    const { team, estimate, loading, runs } = this.props;

    if (loading || team == null) return <Layout>Loading</Layout>;

    const { name, avatar_hash: avatarHash } = team;

    return (
      <Layout>
        <div class="columns">
          <div class="column is-4">
            <Avatar src={avatarHash} />
            <h1 class="title is-3" style={{ color: `#${team.color}` }}>
              {name}
            </h1>
            {team.captain && (
              <p class="subtitle is-4">
                Captain: <Anchor href={Routes.ACCOUNT(team.captain_id)}>{team.captain.username}</Anchor>
              </p>
            )}
            {team.event && (
              <p>
                Part of: <Anchor href={Routes.EVENT(team.event_id)}>{team.event.name}</Anchor>
              </p>
            )}
            {estimate && <p>Game Estimate: {runTime(estimate)}</p>}
            {team.actual_time_seconds && <p>Finished in: {runTime(team.actual_time_seconds)}</p>}
            <p />
          </div>
          <div class="column">
            <table class="table is-fullwidth">
              <tbody>
                {_.map(runs, run => {
                  return (
                    <tr>
                      <td class={style.tableCell}>
                        <Anchor className={style.flexInline} href={Routes.ACCOUNT(run.account_id)}>
                          <Avatar className={style.runnerAvatar} src={run.account.avatar_hash} size={24} />
                          {run.account.username}
                        </Anchor>
                      </td>
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
      </Layout>
    );
  }
}

const mapStateToProps = (state, props) => {
  const loadingTeam = state.fetching[`teams.${props.teamId}`];
  const loadingRuns = state.fetching.runs;

  const captainId = TeamStore.getCaptainId(state, props);

  return {
    loading: loadingTeam || loadingRuns,
    team: TeamStore.getTeam(state, props),
    runs: TeamStore.getTeamRuns(state, props),
    captainId,
    estimate: TeamStore.getTeamEstimate(state, props),
    captain: AccountStore.getAccount(state, { accountId: captainId }),
  };
};

export default connect(mapStateToProps)(TeamView);
