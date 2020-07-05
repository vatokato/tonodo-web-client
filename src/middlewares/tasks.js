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
import { getAxios } from "../services/axios-singleton";

export default store => next => async action => {
  next(action);
  const state = store.getState();

  switch (action.type) {
    case loadList.toString():
      store.dispatch(requestList());
      store.dispatch(await getTasks(state, action));
      break;
    case addTask.toString():
      store.dispatch(requestItem());
      store.dispatch(await createTask(state, action));
      store.dispatch(changeNewTaskText(''));
      break;
    case doneTask.toString():
      store.dispatch(await patchTask({ completed: true }, state, action));
      break;
    case editTaskTitle.toString():
      const { title } = action.payload;
      store.dispatch(await patchTask({ title }, state, action));
      break;
    case unDoneTask.toString():
      store.dispatch(await patchTask({ completed: false }, state, action));
      break;
    case deleteTask.toString():
      store.dispatch(await patchTask({ deleted: true }, state, action));
      break;
    default:
      break;
  }
}

export const getTasks = async (state, action) => {
  const token = getToken(state);
  const axios = getAxios(token);
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

export const createTask = async (state, action) => {
  const token = getToken(state);
  const axios = getAxios(token);
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

export const patchTask = async (data, state, action) => {
  const token = getToken(state);
  const axios = getAxios(token);
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
