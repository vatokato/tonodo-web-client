import React from 'react';
import ReactDOM from 'react-dom';
import App from './connectors/app';
import * as serviceWorker from './serviceWorker';
import { initStore } from './redux/store';
import { Provider } from 'react-redux';
import { init as initApp } from './actions/app';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = initStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={ null }
      persistor={ persistor }
      onBeforeLift={() => store.dispatch(initApp())}
    >
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
