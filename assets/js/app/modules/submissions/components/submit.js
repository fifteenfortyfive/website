import { h } from 'preact';
import { navigate } from 'hookrouter';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import * as EventActions from '../../events/EventActions';
import * as EventStore from '../../events/EventStore';
import Layout from '../../layout/components/Layout';
import * as SubmissionActions from '../SubmissionActions';
import * as SubmissionStore from '../SubmissionStore';
import RunSubmission from './RunSubmission';
import RunSubmissionForm from './RunSubmissionForm';

import { Column, Columns } from 'bloomer';
import Button from '../../../uikit/Button';
import ButtonGroup from '../../../uikit/ButtonGroup';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';

import { Routes } from '../../../Constants';
import style from './Submit.css';

const NewSubmission = props => {
  const { eventId } = props;
  const dispatch = useDispatch();

  const [showNewRun, setShowNewRun] = useState(false);

  useEffect(() => {
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(SubmissionActions.fetchAllowedRuns(eventId));
    dispatch(SubmissionActions.fetchRunnerSubmission(eventId));
  }, [eventId]);

  const event = useSelector(state => EventStore.getEvent(state, { eventId }));
  const runner = useSelector(SubmissionStore.getRunnerSubmission);
  const runs = useSelector(SubmissionStore.getRunSubmissions);

  useEffect(() => {
    if (event != null && event.state !== 'signups open') {
      navigate(Routes.HOME);
    }
  }, [event]);

  const handleUpdateRun = useCallback(
    runData => {
      dispatch(SubmissionActions.updateRunSubmission(eventId, runData));
    },
    [dispatch, eventId]
  );

  const handleDeleteRun = useCallback(
    runData => {
      if (runData.id) {
        dispatch(SubmissionActions.deleteRunSubmission(eventId, runData.id));
      }
    },
    [dispatch]
  );

  const handleCreateRun = useCallback(
    runData => {
      dispatch(SubmissionActions.createRunSubmission(eventId, runData));
      setShowNewRun(false);
    },
    [dispatch, eventId]
  );

  const handleCancelNewRun = useCallback(() => {
    setShowNewRun(false);
  });

  const revokeSubmission = useCallback(() => {
    dispatch(SubmissionActions.revokeRunnerSubmission(eventId));
  }, [eventId]);

  const unrevokeSubmission = useCallback(() => {
    dispatch(SubmissionActions.unrevokeRunnerSubmission(eventId));
  }, [eventId]);

  const deleteSubmission = useCallback(() => {
    dispatch(SubmissionActions.deleteRunnerSubmission(eventId));
  }, [eventId]);

  if (event == null) return <Layout>Loading</Layout>;

  return (
    <Layout>
      <Columns isCentered>
        <Column isSize={{ desktop: 9, widescreen: 8, fullhd: 7 }}>
          <Header>Submit a Run</Header>
          <Header size={Header.Sizes.H4} color={Header.Colors.MUTED} withMargin>
            Submitting to {event.name}
          </Header>

          <Text>
            Hello! Thanks for choosing to submit a run to this event! Use this form to add and remove games
            that you're interested in running. You can come back and edit this at any time before submissions
            close.
          </Text>

          <div class={style.runsContainer}>
            {runs.map(run => (
              <RunSubmission
                key={run.game_id}
                className={style.submission}
                run={run}
                onSave={handleUpdateRun}
                onDelete={handleDeleteRun}
              />
            ))}

            {showNewRun ? (
              <RunSubmissionForm
                className={style.newSubmision}
                onSave={handleCreateRun}
                onCancel={handleCancelNewRun}
              />
            ) : (
              <Button onClick={() => setShowNewRun(true)} color={Button.Colors.PRIMARY}>
                Add a Run
              </Button>
            )}
          </div>

          {runner &&
            (runner.revoked ? (
              <div>
                <Text color={Text.Colors.PRIMARY}>Your submissions are currently revoked.</Text>
                <Text>
                  This means they won't be shown to organizers to be considered as part of the event. You can
                  unrevoke your submissions with the button below to resubmit them and have them included in
                  the event.
                </Text>

                <Text>
                  You can also fully delete your runs if you would like to be completely removed from this
                  event. You will be able to resubmit, but all of your existing submissions for this event
                  will not be recoverable.
                </Text>

                <ButtonGroup>
                  <Button color={Button.Colors.PRIMARY} onClick={unrevokeSubmission}>
                    Unrevoke Submission
                  </Button>
                  <Button onClick={deleteSubmission}>Delete Submission</Button>
                </ButtonGroup>
              </div>
            ) : (
              <div>
                <Text>
                  Your submissions are stored every time you hit Submit or Save. If you are no longer
                  interested in participating in this event, you can revoke your submissions. By revoking,
                  your submissions will stay stored, but will not be shown to the organizers.
                </Text>

                <Text>
                  You can also fully delete your runs if you would like to be completely removed from this
                  event. You will be able to resubmit, but all of your existing submissions for this event
                  will not be recoverable.
                </Text>

                <ButtonGroup>
                  <Button onClick={revokeSubmission}>Revoke Submission</Button>
                  <Button onClick={deleteSubmission}>Delete Submission</Button>
                </ButtonGroup>
              </div>
            ))}
        </Column>
      </Columns>
    </Layout>
  );
};

export default NewSubmission;
