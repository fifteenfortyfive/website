import { h, render } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameInput = (props) => {
  const { availableGames, game, index, onRemove, onUpdate } = props;

  const handleChange = (ev, field) => {
    const value = ev.target.value;

    onUpdate(index, field, value);
  };

  return (
    <div class="field-group">
      <div class="field">
        <div class="control is-oneline is-rounded">
          <label class="label">Game</label>
          <select
            class="input select"
            required="true"
            onChange={(ev) => handleChange(ev, 'name')}
            defaultValue={game.name}
            >
            <option selected disabled>Select a Game</option>
            { availableGames.map((game) => (
                <option value={game}>{game}</option>
              ))
            }
          </select>

          <div class="divider is-paddingless"></div>

          <div class="button is-wide" onClick={onRemove}>
            <FontAwesomeIcon icon="times" />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control is-oneline is-rounded">
          <label class="label">PB</label>
          <input
            class="input"
            required="true"
            value={game.pb}
            placeholder="00:00:00"
            pattern="[0-9]+:[0-5][0-9]:[0-5][0-9]"
            onInput={(ev) => handleChange(ev, 'pb')}
          />
        </div>
      </div>
      <div class="field">
        <div class="control is-oneline is-rounded">
          <label class="label">EST</label>
          <input
            class="input"
            required="true"
            value={game.est}
            placeholder="00:00:00"
            pattern="[0-9]+:[0-5][0-9]:[0-5][0-9]"
            onInput={(ev) => handleChange(ev, 'est')}
          />
        </div>
      </div>
    </div>
  );
};

export default GameInput;
