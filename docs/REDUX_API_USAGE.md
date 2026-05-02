# Redux API Usage Pattern

## API Constants
- All endpoints are defined in `src/services/apiConstants.ts`.
- The base URL is injected via Rspack's EnvironmentPlugin and accessed as `import.meta.env.API_BASE_URL`.
- Endpoints are always relative paths (e.g. `/auth/merchant/login`).

**Example:**
```ts
export const BASE_API = import.meta.env.API_BASE_URL || 'http://localhost:3000/api';
export const APIEndPoints = {
  auth: {
    USER_LOGIN: '/auth/merchant/login',
    USER_LOGOUT: '/auth/merchant/logout',
  },
};
```

## API Client Usage
- Use the `apiClient` from `src/services/api.ts` for all API calls.
- Pass the full URL (BASE_API + endpoint) and any custom headers/options from the saga.

**Example:**
```ts
import { apiClient, APIEndPoints, APIHeaders, APIHeadersWithAuth, BASE_API } from 'src/services/api';

apiClient.post(
  BASE_API + APIEndPoints.auth.USER_LOGIN,
  { username, password },
  { headers: APIHeadersWithAuth(token) }
);
```

## Saga Example
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

## Error Handling
- Use `handleApiError` for all API errors.
- Always check for errors in both the response and the catch block in your sagas.

## Best Practices
- Do not hardcode base URLs in your code.
- Use constants for all endpoints and headers.
- Pass all options (headers, timeout, etc.) from the saga for flexibility.
- Keep API and saga logic clean and well-documented.

---

This pattern ensures maintainability and scalability for your team.
