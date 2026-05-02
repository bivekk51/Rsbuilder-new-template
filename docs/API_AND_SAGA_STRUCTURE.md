# Professional API & Redux Saga Structure

## 1. API Constants & Headers
- All API endpoints and headers are defined in `src/services/apiConstants.ts`.
- Endpoints are always **relative paths** (not full URLs).
- The base URL is set in one place (`BASE_API`) and injected via Rspack's EnvironmentPlugin.
- Use `import.meta.env.API_BASE_URL` in your code to access the base URL (see `apiConstants.ts`).

**Example:**
```ts
// src/services/apiConstants.ts
export const BASE_API = import.meta.env.API_BASE_URL || 'http://localhost:3000/api';
export const APIEndPoints = {
  auth: {
    USER_LOGIN: '/auth/merchant/login',
    USER_LOGOUT: '/auth/merchant/logout',
  },
  test: {
    DUMMY_API: '/test',
  },
};
export const APIHeaders = { ... };
export const APIHeadersWithAuth = (token?: string) => ({ ... });
```

## 2. API Client (`src/services/api.ts`)
- The API client does **not** use a base URL internally.
- Always pass the **full URL** (base + endpoint) from the saga or calling code.
- All HTTP methods (`get`, `post`, `put`, `delete`) accept custom headers and timeout.
- Uses a professional error handler (`handleApiError`).

**Example:**
```ts
import { apiClient, APIEndPoints, APIHeaders, APIHeadersWithAuth, BASE_API } from 'src/services/api';

apiClient.post(
  BASE_API + APIEndPoints.auth.USER_LOGIN,
  { username, password },
  { headers: APIHeadersWithAuth(token) }
);
```

## 3. Saga Usage
- Always pass the full URL and any custom headers/options from the saga.
- Check for errors in both the response body and the catch block.
- Use action creators for success/failure.

**Example:**
```ts
import { call, put } from 'redux-saga/effects';
import { apiClient, APIEndPoints, APIHeaders, APIHeadersWithAuth, BASE_API } from 'src/services/api';

export function* loginMerchantAsync({ payload }) {
  try {
    const { username, password, token } = payload;
    const res = yield call(
      apiClient.post,
      BASE_API + APIEndPoints.auth.USER_LOGIN,
      { username, password },
      { headers: token ? APIHeadersWithAuth(token) : APIHeaders }
    );
    if (res && res.error) {
      yield put(loginMerchantFailure(res.error));
    } else {
      yield put(loginMerchantSuccess(res));
    }
  } catch (error) {
    yield put(loginMerchantFailure(error?.message || 'Unknown error'));
  }
}
```

## 4. Error Handling
- All errors are processed by `handleApiError` in `src/utils/errorHandler.ts`.
- Sagas check for errors in both the response and the catch block for robust error handling.

## 5. Best Practices
- **Never** hardcode base URLs in sagas or components.
- Always use constants for endpoints and headers.
- Pass all options (headers, timeout, etc.) from the saga for maximum flexibility.
- Keep all API and saga logic clean, DRY, and well-documented.

---

This template is ready for team use and scalable for large projects. See this file and `REDUX_API_USAGE.md` for more details and examples.
