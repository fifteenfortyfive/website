import { h, render } from 'preact';
import { Provider } from 'react-redux';
import App from './old-admin/app';
import { store } from './old-admin/reducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, far);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#admin-container')
);
