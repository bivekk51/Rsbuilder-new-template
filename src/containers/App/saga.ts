/*
 *
 * App saga
 *
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  defaultAction,
  defaultActionSuccess,
  defaultActionError,
} from './actions';
import { apiClient } from '../../services/api';
import { defaultApiResponseSchema } from '../../apischema/app/defaultResponse';

// Example API endpoint from JSONPlaceholder
const DEMO_API = 'https://jsonplaceholder.typicode.com/posts/1';

export function* defaultActionSaga(): Generator<any, void, any> {
  try {
    console.log('Executing default action saga');
    const response = yield call(apiClient.request, DEMO_API, {
      method: 'GET',
    });
    const parsed = defaultApiResponseSchema.safeParse(response);
    if (!parsed.success) {
      throw new Error(
        'Invalid API response: ' +
          JSON.stringify(parsed.error.issues),
      );
    }
    yield put(defaultActionSuccess(parsed.data));
  } catch (error) {
    yield put(
      defaultActionError(
        error instanceof Error ? error.message : 'An error occurred',
      ),
    );
  }
}

export default function* appSaga() {
  yield takeLatest(defaultAction.type, defaultActionSaga);
}
