import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import tasksMiddleware from "../middlewares/tasks";
import taskFoldersMiddleware from "../middlewares/taskFolders";
import userMiddleware from "../middlewares/user";
import appMiddleware from "../middlewares/app";
import { persistStore } from 'redux-persist';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const initStore = (preloadedState = undefined) => {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(
      // ReduxThunk,
      appMiddleware,
      userMiddleware,
      tasksMiddleware,
      taskFoldersMiddleware,
      // blogsMiddleware
    ))
  );

  const persistor = persistStore(store);

  return { store, persistor }
};

export default initStore;
