import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as Actions from './actions';

import Checkbox from './components/checkbox';
import ListInput from './components/list-input';
import UserInfo from './components/user-info';
import GameInput from './components/game-input';


class App extends Component {
  constructor(props) {
    super(props);
    this.eventId = null;
  }

  componentDidMount() {
    const {dispatch} = this.props;
    this.eventId = document.querySelector("#signups-container").dataset.eventId;
    dispatch.fetchSubmissionData(this.eventId);
  }

  handleRemoveGame(index) {
    const {dispatch} = this.props;
    dispatch.removeGame(index);
  }

  submit(ev) {
    ev.preventDefault();

    const {
      games,
      pairWith,
      avoid,
      maxGames,
      maxTime,
      captain,
      dispatch
    } = this.props;

    const submissionState = {
      games,
      pairWith,
      avoid,
      maxGames,
      maxTime,
      captain,
    };
    dispatch.submit(this.eventId, submissionState);
  }

  render() {
    const {
      availableGames,
      games,
      pairWith,
      avoid,
      maxGames,
      maxTime,
      captain,
      submitting,
      hasSubmitted,
      dispatch,
    } = this.props;

    return (
      <section class="section">
        <div class="container">
          <main class="content">
            <div class="columns is-centered">
              <div class="column is-10-tablet is-8-widescreen">
                <div class="box is-danger is-fullbleed">
                  <div class="has-text-centered">
                    <h1 class="title sign-up-header">2019 Submissions</h1>
                  </div>

                  <form class="form is-isolated" onSubmit={this.submit.bind(this)}>
                    <div class="columns is-centered">
                      <div class="column is-10">
                        <h3>User Information</h3>
                        <UserInfo
                          user={{
                            username: "faulty",
                            twitter: "amfaulty",
                            twitch: "amfaulty",
                            discord_username: "faulty",
                            discord_discriminator: "7958"
                          }}
                        />


                        <hr/>
                        <h3>Games</h3>

                        <p>
                          Add the games that you are interested in running as part of The 1545, with the games you are most interested in running first.
                        </p>

                        <p>
                        </p>
                        { games.map((game, index) => (
                            <GameInput
                              key={index}
                              index={index}
                              game={game}
                              availableGames={availableGames}
                              onRemove={() => this.handleRemoveGame(index)}
                              onUpdate={dispatch.updateGame}
                            />
                          ))
                        }

                        <div class="add-game-card">
                          <div class="button is-fullwidth is-danger is-rounded" onClick={dispatch.addGame}>Add a Game</div>
                        </div>


                        <hr />
                        <h3>Miscellaneous</h3>
                        <p>
                          We understand some people run many games but don't want to commit to running all of them or spending an unreasonable amount of time running.
                        </p>
                        <p>
                          How many of your submitted games would you be willing to run as part of the event? How much time are you willing to commit to running games for your team?
                        </p>
                        <div class="field">
                          <div class="control is-oneline is-rounded">
                            <label class="label">Games</label>
                            <input
                              class="input"
                              type="number"
                              min="0"
                              max="10"
                              step="1"
                              pattern="\d*"
                              value={maxGames}
                              onInput={(ev) => dispatch.updateMaxGames(ev.target.value)}
                            />
                          </div>
                        </div>

                        <div class="field">
                          <div class="control is-oneline is-rounded">
                            <label class="label">Time</label>
                            <input
                              class="input"
                              value={maxTime}
                              placeholder="00:00:00"
                              pattern="[0-9]+:[0-5][0-9]:[0-5][0-9]"
                              onInput={(ev) => dispatch.updateMaxTime(ev.target.value)}
                            />
                          </div>
                        </div>

                        <p>
                          If you have any friends you'd particularly like to be teamed with, list them here. We will try to form teams so you can be with as many people listed here as possible, but please understand that our priorities are focused on balancing before these preferences.
                        </p>

                        <div class="field">
                          <div class="control is-oneline is-rounded">
                            <label class="label">Pair With</label>
                            <input
                              class="input"
                              type="text"
                              value={pairWith}
                              placeholder="List names with commas between them"
                              onInput={(ev) => dispatch.updatePairWith(ev.target.value)}
                            />
                          </div>
                        </div>

                        <p>
                          If there is anyone you don't believe you could work with on your team, please list them here. This information is private and will not be shared with anyone outside of the event organizers.
                        </p>
                        <p>
                          We take this list seriously and will prioritize accommodating these above balance, but not everything is possible. As such, please carefully consider entries here. If we can not fully accomodate, we will ask you for compromises. This is not a guarantee.
                        </p>

                        <div class="field">
                          <div class="control is-oneline is-rounded">
                            <label class="label">Avoid</label>
                            <input
                              class="input"
                              type="text"
                              value={avoid}
                              placeholder="List names with commas between them"
                              onInput={(ev) => dispatch.updateAvoid(ev.target.value)}
                            />
                          </div>
                        </div>

                        <p>
                          Are you willing to be a team captain? Captains are the primary point of contact for the team, and are responsible for organizing the schedule of runs for the rest of the team. This does not require 24/7 commitment, but availaibility throughout the event is helpful.
                        </p>

                        <div class="field">
                          <div class="control is-centered">
                            <Checkbox
                              checked={captain}
                              label="I am willing to be a team captain."
                              onClick={dispatch.toggleCaptain}
                            />
                          </div>
                        </div>

                        <p>
                          That's all the information we need from you! Once you've looked everything over, go ahead and submit! We'll be announcing teams on June 9th.
                        </p>

                        <div class="field is-isolated">
                          { submitting
                            ? <input type="submit" value="Submitting..." class="button is-fullwidth is-danger is-rounded" disabled />
                            : <input type="submit" value={hasSubmitted ? "Update Submission" : "Submit"} class="button is-fullwidth is-danger is-rounded" />
                          }
                        </div>

                        { hasSubmitted &&
                          <div class="notification is-success">
                            <p>Your submission has been entered!</p>
                          </div>
                        }
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  hasSubmitted: state.id != null
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
