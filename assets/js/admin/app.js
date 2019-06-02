import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'preact-router';
import { createHashHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as Actions from './actions';

import IndexPage from './pages/index';
import SubmissionsPage from './pages/submissions';
import NotFoundPage from './pages/not-found';

class App extends Component {
  componentDidMount() {
    const {dispatch} = this.props;

    dispatch.fetchAccounts();
    dispatch.fetchGames();
    dispatch.fetchEvents();
  }

  render() {
    return (
      <div>
        <Router history={createHashHistory()}>
          <IndexPage path="/" />
          <SubmissionsPage path="/events/:eventId/submissions" />
          <NotFoundPage default />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
