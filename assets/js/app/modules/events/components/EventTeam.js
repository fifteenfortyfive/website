import { h } from 'preact';
import _ from 'lodash';

import Header from '../../../uikit/Header';
import Link from '../../../uikit/Link';
import Text from '../../../uikit/Text';

import { Routes } from '../../../Constants';

const EventTeam = props => {
  const { team } = props;

  const { id: teamId, name, color, runs } = team;

  console.log(name, color);

  return (
    <div style={{ '--themeColor': `#${color}` }}>
      <Link href={Routes.TEAM(teamId)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.THEMED} withMargin>
          {name}
        </Header>
      </Link>

      {_.map(runs, run => (
        <div>
          <Text color={Text.Colors.MUTED} marginless>
            {run.game.name}
          </Text>
          <Link href={Routes.ACCOUNT(run.account_id)}>
            <Text>{run.account.username}</Text>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventTeam;