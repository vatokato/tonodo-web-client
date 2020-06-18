import { createSelector } from 'reselect'

const selectApp = state => state.app || {};

export const getIsConnected = createSelector(
  selectApp,
  ({ socketStatus }) => socketStatus === 'connected',
);