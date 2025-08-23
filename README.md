# Rspack + React + Redux-Saga Boilerplate

A modern, scalable React application template using Rspack, Redux Toolkit, Redux-Saga, dynamic reducer/saga injection, i18n, and a professional API structure. Inspired by React Boilerplate, this template is ready for large projects and team use.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Environment](#setup--environment)
- [Locales & i18n](#locales--i18n)
- [Redux & Dynamic Injection](#redux--dynamic-injection)
- [API Layer & Usage](#api-layer--usage)
- [Error Handling](#error-handling)
- [Adding a New Feature](#adding-a-new-feature)
- [Scripts](#scripts)
- [Best Practices](#best-practices)

---

## Features
- Dynamic reducer and saga injection (React Boilerplate style)
- Redux Toolkit & Redux-Saga
- TypeScript throughout
- Reselect selectors
- i18n multilanguage support (English, Japanese, Brazilian Portuguese)
- Professional API structure (env-driven, full URL from saga, custom headers)
- Code splitting with `Loadable.ts`
- Centralized error handling
- Plop generator for containers
- Ready for large teams and scalable codebases

---

## Project Structure
```
src/
├── store/
│   ├── configureStore.ts    # Store config with dynamic injection
│   ├── index.ts            # Store instance/types
│   └── StoreProvider.tsx   # Redux Provider + PersistGate
├── utils/
│   ├── injectReducer.ts    # Hooks/HOCs for reducer/saga injection
│   ├── injectSaga.ts       # Hooks/HOCs for saga injection
│   └── errorHandler.ts     # API error handler
├── services/
│   ├── api.ts              # API client (no baseURL logic)
│   └── apiConstants.ts     # Endpoints, headers, base URL (from env)
├── containers/
│   └── Feature/            # React Boilerplate pattern
│       ├── actions.ts      # Action creators
│       ├── constants.ts    # Action type constants
│       ├── Feature.tsx     # Presentation component
│       ├── index.tsx       # Container (logic & dispatch)
│       ├── Loadable.ts     # Code splitting wrapper
│       ├── reducer.ts      # State management
│       ├── saga.ts         # Side effects
│       └── selectors.ts    # Memoized selectors
├── locales/                # i18n translation files
├── i18n.ts                 # i18n initialization
└── main.tsx                # App entry point
```

---

## Setup & Environment

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Environment variables:**
   - Set your API base URL in `.env` (Rspack uses `API_BASE_URL`):
     ```env
     API_BASE_URL=http://localhost:3001/api
     ```
   - Rspack injects this via `EnvironmentPlugin` in `rspack.config.ts`.
   - Access it in code as `import.meta.env.API_BASE_URL`.
3. **Start dev server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Locales & i18n

- All translations are in `src/locales/` (`en.json`, `ja.json`, `pt-BR.json`).
- i18n is initialized in `src/i18n.ts` using `react-i18next`.
- Usage in a component:
  ```tsx
  import { useTranslation } from 'react-i18next';
  const { t } = useTranslation();
  return <h1>{t('welcome')}</h1>;
  ```
- To add a new language, add a new JSON file in `locales/` and update `i18n.ts`.
- To switch language, use `i18n.changeLanguage('ja')` or similar.

---

## Redux & Dynamic Injection

- Store is configured in `src/store/configureStore.ts` with dynamic reducer/saga injection.
- Use hooks in containers:
  ```ts
  import { useInjectReducer, useInjectSaga } from '../../utils/injectReducer';
  useInjectReducer('feature', featureReducer);
  useInjectSaga('feature', featureSaga);
  ```
- For class components, use HOCs:
  ```ts
  import useInjectReducer_HOC, { useInjectSaga_HOC } from '../../utils/injectReducer';
  export default compose(
    useInjectReducer_HOC({ key, reducer }),
    useInjectSaga_HOC({ key, saga }),
    connect(mapStateToProps, mapDispatchToProps),
  )(Feature);
  ```
- Selectors are created with Reselect in `selectors.ts` and used with `createStructuredSelector`.

---

## API Layer & Usage

- All endpoints and headers are defined in `services/apiConstants.ts`.
- The base URL is injected via Rspack and accessed as `import.meta.env.API_BASE_URL`.
- The API client (`api.ts`) does not use a base URL internally; always pass the full URL from the saga.
- Pass custom headers and options from the saga as needed.
- Use `handleApiError` for robust error handling.

**Example saga:**
```ts
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

---

## Error Handling
- All API errors are processed by `handleApiError` in `src/utils/errorHandler.ts`.
- Sagas check for errors in both the response and the catch block for robust error handling.

---

## Adding a New Feature (React Boilerplate Pattern)

1. **Generate a new container using Plop:**
   ```powershell
   npm run generate
   ```
   - Follow the prompts to name your feature/container. This will scaffold all required files in `src/containers/YourFeature/`.
2. **Edit the generated files:**
   - `constants.ts` - Define action type constants
   - `actions.ts` - Create action creators
   - `reducer.ts` - Implement state management
   - `saga.ts` - Add side effects (API, async, business logic)
   - `selectors.ts` - Create memoized selectors
   - `YourFeature.tsx` - Presentation component
   - `index.tsx` - Container component (injects reducer/saga, connects to Redux)
   - `Loadable.ts` - Code splitting wrapper
3. **Follow the pattern:**
   - Use `useInjectReducer` and `useInjectSaga` in your container.
   - Use Reselect for selectors.
   - Use action creators and constants for all Redux actions.
   - Use the API client for all API calls.
   - Use i18n for all user-facing text.

---

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run generate` - Run the Plop generator to scaffold a new container/feature

---

## Best Practices
- Never hardcode base URLs in code; always use env + constants.
- Use dynamic injection for reducers and sagas for code splitting.
- Use Reselect for selectors to optimize performance.
- Use i18n for all user-facing text.
- Use centralized error handling for all API calls.
- Keep all API and saga logic clean, DRY, and well-documented.
- Use the Plop generator for consistent container structure.

---

## Credits
- Inspired by [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)
- Powered by [Rspack](https://www.rspack.dev/), [Redux Toolkit](https://redux-toolkit.js.org/), [Redux-Saga](https://redux-saga.js.org/), [react-i18next](https://react.i18next.com/)

---

This template is ready for production and team use. For more details, see the code comments and the example containers in `src/containers/`.
