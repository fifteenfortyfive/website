import {h, Fragment} from 'preact';
import {useCallback, useState} from 'preact/hooks';
import {useSelector} from 'react-redux';
import classNames from 'classnames';

import * as SubmissionStore from '../SubmissionStore';
import RunSubmissionForm from './RunSubmissionForm';

import {
  Column,
  Columns,
} from 'bloomer';
import Button from '../../../uikit/button';
import Header from '../../../uikit/header';
import Select from '../../../uikit/select';
import Text from '../../../uikit/text';

import {runTime} from '../../../util';
import style from './RunSubmission.css';

const RunSubmission = (props) => {
  const {
    run={},
    className,
    onSave,
    onDelete,
  } = props;

  const {
    category_id,
    game_id,
    pb_seconds,
    est_seconds,
  } = run;

  const [isEditing, setEditing] = useState(false);
  const submissionName = useSelector((state) => {
    const category = SubmissionStore.getAllowedCategory(state, category_id);
    const game = SubmissionStore.getAllowedGame(state, game_id);
    if(category == null || game == null) return null;

    return `${game.name} - ${category.name}`;
  });

  const handleSave = useCallback((runData) => {
    onSave(runData);
    setEditing(false);
  }, [onSave]);
  const handleDelete = useCallback((runData) => {
    onDelete(runData);
    setEditing(false);
  }, [onDelete]);
  const handleCancel = useCallback(() => setEditing(false));

  return (
    <div
        class={classNames(className, style.submission, {
          [style.editing]: isEditing
        })}
      >
      { isEditing
        ? <RunSubmissionForm
            className={style.form}
            run={run}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        : <Fragment>
            <div class={style.content}>
              <Header size={Header.Sizes.H5}>{submissionName}</Header>

              <Text marginless>PB: {runTime(pb_seconds)}</Text>
              <Text marginless>EST: {runTime(est_seconds)}</Text>
            </div>

            <div class={style.actions}>
              <Button fullwidth onClick={() => setEditing(true)}>Edit</Button>
            </div>
          </Fragment>
      }
    </div>
  );
}

export default RunSubmission;
