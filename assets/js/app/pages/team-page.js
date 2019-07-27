import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as RunActions from '../actions/runs';
import * as TeamActions from '../actions/teams';
import * as TeamStore from '../selectors/teams';
import Avatar from '../components/accounts/avatar';
import RunList from '../components/accounts/run-list';
import Container from '../uikit/container';

import {runTime} from '../util';

class TeamPage extends Component {
  componentDidMount() {
    const {eventId, teamId, dispatch} = this.props;
    dispatch(TeamActions.fetchTeam(eventId, teamId));
    dispatch(RunActions.fetchRuns(eventId, {teamId, embeds: ['game', 'category', 'account']}));
  }

  render() {
    const {
      teamId,
      team,
      loading,
      runs,
    } = this.props;

    if(loading || team == null) return <div>Hi</div>;

    const {
      name,
      avatar_hash
    } = team;

    return (
      <Container>
        <div class="columns">
          <div class="column is-4">
            <Avatar src={avatar_hash} />
            <h1 class="title is-3" style={{color: `#${team.color}`}}>{name}</h1>
          </div>
          <div class="column">
            <table class="table is-fullwidth is-narrow">
              <tbody>
                { _.map(runs, (run) => {
                    return (
                      <tr>
                        <td>{run.account.username}</td>
                        <td>{run.game.name} - {run.category.name}</td>
                        <td class="has-text-right">
                          { run.est_seconds &&
                            <span class="has-text-grey-light">{runTime(run.est_seconds)} / </span>
                          }
                          { run.finished
                            ? run.actual_seconds
                              ? runTime(run.actual_seconds)
                              : <span class="has-text-grey-light">No time recorded</span>
                            : <span class="has-text-grey-light has-text-weight-bold">DNF</span>
                          }
                        </td>
                        {/*<td><span class="has-text-grey-light">{runTime(run.est_seconds)}</span></td>*/}
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    );
  }
};

const mapStateToProps = (state, props) => {
  const loadingTeam = state.fetching[`teams.${props.teamId}`];
  const loadingRuns = state.fetching[`runs`];

  return {
    loading: loadingTeam || loadingRuns,
    team: TeamStore.getTeam(state, props),
    runs: TeamStore.getTeamRuns(state, props)
  };
}

export default connect(
  mapStateToProps,
)(TeamPage);
