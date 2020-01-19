import { h } from 'preact';
import { useSelector } from 'react-redux';

import Text from '../../../../uikit/Text';
import * as TimeUtils from '../../../../utils/TimeUtils';
import * as SchedulingStore from '../SchedulingStore';
import SchedulingActivity from './SchedulingActivity';

const SchedulingBuilder = props => {
  const { activities, totalSeconds, event } = useSelector(state => ({
    activities: SchedulingStore.getActivitiesWithOffsets(state),
    totalSeconds: SchedulingStore.getTotalEventSeconds(state),
    event: SchedulingStore.getEvent(state),
  }));

  const startTime = TimeUtils.timeFromISO(event.start_time);

  const scheduleEndTime = startTime.plus({ seconds: totalSeconds });

  return (
    <div>
      <Text>
        Event runs from {TimeUtils.simpleDateTime(event.start_time)} to{' '}
        {TimeUtils.simpleDateTime(scheduleEndTime)}
      </Text>
      <div>
        {activities.map(({ activity, offset }) => (
          <SchedulingActivity
            key={activity.id}
            activityId={activity.id}
            offset={offset}
            startTime={startTime}
          />
        ))}
      </div>
    </div>
  );
};

export default SchedulingBuilder;
