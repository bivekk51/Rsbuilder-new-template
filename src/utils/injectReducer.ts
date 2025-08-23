import React, { useEffect } from 'react';
import { useStore } from 'react-redux';

// Type for the enhanced store with injection capabilities
interface EnhancedStore {
  injectedReducers: Record<string, any>;
  injectedSagas: Record<string, any>;
  runSaga: any;
  injectReducer: (key: string, reducer: any) => void;
  injectSaga: (key: string, saga: any) => void;
  ejectReducer: (key: string) => void;
  ejectSaga: (key: string) => void;
}

export function useInjectReducer(key: string, reducer: any) {
  const store = useStore() as any as EnhancedStore;

  useEffect(() => {
    store.injectReducer(key, reducer);

    // Cleanup function to eject reducer when component unmounts (optional)
    return () => {
      // store.ejectReducer(key); // Uncomment if you want to eject on unmount
    };
  }, [key, reducer, store]);
}

export function useInjectSaga(key: string, saga: any) {
  const store = useStore() as any as EnhancedStore;

  useEffect(() => {
    console.log("Injecting saga:", key);
    store.injectSaga(key, saga);

    // Cleanup function to eject saga when component unmounts
    return () => {
      // store.ejectSaga(key);
    };
  }, [key, saga, store]);
}

// React Boilerplate style HOC functions
export default function useInjectReducer_HOC({
  key,
  reducer,
}: {
  key: string;
  reducer: any;
}) {
  return function <P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function WithReducerComponent(props: P) {
      useInjectReducer(key, reducer);
      return React.createElement(WrappedComponent, props);
    };
  };
}

export function useInjectSaga_HOC({ key, saga }: { key: string; saga: any }) {
  return function <P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function WithSagaComponent(props: P) {
      useInjectSaga(key, saga);
      return React.createElement(WrappedComponent, props);
    };
  };
}
