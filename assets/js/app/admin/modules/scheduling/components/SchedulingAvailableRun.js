import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../uikit/Button';
import Header from '../../../../uikit/Header';
import Text from '../../../../uikit/Text';
import * as TimeUtils from '../../../../utils/TimeUtils';
import * as SchedulingActions from '../SchedulingActions';
import * as SchedulingStore from '../SchedulingStore';

const SchedulingAvailableRun = props => {
  const dispatch = useDispatch();
  const { runId } = props;

  const { scheduleId, run, runner, game, category } = useSelector(state => {
    const run = SchedulingStore.getRun(state, { runId });
    return {
      scheduleId: SchedulingStore.getSchedule(state).id,
      run,
      runner: SchedulingStore.getRunner(state, { runnerId: run.account_id }),
      game: SchedulingStore.getGame(state, { gameId: run.game_id }),
      category: SchedulingStore.getCategory(state, { categoryId: run.category_id }),
    };
  });

  const handleAddRun = useCallback(() => {
    dispatch(SchedulingActions.addRun(scheduleId, runId));
  }, [runId, scheduleId]);

  return (
    <div>
      <Header size={Header.Sizes.H5}>
        {game.name} - {category.name}
      </Header>
      <Text>
        {runner.username} - {TimeUtils.runTime(run.est_seconds)}
      </Text>
      <Button onClick={handleAddRun}>Add to Schedule</Button>
    </div>
  );
};

export default SchedulingAvailableRun;
