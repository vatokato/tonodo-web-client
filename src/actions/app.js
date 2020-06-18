import {createActions} from 'redux-actions';

export const {
  init,
  setSocketStatus,
} = createActions({
  INIT: settings => settings,
  SET_SOCKET_STATUS: status => status,
}, { prefix: 'app' });

