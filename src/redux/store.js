import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
// import ReduxThunk from "redux-thunk";
import tasksMiddleware from "./tasksMiddleware";
import taskFoldersMiddleware from "./taskFoldersMiddleware";
import userMiddleware from "./userMiddleware";
import appMiddleware from "./appMiddleware";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const initStore = (preloadedState = undefined) => {
  return createStore(
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
  )
};

export default initStore;
