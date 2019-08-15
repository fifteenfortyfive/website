import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';

import {useAuth} from '../../../hooks/useAuth';
import * as EventActions from '../../../actions/events';
import * as EventStore from '../../../selectors/events';

import * as SubmissionsActions from '../actions';
import * as SubmissionsStore from '../selectors';

import Layout from '../../../pages/layout';
import Button from '../../../uikit/button';
import Checkbox from '../../../uikit/checkbox';
import Header from '../../../uikit/header';
import Select from '../../../uikit/select';
import Text from '../../../uikit/text';
import TextInput from '../../../uikit/text-input';


const NewSubmission = (props) => {
  const {eventId} = props;
  const dispatch = useDispatch();

  const {isLoggedIn, account} = useAuth();
  const [acceptedTimezones, setAcceptedTimezones] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState();

  useEffect(() => {
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(SubmissionsActions.fetchAllowedRuns(eventId));
  }, [eventId]);

  const event = useSelector((state) => {
    return EventStore.getEvent(state, {eventId});
  });
  const categories = useSelector((state) => {
    const allowed = SubmissionsStore.getAllowedCategories(state);

    return allowed.map((category) => {
      const game = SubmissionsStore.getAllowedGame(state, category.game_id);
      return {
        name: `${game && game.name} - ${category.name}`,
        value: category.id
      }
    });
  });

  if(event == null) return <Layout>Loading</Layout>;

  return (
    <Layout>
      <Header>Submit a Run</Header>
      <Header size={Header.Sizes.H4} color={Header.Colors.MUTED} withMargin>
        Submitting to {event.name}
      </Header>

      <TextInput
        label="You"
        value={account && account.username}
        editable={false}
      />

      <Select
        label="Run"
        options={categories}
        value={selectedCategoryId}
        placeholder="Select a run..."
        onChange={({target}) => setSelectedCategoryId(target.value)}
      />

      <TextInput
        label="PB"
        value={null}
        placeholder="00:00:00"
      />
      <TextInput
        label="Estimate"
        value={null}
        placeholder="00:00:00"
      />

      <Checkbox
          checked={acceptedTimezones}
          onChange={setAcceptedTimezones}
        >
        <Checkbox.Header>I Understand Timezones</Checkbox.Header>
        <Text marginless>
          By checking this box, you confirm that you know:
          <ul>
            <li>a) the name of the timezone you live in</li>
            <li>b) the hour offset your timezone is from UTC</li>
            <li>c) that you are responsible for interpreting timezones in all event scheduling as it pertains to you.</li>
          </ul>
        </Text>
      </Checkbox>

      <Button color={Button.Colors.PRIMARY} disabled={!acceptedTimezones}>
        Submit Your Run
      </Button>
    </Layout>
  );
};

export default NewSubmission;
