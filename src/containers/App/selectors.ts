/*
 *
 * App selectors
 *
 */

import { createSelector } from 'reselect';
import { AppState, initialState } from './reducer';

const selectAppDomain = (state: any) => state.app || initialState;

const makeSelectApp = (key: keyof AppState) =>
  createSelector(selectAppDomain, (state: AppState) => state[key]);

export const appSelectors = {
  data: makeSelectApp('data'),
  loading: makeSelectApp('loading'),
  error: makeSelectApp('error'),
  isDarkMode: makeSelectApp('isDarkMode'),
  token: makeSelectApp('token'),
  appLoaded: makeSelectApp('appLoaded'),
};
