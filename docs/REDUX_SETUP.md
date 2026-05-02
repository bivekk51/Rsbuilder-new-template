# React Redux Saga Dynamic Store Setup

This project demonstrates a React application with Redux and Redux-Saga, featuring dynamic store loading (like React Boilerplate), i18n, and a professional API structure. It supports lazy loading of reducers and sagas, scalable code generation, and robust error handling.

## Features

- **Dynamic Reducer Injection**: Load reducers dynamically when containers mount
- **Dynamic Saga Injection**: Load sagas dynamically when containers mount
- **React Boilerplate Architecture**: Container/component separation
- **TypeScript Support**: Fully typed Redux store and components
- **Redux Toolkit**: Modern Redux with less boilerplate
- **Redux Saga**: Handle side effects with generators
- **Reselect**: Memoized selectors for performance
- **i18n**: Multilanguage support (EN, JA, PT-BR)
- **API Layer**: Professional, environment-driven API structure

## Project Structure

```
src/
├── store/
│   ├── configureStore.ts    # Enhanced store configuration with injection capabilities
│   ├── index.ts            # Store instance and type exports
│   └── StoreProvider.tsx   # Combines Redux Provider and PersistGate
├── utils/
│   ├── injectReducer.ts    # Hooks and HOCs for dynamic injection
│   ├── injectSaga.ts       # Hooks and HOCs for dynamic saga injection
│   └── errorHandler.ts     # Centralized API error handling
├── services/
│   ├── api.ts              # API client (no baseURL logic, accepts full URL)
│   └── apiConstants.ts     # API endpoints, headers, and base URL (from import.meta.env)
├── containers/
│   └── Feature/            # Each feature follows React Boilerplate pattern
│       ├── actions.ts      # Action creators
│       ├── constants.ts    # Action type constants
│       ├── Feature.tsx     # Pure component (presentation)
│       ├── index.tsx       # Container (logic & dispatch)
│       ├── Loadable.ts     # Code splitting wrapper
│       ├── reducer.ts      # State management
│       ├── saga.ts         # Side effects
│       └── selectors.ts    # Memoized state selectors
├── locales/                # i18n translation files
├── i18n.ts                 # i18n initialization
└── main.tsx                # App entry point with StoreProvider
```

## Container Pattern

Each container follows the React Boilerplate pattern:

1. **`Feature.tsx`** - Pure presentation component
2. **`index.tsx`** - Container: injects reducer/saga, connects to Redux, passes props
3. **`selectors.ts`** - Memoized selectors using Reselect
4. **`actions.ts`** - Action creators
5. **`constants.ts`** - Action type constants
6. **`reducer.ts`** - Pure reducer function
7. **`saga.ts`** - Side effect handlers (API, async, business logic)
8. **`Loadable.ts`** - Code splitting wrapper

### Example Container Structure

```tsx
// Feature.tsx (Presentation Component)
const Feature: React.FC<FeatureProps> = ({ data, loading, error, onLoad }) => (
  <div>{/* UI logic only */}</div>
);

// index.tsx (Container Component)
import { useInjectReducer, useInjectSaga } from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

const key = 'feature';

const FeatureContainer: React.FC = () => {
  useInjectReducer(key, reducer);
  useInjectSaga(key, saga);
  // ...Redux logic (useSelector, useDispatch, etc.)
  return <Feature ... />;
};
```

### Selector Pattern

```ts
// selectors.ts
import { createSelector } from '@reduxjs/toolkit';

const selectFeatureDomain = (state: any) => state.feature || {};

export const makeSelectData = () =>
  createSelector(selectFeatureDomain, (substate) => substate.data);

export const makeSelectLoading = () =>
  createSelector(selectFeatureDomain, (substate) => substate.loading);

// Usage in container
import { createStructuredSelector } from 'reselect';
const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
});
```

### Dynamic Injection

Use the provided hooks for dynamic injection:

```ts
import { useInjectReducer, useInjectSaga } from '../../utils/injectReducer';

const key = 'feature';
useInjectReducer(key, reducer);
useInjectSaga(key, saga);
```

Or use the HOC versions for class components:

```ts
import useInjectReducer_HOC, { useInjectSaga_HOC } from '../../utils/injectReducer';

export default compose(
  useInjectReducer_HOC({ key, reducer }),
  useInjectSaga_HOC({ key, saga }),
  connect(mapStateToProps, mapDispatchToProps),
)(Feature);
```

## API Usage

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

## Benefits

1. **Separation of Concerns**: Clear distinction between containers and components
2. **Reusability**: Components can be reused with different containers
3. **Testability**: Easy to test components and containers separately
4. **Performance**: Memoized selectors prevent unnecessary re-renders
5. **Code Splitting**: Only load features when needed
6. **Maintainability**: Standardized structure across all features
7. **Type Safety**: Full TypeScript support throughout
8. **Scalable API**: Professional, environment-driven API structure

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Usage Example

The project includes several complete examples (see `src/containers/`).

## Extending

To add a new feature following the React Boilerplate pattern:

1. Create a new directory in `src/containers/NewFeature/`
2. Create all required files:
   - `constants.ts` - Action type constants
   - `actions.ts` - Action creators
   - `reducer.ts` - State management
   - `saga.ts` - Side effects
   - `selectors.ts` - Memoized selectors
   - `NewFeature.tsx` - Presentation component
   - `index.tsx` - Container component
   - `Loadable.ts` - Code splitting wrapper
3. Follow the established patterns from existing containers
4. Use `useInjectReducer` and `useInjectSaga` in your container

This setup provides a production-ready foundation for scalable React applications with complex state management needs, following the proven React Boilerplate architecture and modern API best practices.
