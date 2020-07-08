import { h } from 'preact';
import _ from 'lodash';

import Anchor from '../../../uikit/Anchor';
import Avatar from '../../../uikit/Avatar';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';

import { Routes } from '../../../Constants';
import styles from './EventTeam.mod.css';

const EventTeam = props => {
  const { team } = props;

  const { id: teamId, name, color, runs } = team;

  const orderedRuns = runs != null ? [...runs].sort((a, b) => a.index - b.index) : [];

  return (
    <div style={{ '--themeColor': `#${color}` }}>
      <Anchor href={Routes.TEAM(teamId)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.THEMED} withMargin>
          {name}
        </Header>
      </Anchor>

      {_.map(orderedRuns, run => (
        <div>
          <Text color={Text.Colors.MUTED} marginless>
            {run.game.name}
          </Text>
          <Anchor href={Routes.ACCOUNT(run.account_id)}>
            <Text className={styles.runner} marginless>
              <Avatar src={run.account.avatar_hash} size={24} className={styles.runnerAvatar} />
              {run.account.username}
            </Text>
          </Anchor>
        </div>
      ))}
    </div>
  );
};

export default EventTeam;
