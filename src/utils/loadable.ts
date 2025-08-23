import React, { lazy, Suspense, ComponentType } from 'react';

interface LoadableOptions {
  fallback?: React.ReactNode;
}

const loadable = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  { fallback = null }: LoadableOptions = {}
): React.ComponentType<React.ComponentProps<T>> => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => 
    React.createElement(
      Suspense,
      { fallback },
      React.createElement(LazyComponent, props)
    );
};

export default loadable;
