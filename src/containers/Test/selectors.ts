/*
 *
 * Test selectors
 *
 */

import { createSelector } from 'reselect';
import { TestState, initialState } from './reducer';

const selectTestDomain = (state: any) => state.test || initialState;

const makeSelectData = () =>
  createSelector(selectTestDomain, (substate: TestState) => substate.data);

const makeSelectLoading = () =>
  createSelector(selectTestDomain, (substate: TestState) => substate.loading);

const makeSelectError = () =>
  createSelector(selectTestDomain, (substate: TestState) => substate.error);

export const testSelectors = {
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
};
