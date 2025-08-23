import { configureAppStore } from './configureStore';

// Create and export the store instance
const { store, persistor } = configureAppStore();
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
