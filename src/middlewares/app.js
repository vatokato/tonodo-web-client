import {
  init, setSocketStatus,
} from '../actions/app';
import { logout, successAuth, successReg } from '../actions/user';
import {
  changeFolder,
  loadList as loadFolders,
  successDeleteFolder,
  successItem as successCreateFolder,
  successList as setFolders
} from "../actions/taskFolders";
import {
  loadList as loadTasks,
  successList as setTasks,
  successItem as successCreateItem,
  successPatchTask,
} from "../actions/tasks";
import { getSocket, removeSocket } from "../services/socket";
import { getUser } from "../selectors/user";

export default store => next => async action => {
  next(action);
  const state = store.getState();

  switch(action.type) {
    case init.toString():
      const user = getUser(state);
      if (user._id) {
        await store.dispatch(successAuth(user));
      }
      break;
    case successReg.toString():
    case successAuth.toString():
      store.dispatch(loadTasks());
      store.dispatch(loadFolders());

      const socket = getSocket(action.payload._id);
      socket.on('connect', (message) => {
        store.dispatch(setSocketStatus('connected'));
      });
      socket.on('disconnect', () => {
        store.dispatch(setSocketStatus('disconnected'));
      });
      socket.on('message', (message) => {
        console.log('message: ', message);
      });
      socket.on('syncFolders', () => {
        console.log('syncFolders');
        store.dispatch(loadFolders());
      });
      socket.on('syncTasks', () => {
        console.log('syncTasks');
        store.dispatch(loadTasks());
      });
      break;
    case logout.toString():
      store.dispatch(setFolders([]));
      store.dispatch(changeFolder('1'));
      store.dispatch(setTasks([]));
      {
        const socket = getSocket();
        socket.disconnect();
        removeSocket();
      }
      break;
    case successCreateFolder.toString():
    case successDeleteFolder.toString():
      {
        const socket = getSocket();
        socket.emit('syncFolders');
      }
      break;
    case successCreateItem.toString():
    case successPatchTask.toString():
      {
        const socket = getSocket();
        socket.emit('syncTasks');
      }
      break;
    default:
      break;
  }
}