import { h, render } from 'preact';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faArrowCircleDown, faUpload } from '@fortawesome/free-solid-svg-icons';

import App from './app/App';
import * as AuthActions from './app/modules/auth/AuthActions';
import { store } from './app/Reducer';

library.add(fab, far, faTrophy, faArrowCircleDown, faUpload);

store.dispatch(AuthActions.loadSession());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app-container')
);
