import {h} from 'preact';
import {connect} from 'react-redux';

import * as TeamStore from '../../selectors/teams';
import Avatar from '../accounts/avatar';

const TeamSummary = (props) => {
  const {
    team,
    runIds
  } = props;

  const {
    name,
    avatar_hash
  } = team;

  return (
    <div>
      <Avatar src={avatar_hash} />
      <p>{name}</p>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    team: TeamStore.getTeam(state, props),
    runIds: TeamStore.getTeamRunIds(state, props)
  };
};

export default connect(
  mapStateToProps
)(TeamSummary);
