import {h} from 'preact';
import {connect} from 'react-redux';
import {Link} from 'preact-router';
import _ from 'lodash';

import * as EventStore from '../../selectors/events';

import Header from '../../uikit/header';
import Text from '../../uikit/text';

import {Routes} from '../../constants';

const Team = (props) => {
  const {
    team
  } = props;

  const {
    id: teamId,
    name,
    color,
    runs
  } = team;

  return (
    <div style={{'--themeColor': `#${color}`}}>
      <Link href={Routes.TEAM(teamId)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.THEMED}>
          {name}
        </Header>
      </Link>

      { _.map(runs, (run) => (
          <div>
            <Text color={Text.Colors.MUTED}>{run.game.name}</Text>
            <Link href={Routes.ACCOUNT(run.account_id)}>
              <Text>{run.account.username}</Text>
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default Team;
