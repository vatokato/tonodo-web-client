import { createSelector } from 'reselect'
import propOr from 'lodash/fp/propOr';
import { getActiveFolder } from "./taskFolders";

const selectTasks = state => state.tasks || {};

export const getTasks = createSelector(
  [selectTasks, getActiveFolder],
  ({ items = [] }, activeFolder) => {
    const filter = activeFolder.filter || 'default';
    const filtered = tasksFilters[filter](items, activeFolder);
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
);

export const getNewTaskText = createSelector(
  selectTasks,
  propOr('', 'newTaskText')
);


const tasksFilters = {
  default: (items, activeFolder) => items.filter(item => item.folderId === activeFolder._id && !item.deleted),
  showAll: (items) => items.filter(item => !item.deleted),
  showDeleted: (items) => items.filter(item => item.deleted),
};