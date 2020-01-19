import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import * as EventActions from '../EventActions';
import * as EventStore from '../EventStore';

import Layout from '../../../../modules/layout/components/Layout';
import Anchor from '../../../../uikit/Anchor';
import Header from '../../../../uikit/Header';

import { AdminRoutes } from '../../../AdminRouter';

const Event = props => {
  const dispatch = useDispatch();
  const { eventId } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(EventActions.fetchEvent(eventId)).then(() => setLoading(false));
  }, [eventId]);

  const event = useSelector(state => EventStore.getEvent(state, { eventId }));

  if (loading)
    return (
      <Layout>
        <div>Loading</div>
      </Layout>
    );

  if (event == null) return <div>Event not found</div>;

  return (
    <Layout>
      <Header size={Header.Sizes.H1}>{event.name}</Header>
      <Header size={Header.Sizes.H2} withMargin>
        {event.series.name}
      </Header>

      <Header size={Header.Sizes.H3}>Schedules</Header>
      <Anchor href={AdminRoutes.EVENT_SCHEDULING({ eventId })}>Create a Schedule for this Event</Anchor>
    </Layout>
  );
};

export default Event;
