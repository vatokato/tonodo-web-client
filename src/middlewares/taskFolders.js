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
import { getAxios } from "../services/axios-singleton";

export default store => next => async action => {
  next(action);
  const state = store.getState();

  switch (action.type) {
    case loadList.toString():
      store.dispatch(requestList());
      store.dispatch(await getFolders(state, action));
      break;
    case addFolder.toString():
      store.dispatch(requestItem());
      store.dispatch(await createFolder(state, action));
      store.dispatch(changeNewFolderText(''));
      break;
    case deleteFolder.toString():
      const activeFolder = getActiveFolder(state);
      store.dispatch(requestDeleteFolder());
      store.dispatch(await removeFolder(state, action));
      if(action.payload.id === activeFolder._id) {
        store.dispatch(changeFolder('1'));
      }
      break;
    default:
      break;
  }
}

export const getFolders = async (state, action) => {
  const token = getToken(state);
  const axios = getAxios(token);

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

export const createFolder = async (state, action) => {
  const token = getToken(state);
  const axios = getAxios(token);
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

export const removeFolder = async (state, action) => {
  const token = getToken(state);
  const axios = getAxios(token);
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
