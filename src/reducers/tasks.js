import {handleActions} from 'redux-actions';
import {
  init,
  requestList,
  successList,
  failureList,
  requestItem,
  successItem,
  failureItem,
  successPatchTask,
  failurePatchTask,
  changeNewTaskText,
} from '../actions/tasks';

const initialState = {
  items: [],
  newTaskText: '',
};

export default handleActions({
  [init]: (store, action) => {
    return {
      ...store,
      listStatus: 'initial',
    }
  },
  [requestList]: (store, action) => {
    return {
      ...store,
      listStatus: 'request',
    };
  },
  [failureList]: (store, action) => {
    return {
      ...store,
      listStatus: 'failure',
      error: action.payload,
    };
  },
  [successList]: (store, action) => {
    return {
      ...store,
      items: [...initialState.items, ...action.payload],
      listStatus: 'success',
    }
  },
  [requestItem]: (store, action) => {
    return {
      ...store,
      itemStatus: 'request',
    };
  },
  [failureItem]: (store, action) => {
    return {
      ...store,
      itemStatus: 'failure',
      error: action.payload,
    };
  },
  [successItem]: (store, action) => {
    return {
      ...store,
      items: [...store.items, action.payload],
      itemStatus: 'success',
    }
  },
  [successPatchTask]: (store, { payload }) => {
    return {
      ...store,
      items: store.items.map(item => item._id === payload._id ? payload : item)
    }
  },
  [failurePatchTask]: (store, { payload }) => {
    return {
      ...store,
      error: payload,
    }
  },
  [changeNewTaskText]: (store, { payload }) => ({
    ...store,
    newTaskText: payload.text,
  }),
}, initialState);
