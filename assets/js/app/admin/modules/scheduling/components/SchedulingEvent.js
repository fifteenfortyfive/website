import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Columns, Column } from 'bloomer';

import Layout from '../../../../modules/layout/components/Layout';
import Header from '../../../../uikit/Header';
import * as SchedulingActions from '../SchedulingActions';
import * as SchedulingStore from '../SchedulingStore';
import SchedulingBuilder from './SchedulingBuilder';
import SchedulingAvailableRuns from './SchedulingAvailableRuns';

const SchedulingEvent = props => {
  const dispatch = useDispatch();
  const { eventId } = props;

  const { event } = useSelector(state => ({
    event: SchedulingStore.getEvent(state),
  }));

  useEffect(() => {
    dispatch(SchedulingActions.fetchSchedulingData(eventId));
  }, [eventId]);

  if (event == null)
    return (
      <Layout>
        <div>Loading</div>
      </Layout>
    );

  return (
    <Layout>
      <Header withMargin>Scheduling for {event.name}</Header>
      <Columns>
        <Column isSize={4}>
          <SchedulingAvailableRuns />
        </Column>
        <Column isSize={8}>
          <SchedulingBuilder />
        </Column>
      </Columns>
    </Layout>
  );
};

export default SchedulingEvent;
