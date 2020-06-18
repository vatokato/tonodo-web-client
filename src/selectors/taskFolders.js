import { createSelector } from 'reselect'
import propOr from 'lodash/fp/propOr';

const selectTaskFolders = state => state.taskFolders || {};

export const getActiveFolder = createSelector (
  selectTaskFolders,
  propOr({}, 'activeFolder')
);

export const getFolders = createSelector (
  [selectTaskFolders],
  propOr([], 'items')
);

export const getNewFolderText = createSelector (
  selectTaskFolders,
  propOr ('', 'newFolderText')
);
