import axios from 'axios';
import {
  requestList,
  successList,
  failureList,
  requestItem,
  successItem,
  failureItem,
  addFolder,
  changeNewFolderText,
  deleteFolder,
  successDeleteFolder,
  failureDeleteFolder,
  requestDeleteFolder,
  changeFolder,
  loadList,
} from '../actions/taskFolders';
import { getToken } from "../selectors/user";
import { getActiveFolder, getNewFolderText } from "../selectors/taskFolders";
import { API_URL } from "../constants";

export default store => next => async action => {
  next(action);
  const state = store.getState();
  const token = getToken(state);

  const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  switch (action.type) {
    case loadList.toString():
      store.dispatch(requestList());
      store.dispatch(await getFolders(state, action, instance));
      break;
    case addFolder.toString():
      store.dispatch(requestItem());
      store.dispatch(await createFolder(state, action, instance));
      store.dispatch(changeNewFolderText(''));
      break;
    case deleteFolder.toString():
      const activeFolder = getActiveFolder(state);
      store.dispatch(requestDeleteFolder());
      store.dispatch(await removeFolder(state, action, instance));
      if(action.payload.id === activeFolder._id) {
        store.dispatch(changeFolder('1'));
      }
      break;
    default:
      break;
  }
}

export const getFolders = async (store, action, axios) => {
  try {
    const response = await axios.get('/taskFolders');
    return {
      type: successList.toString(),
      payload: response.data
    };
  } catch (e) {
    return failureList();
  }
};

export const createFolder = async (state, action, axios) => {
  const title = getNewFolderText(state);
  try {
    const response = await axios.post('/taskFolders', {
      title,
    });
    return {
      type: successItem.toString(),
      payload: response.data
    };
  } catch (e) {
    return failureItem();
  }
};

export const removeFolder = async (state, action, axios) => {
  const { id } = action.payload;
  try {
    const { data: response } = await axios.delete(`/taskFolders/${id}`);
    if (response.error) {
      throw new Error(response.error);
    }
    return {
      type: successDeleteFolder.toString(),
      payload: id,
    };
  } catch (error) {
    console.error(error);
    return failureDeleteFolder(error.message);
  }
};
