import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../../../modules/layout/components/Layout';
import Anchor from '../../../../uikit/Anchor';
import Header from '../../../../uikit/Header';
import Text from '../../../../uikit/Text';
import { AdminRoutes } from '../../../AdminRouter';
import * as ScheduleActions from '../../schedules/ScheduleActions';
import * as ScheduleStore from '../../schedules/ScheduleStore';
import * as EventActions from '../EventActions';
import * as EventStore from '../EventStore';

import { Columns, Column } from 'bloomer';

const Event = props => {
  const dispatch = useDispatch();
  const { eventId } = props;

  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  useEffect(() => {
    setLoadingEvent(true);
    setLoadingSchedules(true);
    dispatch(EventActions.fetchEvent(eventId)).then(() => setLoadingEvent(false));
    dispatch(ScheduleActions.fetchSchedules({ eventId })).then(() => setLoadingSchedules(false));
  }, [eventId]);

  const { event, schedules } = useSelector(state => ({
    event: EventStore.getEvent(state, { eventId }),
    schedules: ScheduleStore.getEventSchedules(state, { eventId }),
  }));

  if (loadingEvent)
    return (
      <Layout>
        <div>Loading</div>
      </Layout>
    );

  if (event == null) return <div>Event not found</div>;

  return (
    <Layout>
      <Columns>
        <Column isSize={3}>
          <Header size={Header.Sizes.H1}>{event.name}</Header>
          <Header size={Header.Sizes.H2} withMargin>
            {event.series.name}
          </Header>
        </Column>
        <Column isSize={9}>
          {loadingSchedules ? (
            <div>Loading Schedules...</div>
          ) : (
            <Fragment>
              <Header size={Header.Sizes.H3}>Schedules</Header>
              {schedules.map(schedule => (
                <Text key={schedule.id}>
                  {schedule.id} - {schedule.name} - {schedule.activities.length} runs
                </Text>
              ))}
              <Text>
                <Anchor href={AdminRoutes.EVENT_SCHEDULING({ eventId })}>Edit this Event's Schedule</Anchor>
              </Text>
            </Fragment>
          )}
        </Column>
      </Columns>
    </Layout>
  );
};

export default Event;
