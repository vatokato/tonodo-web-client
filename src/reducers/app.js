import {handleActions} from 'redux-actions';

import {
  init,
  setSocketStatus,
} from '../actions/app';


const initialState = {
  socketStatus: 'disconnected',
};

export default handleActions({
  [init]: (store, action) => {
    return {
      ...store,
    }
  },
  [setSocketStatus]: (store, { payload }) => {
    return {
      ...store,
      socketStatus: payload,
    }
  },
}, initialState);
