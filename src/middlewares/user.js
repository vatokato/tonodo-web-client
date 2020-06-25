import axios from 'axios';
import {
  auth,
  requestAuth,
  successAuth,
  failureAuth, successReg, failureReg, reg, requestReg,
} from '../actions/user';
import { API_URL } from "../constants";

export default store => next => async action => {
  next(action);
  const state = store.getState();

  const instance = axios.create({
    baseURL: API_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  switch(action.type) {
    case auth.toString():
      store.dispatch(requestAuth());
      store.dispatch(await authorization(state, action, instance));
      break;
    case reg.toString():
      store.dispatch(requestReg());
      store.dispatch(await registration(state, action, instance));
      break;
    default:
      break;
  }
}

export const authorization = async (state, action, axios) => {
  const { username, password } = action.payload;
  try {
    const response = await axios.post('/auth', {
      username,
      password,
    });
    return {
      type: successAuth.toString(),
      payload: response.data
    };
  } catch (error) {
    const { data } = error.response || {};
    return failureAuth((data && data.message) || 'Connect error. Try later');
  }
};

export const registration = async (state, action, axios) => {
  const { username, password, password2 } = action.payload;
  try {
    const response = await axios.post('/reg', {
      username,
      password,
      password2,
    });
    return {
      type: successReg.toString(),
      payload: response.data
    };
  } catch (error) {
    const { data } = error.response || {};
    return failureReg((data && data.message) || 'Connect error. Try later');
  }
};
