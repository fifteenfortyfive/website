import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../uikit/Button';
import ButtonGroup from '../../../../uikit/ButtonGroup';
import Header from '../../../../uikit/Header';
import Icon from '../../../../uikit/Icon';
import Text from '../../../../uikit/Text';
import * as TimeUtils from '../../../../utils/TimeUtils';
import * as SchedulingActions from '../SchedulingActions';
import * as SchedulingStore from '../SchedulingStore';

import styles from './SchedulingActivity.mod.css';

const SchedulingActivity = props => {
  const dispatch = useDispatch();
  const { activityId, offset, startTime } = props;

  const { scheduleId, activity, run, game, category, runner } = useSelector(state => {
    const activity = SchedulingStore.getActivity(state, { activityId });
    const run = SchedulingStore.getRun(state, { runId: activity.run_id });
    return {
      scheduleId: SchedulingStore.getSchedule(state).id,
      activity,
      run,
      runner: SchedulingStore.getRunner(state, { runnerId: run.account_id }),
      game: SchedulingStore.getGame(state, { gameId: run.game_id }),
      category: SchedulingStore.getCategory(state, { categoryId: run.category_id }),
    };
  });

  const handleRemoveActivity = useCallback(() => {
    dispatch(SchedulingActions.removeActivity(scheduleId, activityId));
  }, [scheduleId, activityId]);

  const handleMoveUp = useCallback(() => {
    dispatch(SchedulingActions.updateActivity(scheduleId, activity.id, { index: activity.index - 1 }));
  }, [scheduleId, activity]);

  const estimatedStart = startTime.plus({ seconds: offset });

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <Text marginless>{TimeUtils.shortDateTime(estimatedStart)}</Text>
      </div>
      <div className={styles.info}>
        <Header size={Header.Sizes.H5}>
          {game.name} - {category.name}
        </Header>
        <Text marginless>
          <strong>{runner.username} </strong>
          &middot; EST: {TimeUtils.runTime(run.est_seconds)}
        </Text>
      </div>
      <ButtonGroup className={styles.buttons}>
        <Button size={Button.Sizes.ICON} onClick={handleRemoveActivity}>
          <Icon name={Icon.Names.MINUS} />
        </Button>
        <Button size={Button.Sizes.ICON} onClick={handleMoveUp}>
          Up
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SchedulingActivity;
