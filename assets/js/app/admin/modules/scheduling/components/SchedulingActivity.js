import { h } from 'preact';
import { useSelector } from 'react-redux';

import Header from '../../../../uikit/Header';
import Text from '../../../../uikit/Text';
import * as TimeUtils from '../../../../utils/TimeUtils';
import * as SchedulingStore from '../SchedulingStore';

const SchedulingActivity = props => {
  const { activityId, offset, startTime } = props;

  const { game, category, runner } = useSelector(state => {
    const activity = SchedulingStore.getActivity(state, { activityId });
    const run = SchedulingStore.getRun(state, { runId: activity.run_id });
    return {
      activity,
      run,
      runner: SchedulingStore.getRunner(state, { runnerId: run.account_id }),
      game: SchedulingStore.getGame(state, { gameId: run.game_id }),
      category: SchedulingStore.getCategory(state, { categoryId: run.category_id }),
    };
  });

  const estimatedStart = startTime.plus({ seconds: offset });

  return (
    <div>
      <Header size={Header.Sizes.H5}>
        {runner.username} | {game.name} - {category.name}
      </Header>
      <Text>{TimeUtils.simpleDateTime(estimatedStart)}</Text>
    </div>
  );
};

export default SchedulingActivity;
