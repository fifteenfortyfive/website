import { h, Fragment } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import * as SubmissionStore from '../SubmissionStore';
import RunSubmissionForm from './RunSubmissionForm';

import Button from '../../../uikit/Button';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';

import { runTime } from '../../../utils/TimeUtils';
import styles from './RunSubmission.mod.css';

const RunSubmission = props => {
  const { run = {}, className, onSave, onDelete } = props;

  const { category_id: categoryId, game_id: gameId, pb_seconds: pbSeconds, est_seconds: estSeconds } = run;

  const [isEditing, setEditing] = useState(false);
  const submissionName = useSelector(state => {
    const category = SubmissionStore.getAllowedCategory(state, categoryId);
    const game = SubmissionStore.getAllowedGame(state, gameId);
    if (category == null || game == null) return null;

    return `${game.name} - ${category.name}`;
  });

  const handleSave = useCallback(
    runData => {
      onSave(runData);
      setEditing(false);
    },
    [onSave]
  );
  const handleDelete = useCallback(
    runData => {
      onDelete(runData);
      setEditing(false);
    },
    [onDelete]
  );
  const handleCancel = useCallback(() => setEditing(false));

  return (
    <div
      class={classNames(className, styles.submission, {
        [styles.editing]: isEditing,
      })}>
      {isEditing ? (
        <RunSubmissionForm
          className={styles.form}
          run={run}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <Fragment>
          <div class={styles.content}>
            <Header size={Header.Sizes.H5}>{submissionName}</Header>

            <Text marginless>PB: {runTime(pbSeconds)}</Text>
            <Text marginless>EST: {runTime(estSeconds)}</Text>
          </div>

          <div class={styles.actions}>
            <Button fullwidth onClick={() => setEditing(true)}>
              Edit
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default RunSubmission;
