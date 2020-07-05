import appReducer from './app';
import blogReducer from './blog';
import tasksReducer from './tasks';
import userReducer from './user';
import taskFoldersReducer from './taskFolders';
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'tonodo-user',
  storage: storage,
  blacklist: ['authError', 'regError'],
}

const reducer = combineReducers({
  app: appReducer,
  blogPage: blogReducer,
  tasks: tasksReducer,
  user: persistReducer(userPersistConfig, userReducer),
  taskFolders: taskFoldersReducer,
});

export default reducer;
