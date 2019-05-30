import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as Actions from './actions';


class App extends Component {
  render() {
    return (
      <section class="section">
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
