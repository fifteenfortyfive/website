import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import Button from '../../../../uikit/Button';
import ButtonGroup from '../../../../uikit/ButtonGroup';
import Header from '../../../../uikit/Header';
import Icon from '../../../../uikit/Icon';
import RunTimeInput from '../../../../uikit/RunTimeInput';
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

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [setupSeconds, setSetupSeconds] = useState(activity.setup_seconds);
  const [teardownSeconds, setTeardownSeconds] = useState(activity.teardown_seconds);

  const handleRemoveActivity = useCallback(() => {
    setLoading(true);
    dispatch(SchedulingActions.removeActivity(scheduleId, activityId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [scheduleId, activityId]);

  const handleMoveUp = useCallback(() => {
    setLoading(true);
    dispatch(SchedulingActions.updateActivity(scheduleId, activity.id, { index: activity.index - 1 }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [scheduleId, activity]);

  const handleMoveDown = useCallback(() => {
    setLoading(true);
    dispatch(SchedulingActions.updateActivity(scheduleId, activity.id, { index: activity.index + 1 }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [scheduleId, activity]);

  const handleEdit = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const handleSave = useCallback(() => {
    setLoading(true);
    dispatch(
      SchedulingActions.updateActivity(scheduleId, activity.id, {
        /* eslint-disable camelcase */
        setup_seconds: setupSeconds,
        teardown_seconds: teardownSeconds,
        /* eslint-enable camelcase */
      })
    )
      .then(() => {
        setLoading(false);
        setEditing(false);
      })
      .catch(() => setLoading(false));
  }, [setupSeconds, teardownSeconds]);

  const estimatedStart = startTime.plus({ seconds: offset });

  return (
    <div className={classNames(styles.container, { [styles.editing]: editing })}>
      <div className={styles.mainRow}>
        <div className={styles.index}>
          <Text marginless>
            <strong>{activity.index + 1}</strong>
          </Text>
        </div>
        <div className={styles.time}>
          <Text marginless>{TimeUtils.shortDateTime(estimatedStart)}</Text>
        </div>
        <div className={styles.info}>
          <Header size={Header.Sizes.H5}>
            {game.name} - {category.name}
          </Header>
          <Text marginless size={Text.Sizes.SIZE_14}>
            <strong>{runner.username} </strong>
            &middot; EST: {TimeUtils.runTime(run.est_seconds)}
            {activity.setup_seconds
              ? ` + ${TimeUtils.runTime(activity.setup_seconds, { shrink: true })} setup`
              : null}
            {activity.teardown_seconds
              ? ` + ${TimeUtils.runTime(activity.teardown_seconds, { shrink: true })} teardown`
              : null}
          </Text>
        </div>
        <ButtonGroup className={styles.buttons}>
          <Button size={Button.Sizes.ICON} onClick={handleEdit} disabled={loading}>
            <Icon name={Icon.Names.EDIT} />
          </Button>
          <Button size={Button.Sizes.ICON} onClick={handleRemoveActivity} disabled={loading}>
            <Icon name={Icon.Names.MINUS} />
          </Button>
          <Button size={Button.Sizes.ICON} onClick={handleMoveUp} disabled={loading}>
            <Icon name={Icon.Names.CHEVRON_UP} />
          </Button>
          <Button size={Button.Sizes.ICON} onClick={handleMoveDown} disabled={loading}>
            <Icon name={Icon.Names.CHEVRON_DOWN} />
          </Button>
        </ButtonGroup>
      </div>

      {editing ? (
        <div className={styles.form}>
          <RunTimeInput label="Setup Time" value={setupSeconds} onChange={setSetupSeconds} />
          <RunTimeInput label="Teardown Time" value={teardownSeconds} onChange={setTeardownSeconds} />
          <Button onClick={handleSave} disabled={loading}>
            Save Changes
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default SchedulingActivity;
