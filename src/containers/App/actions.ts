/*
 *
 * App actions
 *
 */

import { createAction } from '@reduxjs/toolkit';
import appConstants from './constants';

export const defaultAction = createAction(
  appConstants.DEFAULT_ACTION,
  function prepare() {
    return { payload: {} };
  },
);

export const defaultActionSuccess = createAction(
  appConstants.DEFAULT_ACTION_SUCCESS,
  function prepare(data: any) {
    return { payload: { data } };
  },
);

export const defaultActionError = createAction(
  appConstants.DEFAULT_ACTION_ERROR,
  function prepare(error: any) {
    return { payload: { error } };
  },
);

export const toggleTheme = createAction(appConstants.TOGGLE_THEME);

export const setAppLoaded = createAction(appConstants.SET_APP_LOADED);
