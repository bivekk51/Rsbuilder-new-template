import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureAppStore } from './configureStore';

const { store, persistor } = configureAppStore();

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => (
  <Provider store={store}>
    <PersistGate
      loading={
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            color: '#555',
            fontWeight: 'bold',
            backgroundColor: 'red',
            width: '100%',
            position: 'absolute',
          }}
        >
          Loading...
        </div>
      }
      persistor={persistor}
    >
      {children}
    </PersistGate>
  </Provider>
);

export default StoreProvider;
export { store, persistor };
