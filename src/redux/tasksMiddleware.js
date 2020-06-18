import axios from 'axios';
import {
  requestList,
  successList,
  failureList,
  requestItem,
  successItem,
  failureItem,
  addTask,
  changeNewTaskText,
  doneTask,
  unDoneTask,
  deleteTask,
  successPatchTask, failurePatchTask, loadList, editTaskTitle,
} from '../actions/tasks';
import { getNewTaskText } from "../selectors/tasks";
import { getToken } from "../selectors/user";
import { getActiveFolder } from "../selectors/taskFolders";
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
      store.dispatch(await getTasks(state, action, instance));
      break;
    case addTask.toString():
      store.dispatch(requestItem());
      store.dispatch(await createTask(state, action, instance));
      store.dispatch(changeNewTaskText(''));
      break;
    case doneTask.toString():
      store.dispatch(await patchTask({ completed: true }, state, action, instance));
      break;
    case editTaskTitle.toString():
      const { title } = action.payload;
      store.dispatch(await patchTask({ title }, state, action, instance));
      break;
    case unDoneTask.toString():
      store.dispatch(await patchTask({ completed: false }, state, action, instance));
      break;
    case deleteTask.toString():
      store.dispatch(await patchTask({ deleted: true }, state, action, instance));
      break;
    default:
      break;
  }
}

export const getTasks = async (store, action, axios) => {
  try {
    const response = await axios.get('/tasks');
    return {
      type: successList.toString(),
      payload: response.data
    };
  } catch (e) {
    return failureList();
  }
};

export const createTask = async (state, action, axios) => {
  const title = getNewTaskText(state);
  const { _id: folderId } = getActiveFolder(state);
  try {
    const response = await axios.post('/tasks', {
      title,
      folderId,
    });
    return {
      type: successItem.toString(),
      payload: response.data
    };
  } catch (e) {
    return failureItem();
  }
};

export const patchTask = async (data, state, action, axios) => {
  const { id } = action.payload;
  const activeFolder = getActiveFolder(state);
  console.log(activeFolder);
  try {
    const { data: response } = await axios.patch(`/tasks/${id}`, data);
    if (response.error) {
      throw new Error(response.error);
    }
    return {
      type: successPatchTask.toString(),
      payload: response,
    };
  } catch (error) {
    console.error(error);
    return failurePatchTask(error.message);
  }
};
