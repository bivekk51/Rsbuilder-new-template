/*
 *
 * Test actions
 *
 */

import { createAction } from '@reduxjs/toolkit';
import testConstants from './constants';

export const defaultAction = createAction(
  testConstants.DEFAULT_ACTION,
  function prepare() {
    return { payload: {} };
  },
);

export const defaultActionSuccess = createAction(
  testConstants.DEFAULT_ACTION_SUCCESS,
  function prepare(data: any) {
    return { payload: { data } };
  },
);

export const defaultActionError = createAction(
  testConstants.DEFAULT_ACTION_ERROR,
  function prepare(error: any) {
    return { payload: { error } };
  },
);
