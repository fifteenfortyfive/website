import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const TeamsPage = (props) => {
  const {event} = props;

  return (
    <div class="container">
      <section class="section">
        <h1 class="title">2019 Teams</h1>

        <h2>{event ? event.name : "not loaded"}</h2>
      </section>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    teams: state.teams,
    accounts: state.accounts,
    games: state.games,
    event: state.events[props.eventId]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamsPage);
