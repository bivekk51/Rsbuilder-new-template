/*
 *
 * App reducer
 *
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  defaultAction,
  defaultActionSuccess,
  defaultActionError,
  toggleTheme,
  setAppLoaded,
} from './actions';

export interface AppState {
  data: any;
  loading: boolean;
  error: string | null;
  isDarkMode: boolean;
  token: string | null;
  appLoaded: boolean;
}

export const initialState: AppState = {
  data: null,
  loading: false,
  error: null,
  isDarkMode: false,
  token: null,
  appLoaded: false,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(defaultAction, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(defaultActionSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(defaultActionError, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    })
    .addCase(toggleTheme, (state) => {
      console.log('Toggling theme mode');
      state.isDarkMode = !state.isDarkMode;
    })
    .addCase(setAppLoaded, (state) => {
      state.appLoaded = true;
    });
});

export default appReducer;
