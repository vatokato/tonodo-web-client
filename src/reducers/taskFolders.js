import {handleActions} from 'redux-actions';
import {
  addFolder,
  changeFolder,
  changeNewFolderText,
  failureDeleteFolder,
  failureItem,
  failureList,
  init,
  requestDeleteFolder,
  requestItem,
  requestList,
  successDeleteFolder,
  successItem,
  successList
} from "../actions/taskFolders";
import { DEFAULT_FOLDERS } from "../constants";


const initialState = {
  items: DEFAULT_FOLDERS,
  newFolderText: '',
  activeFolder: DEFAULT_FOLDERS[0],
};

export default handleActions({
  [init]: (store, action) => {
    return {
      ...store,
    }
  },
  [requestList]: (store, action) => {
    return {
      ...store,
      statusList: 'request',
    };
  },
  [failureList]: (store, action) => {
    return {
      ...store,
      statusList: 'failure',
      error: action.payload,
    };
  },
  [successList]: (store, action) => {
    return {
      ...store,
      items: [...DEFAULT_FOLDERS, ...action.payload],
      statusList: 'success',
    }
  },
  [changeFolder]:  (store, { payload }) => {
    return ({
      ...store,
      activeFolder: store.items.find(folder => folder._id === payload.id),
    })
  },
  [changeNewFolderText]:  (store, { payload }) => ({
    ...store,
    newFolderText: payload.text,
  }),
  [addFolder]: (store, { payload }) => {
    return {
      ...store,
    }
  },
  [requestItem]: (store, action) => {
    return {
      ...store,
      statusItem: 'request',
    };
  },
  [failureItem]: (store, action) => {
    return {
      ...store,
      statusItem: 'failure',
      error: action.payload,
    };
  },
  [successItem]: (store, action) => {
    return {
      ...store,
      items: [...store.items, action.payload],
      statusItem: 'success',
    }
  },
  [requestDeleteFolder]: (store, action) => {
    return {
      ...store,
      statusDeleting: 'request',
    };
  },
  [failureDeleteFolder]: (store, action) => {
    return {
      ...store,
      statusDeleting: 'failure',
      error: action.payload,
    };
  },
  [successDeleteFolder]: (store, { payload }) => {
    return {
      ...store,
      items: store.items.filter(item => item._id !== payload),
      statusDeleting: 'success',
    }
  },
}, initialState);
