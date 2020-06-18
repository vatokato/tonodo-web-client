import {handleActions} from 'redux-actions';

import {
  failureAuth,
  requestAuth,
  successAuth,
  failureReg,
  requestReg,
  successReg,
  logout,
} from '../actions/user';


const initialState = {
  token: '',
};

export default handleActions({
  [requestAuth]: (store, action) => {
    return {
      ...store,
    }
  },
  [successAuth]: (store, { payload: user }) => {
    return {
      ...store,
      ...user,
    }
  },
  [failureAuth]: (store, { payload }) => {
    return {
      ...store,
      authError: payload,
    }
  },
  [requestReg]: (store, action) => {
    return {
      ...store,
    }
  },
  [successReg]: (store, { payload: user }) => {
    return {
      ...store,
      ...user,
    }
  },
  [failureReg]: (store, { payload }) => {
    return {
      ...store,
      regError: payload,
    }
  },
  [logout]: (store, action) => {
    return {}
  },
}, initialState);
