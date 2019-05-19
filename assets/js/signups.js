import { h, render } from 'preact';
import { Provider, connect } from 'preact-redux';
import App from './signups/app';
import {store} from './signups/reducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, far, fas);

render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector('#signups-container'));
