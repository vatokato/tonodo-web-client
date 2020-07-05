import {
  auth,
  requestAuth,
  successAuth,
  failureAuth, successReg, failureReg, reg, requestReg,
} from '../actions/user';
import { getAxios } from "../services/axios-singleton";

export default store => next => async action => {
  next(action);
  const state = store.getState();

  switch(action.type) {
    case auth.toString():
      store.dispatch(requestAuth());
      store.dispatch(await authorization(state, action));
      break;
    case reg.toString():
      store.dispatch(requestReg());
      store.dispatch(await registration(state, action));
      break;
    default:
      break;
  }
}

export const authorization = async (state, action) => {
  const axios = getAxios();
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

export const registration = async (state, action) => {
  const axios = getAxios();
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
