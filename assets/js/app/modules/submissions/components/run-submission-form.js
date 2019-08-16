import {h} from 'preact';
import {useState} from 'preact/hooks';

import Button from '../../../uikit/button';
import Header from '../../../uikit/header';
import Select from '../../../uikit/select';
import TextInput from '../../../uikit/text-input';

import {runTime} from '../../../util';

const RunSubmissionForm = (props) => {
  const {
    run={},
    categories=[],
    index
  } = props;

  const {
    category_id,
    pb_seconds,
    est_seconds,
  } = run;

  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [pb, setPB] = useState();
  const [est, setEstimate] = useState();

  return (
    <div>
      <Header size={Header.Sizes.H4}>Run #{index}</Header>
      <Select
        label="Run"
        options={categories}
        value={selectedCategoryId || category_id}
        placeholder="Select a run..."
        onChange={({target}) => setSelectedCategoryId(target.value)}
      />

      <TextInput
        label="PB"
        value={runTime(pb || pb_seconds)}
        onChange={({target}) => setPB(target.value)}
        placeholder="00:00:00"
      />
      <TextInput
        label="Estimate"
        value={runTime(est || est_seconds)}
        placeholder="00:00:00"
        onChange={({target}) => setEstimate(target.value)}
      />

      <Button>
        Save Run
      </Button>
    </div>
  );
}

export default RunSubmissionForm;
