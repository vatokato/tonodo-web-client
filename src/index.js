import React from 'react';
import ReactDOM from 'react-dom';
import App from './connectors/app';
import * as serviceWorker from './serviceWorker';
import { initStore } from './redux/store';
import { Provider } from 'react-redux';
import { init as initApp } from './actions/app';

const store = initStore();
store.dispatch(initApp());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
