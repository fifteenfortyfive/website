import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../uikit/Button';
import Header from '../../../../uikit/Header';
import Icon from '../../../../uikit/Icon';
import Text from '../../../../uikit/Text';
import * as TimeUtils from '../../../../utils/TimeUtils';
import * as SchedulingActions from '../SchedulingActions';
import * as SchedulingStore from '../SchedulingStore';

import styles from './SchedulingAvailableRun.mod.css';

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
    <div className={styles.container}>
      <div className={styles.info}>
        <Header size={Header.Sizes.H5}>
          {game.name} - {category.name}
        </Header>
        <Text marginless>
          {runner.username} - {TimeUtils.runTime(run.est_seconds)}
        </Text>
      </div>
      <Button className={styles.button} onClick={handleAddRun} size={Button.Sizes.ICON}>
        <Icon name={Icon.Names.PLUS} />
      </Button>
    </div>
  );
};

export default SchedulingAvailableRun;
