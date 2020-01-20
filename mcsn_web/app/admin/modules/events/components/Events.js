import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import * as EventActions from '../EventActions';
import * as EventStore from '../EventStore';

import Layout from '../../../../modules/layout/components/Layout';
import Anchor from '../../../../uikit/Anchor';
import Header from '../../../../uikit/Header';
import Text from '../../../../uikit/Text';

import { AdminRoutes } from '../../../AdminRouter';

const AdminAccounts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(EventActions.fetchEvents());
  }, []);

  const events = useSelector(EventStore.getEvents);

  return (
    <Layout>
      <Header withMargin>Events</Header>

      <div>
        {events.map(event => (
          <Text key={event.id} marginless>
            <Anchor href={AdminRoutes.EVENT({ eventId: event.id })}>{event.name}</Anchor>
          </Text>
        ))}
      </div>
    </Layout>
  );
};

export default AdminAccounts;
