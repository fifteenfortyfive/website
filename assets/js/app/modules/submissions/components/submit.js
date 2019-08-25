import {h} from 'preact';
import {route} from 'preact-router';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';

import {useAuth} from '../../../hooks/useAuth';
import * as EventActions from '../../../actions/events';
import * as EventStore from '../../../selectors/events';

import * as SubmissionsActions from '../actions';
import * as SubmissionsStore from '../selectors';
import RunSubmission from './run-submission';
import RunSubmissionForm from './run-submission-form';

import {
  Column,
  Columns
} from 'bloomer';
import Layout from '../../../pages/layout';
import Button from '../../../uikit/button';
import ButtonGroup from '../../../uikit/button-group';
import Header from '../../../uikit/header';
import Select from '../../../uikit/select';
import Text from '../../../uikit/text';
import TextInput from '../../../uikit/text-input';

import {Routes} from '../../../constants';
import style from './submit.css';

const NewSubmission = (props) => {
  const {eventId} = props;
  const dispatch = useDispatch();

  const {isLoggedIn, account} = useAuth();
  const [acceptedTimezones, setAcceptedTimezones] = useState(false);
  const [showNewRun, setShowNewRun] = useState(false);

  useEffect(() => {
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(SubmissionsActions.fetchAllowedRuns(eventId));
    dispatch(SubmissionsActions.fetchRunnerSubmission(eventId));
  }, [eventId]);

  const event = useSelector((state) => EventStore.getEvent(state, {eventId}));
  const runner = useSelector(SubmissionsStore.getRunnerSubmission);
  const runs = useSelector(SubmissionsStore.getRunSubmissions);

  useEffect(() => {
    if(event != null && event.state != "signups open") {
      route(Routes.HOME);
    }
  }, [event]);

  const handleUpdateRun = useCallback((runData) => {
    dispatch(SubmissionsActions.updateRunSubmission(eventId, runData));
  }, [dispatch, eventId]);

  const handleCancelEdit = useCallback(() => {
    setShowNewRun(true);
  });

  const handleDeleteRun = useCallback((runData) => {
    if(runData.id) {
      dispatch(SubmissionsActions.deleteRunSubmission(eventId, runData.id));
    }
  }, [dispatch]);

  const handleCreateRun = useCallback((runData) => {
    dispatch(SubmissionsActions.createRunSubmission(eventId, runData));
    setShowNewRun(false);
  }, [dispatch, eventId]);

  const handleCancelNewRun = useCallback(() => {
    setShowNewRun(false);
  });

  const revokeSubmission = useCallback(() => {
    dispatch(SubmissionsActions.revokeRunnerSubmission(eventId));
  }, [eventId]);

  const unrevokeSubmission = useCallback(() => {
    dispatch(SubmissionsActions.unrevokeRunnerSubmission(eventId));
  }, [eventId]);

  const deleteSubmission = useCallback(() => {
    dispatch(SubmissionsActions.deleteRunnerSubmission(eventId));
  }, [eventId]);

  if(event == null) return <Layout>Loading</Layout>;

  return (
    <Layout>
      <Columns isCentered>
        <Column isSize={{desktop: 9, widescreen: 8, fullhd: 7}}>
          <Header>Submit a Run</Header>
          <Header size={Header.Sizes.H4} color={Header.Colors.MUTED} withMargin>
            Submitting to {event.name}
          </Header>

          <Text>
            Hello! Thanks for choosing to submit a run to this event! Use this form to add and remove games that you're interested in running. You can come back and edit this at any time before submissions close.
          </Text>

          <div class={style.runsContainer}>
            { runs.map((run) => <RunSubmission
                className={style.submission}
                run={run}
                onSave={handleUpdateRun}
                onDelete={handleDeleteRun}
              />)
            }

            { showNewRun
              ? <RunSubmissionForm
                  className={style.newSubmision}
                  onSave={handleCreateRun}
                  onCancel={handleCancelNewRun}
                />
              : <Button onClick={() => setShowNewRun(true)} color={Button.Colors.PRIMARY}>
                  Add a Run
                </Button>
            }
          </div>

          { runner && (runner.revoked
            ? <div>
                <Text color={Text.Colors.PRIMARY}>
                  Your submissions are currently revoked.
                </Text>
                <Text>
                  This means they won't be shown to organizers to be considered as part of the event. You can unrevoke your submissions with the button below to resubmit them and have them included in the event.
                </Text>

                <Text>
                  You can also fully delete your runs if you would like to be completely removed from this event. You will be able to resubmit, but all of your existing submissions for this event will not be recoverable.
                </Text>

                <ButtonGroup>
                  <Button
                      color={Button.Colors.PRIMARY}
                      onClick={unrevokeSubmission}
                    >
                    Unrevoke Submission
                  </Button>
                  <Button onClick={deleteSubmission}>Delete Submission</Button>
                </ButtonGroup>
              </div>
            : <div>
                <Text>
                  Your submissions are stored every time you hit Submit or Save. If you are no longer interested in participating in this event, you can revoke your submissions. By revoking, your submissions will stay stored, but will not be shown to the organizers.
                </Text>

                <Text>
                  You can also fully delete your runs if you would like to be completely removed from this event. You will be able to resubmit, but all of your existing submissions for this event will not be recoverable.
                </Text>

                <ButtonGroup>
                  <Button onClick={revokeSubmission}>Revoke Submission</Button>
                  <Button onClick={deleteSubmission}>Delete Submission</Button>
                </ButtonGroup>
              </div>
          )}
        </Column>
      </Columns>
    </Layout>
  );
};

export default NewSubmission;
