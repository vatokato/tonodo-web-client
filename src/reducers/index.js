import appReducer from './app';
import blogReducer from './blog';
import tasksReducer from './tasks';
import userReducer from './user';
import taskFoldersReducer from './taskFolders';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  app: appReducer,
  blogPage: blogReducer,
  tasks: tasksReducer,
  user: userReducer,
  taskFolders: taskFoldersReducer,
});

export default reducer;
