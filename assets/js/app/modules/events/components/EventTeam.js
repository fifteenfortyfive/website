import { h } from 'preact';
import _ from 'lodash';

import Anchor from '../../../uikit/Anchor';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';

import { Routes } from '../../../Constants';

const EventTeam = props => {
  const { team } = props;

  const { id: teamId, name, color, runs } = team;

  return (
    <div style={{ '--themeColor': `#${color}` }}>
      <Anchor href={Routes.TEAM(teamId)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.THEMED} withMargin>
          {name}
        </Header>
      </Anchor>

      {_.map(runs, run => (
        <div>
          <Text color={Text.Colors.MUTED} marginless>
            {run.game.name}
          </Text>
          <Anchor href={Routes.ACCOUNT(run.account_id)}>
            <Text>{run.account.username}</Text>
          </Anchor>
        </div>
      ))}
    </div>
  );
};

export default EventTeam;
