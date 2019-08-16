import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';

import {useAuth} from '../../../hooks/useAuth';
import * as EventActions from '../../../actions/events';
import * as EventStore from '../../../selectors/events';

import * as SubmissionsActions from '../actions';
import * as SubmissionsStore from '../selectors';
import RunSubmissionForm from './run-submission-form';

import {
  Column,
  Columns
} from 'bloomer';
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

  useEffect(() => {
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(SubmissionsActions.fetchAllowedRuns(eventId));
    dispatch(SubmissionsActions.fetchRunnerSubmission(eventId));
  }, [eventId]);

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
  const event = useSelector((state) => {
    return EventStore.getEvent(state, {eventId});
  });
  const runner = useSelector(SubmissionsStore.getRunnerSubmission);
  const runs = useSelector(SubmissionsStore.getRunSubmissions);

  if(event == null) return <Layout>Loading</Layout>;

  return (
    <Layout>
      <Columns isCentered>
        <Column isSize={{desktop: 10, widescreen: 8}}>
          <Header>Submit a Run</Header>
          <Header size={Header.Sizes.H4} color={Header.Colors.MUTED} withMargin>
            Submitting to {event.name}
          </Header>

          <TextInput
            label="Max Games"
            value={runner && runner.max_games}
          />

          <TextInput
            label="Max Time"
            value={runner && runner.max_time}
          />

          <TextInput
            label="Pair With"
            note="Separate names with commas"
            value={runner && runner.pair_with}
          />

          <TextInput
            label="Avoid"
            note="Separate names with commas"
            value={runner && runner.avoid}
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
            Start Submitting Runs
          </Button>

          { runs.map((run, index) => <RunSubmissionForm
              run={run}
              categories={categories}
              index={index+1}
            />)
          }

          <RunSubmissionForm categories={categories} />
        </Column>
      </Columns>
    </Layout>
  );
};

export default NewSubmission;
