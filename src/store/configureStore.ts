import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web
import { PersistConfig } from 'redux-persist/lib/types';
import appReducer from '../containers/App/reducer';

// Static reducers that are always present
const staticReducers = {
  app: appReducer,
};

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Persist configuration for specific reducers
const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['app'], // Only persist these reducers
};

// Store enhancer for dynamic reducers
function createReducer(injectedReducers = {}) {
  // Use Partial to allow undefined for each reducer (for initial state)
  const rootReducer = {
    ...staticReducers,
    ...injectedReducers,
  };

  // If no reducers, return a dummy reducer with _persist property
  if (Object.keys(rootReducer).length === 0) {
    // Return a dummy reducer that initializes _persist state

    return (
      state = {
        _persist: { version: persistConfig.version ?? -1, rehydrated: false },
      },
    ) => state;
  }

  // Explicitly type the combined reducer state as Partial
  return persistReducer(
    persistConfig,
    combineReducers(rootReducer as Partial<typeof rootReducer>) as any,
  );
}

export function configureAppStore(
  initialState = { _persist: { version: -1, rehydrated: false } },
) {
  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(sagaMiddleware, logger) as any,

    devTools: process.env.NODE_ENV !== 'production',
  });

  // Extensions for dynamic loading
  (store as any).injectedReducers = {} as Record<string, any>; // Reducer registry
  (store as any).injectedSagas = {} as Record<string, any>; // Saga registry
  (store as any).runSaga = sagaMiddleware.run; // Saga runner

  // Function to inject reducers
  (store as any).injectReducer = (key: string, reducer: any) => {
    if ((store as any).injectedReducers[key]) {
      return; // Already injected
    }

    (store as any).injectedReducers[key] = reducer;
    store.replaceReducer(createReducer((store as any).injectedReducers) as any);
  };
  // Function to inject sagas
  (store as any).injectSaga = (key: string, saga: any) => {
    const hasSaga = Boolean((store as any).injectedSagas[key]);

    if (hasSaga) {
      (store as any).injectedSagas[key].task.cancel();
      (store as any).injectedSagas[key].task.toPromise().catch(() => {});
    }

    const task = (store as any).runSaga(saga);
    (store as any).injectedSagas[key] = { saga, task };
    
    // Return task to keep track of the saga execution
    return task;
  };

  // Function to eject reducers (optional)
  (store as any).ejectReducer = (key: string) => {
    if (!(store as any).injectedReducers[key]) {
      return;
    }

    delete (store as any).injectedReducers[key];
    store.replaceReducer(createReducer((store as any).injectedReducers) as any);
  };

  // Function to eject sagas (optional)
  (store as any).ejectSaga = (key: string) => {
    if (!(store as any).injectedSagas[key]) {
      return;
    }

    (store as any).injectedSagas[key].task.cancel();
    (store as any).injectedSagas[key].task.toPromise().catch(() => {});
    delete (store as any).injectedSagas[key];
  };
  (store as any).ejectSaga = (key: string) => {
    if (!(store as any).injectedSagas[key]) {
      return;
    }

    (store as any).injectedSagas[key].cancel();
    delete (store as any).injectedSagas[key];
  };

  // Create persistor
  const persistor = persistStore(store);
  (store as any).persistor = persistor;

  // Return correct type for store and persistor
  return { store, persistor } as const;
}
