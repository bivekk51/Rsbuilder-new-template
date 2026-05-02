/*
 *
 * Test reducer
 *
 */

import { createReducer } from '@reduxjs/toolkit';
import { defaultAction, defaultActionSuccess, defaultActionError } from './actions';

export interface TestState {
  data: any;
  loading: boolean;
  error: string | null;
}

export const initialState: TestState = {
  data: null,
  loading: false,
  error: null,
};

const testReducer = createReducer(initialState, (builder) => {
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
    });
});

export default testReducer;
