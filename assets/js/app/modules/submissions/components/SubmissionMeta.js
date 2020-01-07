import { h } from 'preact';
import { useState } from 'preact/hooks';

import Header from '../../../uikit/Header';
import RunTimeInput from '../../../uikit/RunTimeInput';
import Text from '../../../uikit/Text';
import TextInput from '../../../uikit/TextInput';

const SubmissionMeta = props => {
  const [maxGames, setMaxGames] = useState();
  const [maxTime, setMaxTime] = useState();

  return (
    <div>
      <Header withMargin>General Info</Header>

      <Text>
        If you are submitting multiple games, let us know how many you would be willing to run and/or a
        maximum amount of time you are willing to commit to running.
      </Text>
      <TextInput label="Max Games" value={maxGames} onChange={setMaxGames} />
      <RunTimeInput label="Max Time" value={maxTime} onChange={setMaxTime} placeholder="00:00:00" />
    </div>
  );
};

export default SubmissionMeta;
