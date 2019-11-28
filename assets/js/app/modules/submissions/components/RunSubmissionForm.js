import {h} from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {useSelector} from 'react-redux';

import * as SubmissionStore from '../SubmissionStore';

import Button from '../../../uikit/Button';
import ButtonGroup from '../../../uikit/ButtonGroup';
import Header from '../../../uikit/Header';
import Select from '../../../uikit/Select';
import RunTimeInput from '../../../uikit/RunTimeInput';

import {runTime} from '../../../utils/TimeUtils';

const RunSubmissionForm = (props) => {
  const {
    run={},
    index,
    className,
    onSave,
    onDelete,
    onCancel,
  } = props;

  const {
    id,
    category_id,
    pb_seconds,
    est_seconds,
  } = run;

  const isNewRun = !id;
  const [selectedCategoryId, setSelectedCategoryId] = useState(category_id);
  const [pb, setPB] = useState(pb_seconds);
  const [est, setEstimate] = useState(est_seconds);
  const [isValid, setValid] = useState(false);
  const categories = useSelector((state) => {
    const allowed = SubmissionStore.getAllowedCategories(state);

    return allowed.map((category) => {
      const game = SubmissionStore.getAllowedGame(state, category.game_id);
      return {
        name: `${game && game.name} - ${category.name}`,
        value: category.id
      }
    });
  });
  const gameId = useSelector((state) => {
    if(selectedCategoryId) {
      const category = SubmissionStore.getAllowedCategory(state, selectedCategoryId);
      return category && category.game_id;
    } else {
      return null;
    }
  });

  useEffect(() => {
    setValid(
      selectedCategoryId != null &&
      pb > 0 &&
      est > 0
    )
  }, [selectedCategoryId, pb, est]);

  const editedRunData = {
    id: id,
    categoryId: selectedCategoryId,
    gameId: gameId,
    pb,
    est
  };

  const handleSave = useCallback(() => {
    onSave(editedRunData);
  }, [onSave, editedRunData]);

  const handleDelete = useCallback(() => {
    onDelete(editedRunData);
  }, [onDelete, editedRunData]);


  return (
    <div class={className}>
      <Select
        label="Run"
        options={categories}
        value={selectedCategoryId || category_id}
        placeholder="Select a run..."
        onChange={({target}) => setSelectedCategoryId(target.value)}
      />

      <RunTimeInput
        label="PB"
        value={pb}
        onChange={setPB}
        placeholder="00:00:00"
      />
      <RunTimeInput
        label="Estimate"
        value={est}
        placeholder="00:00:00"
        onChange={setEstimate}
      />

      <ButtonGroup>
        <Button
            onClick={handleSave}
            color={Button.Colors.PRIMARY}
            disabled={!isValid}
          >
          { isNewRun ? "Submit Run" : "Save Run" }
        </Button>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        { !isNewRun &&
          <Button onClick={handleDelete}>
            Delete
          </Button>
        }
      </ButtonGroup>
    </div>
  );
}

export default RunSubmissionForm;
