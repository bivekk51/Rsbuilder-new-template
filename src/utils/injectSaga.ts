import React from 'react';
import { ReactReduxContext, ReactReduxContextValue } from 'react-redux';

/**
 * HOC to inject saga before the first render (constructor phase)
 * @param {string} key Saga key
 * @param {any} saga Saga function
 */
export default function withInjectSaga({
  key,
  saga,
}: {
  key: string;
  saga: any;
}) {
  return function <P extends object>(
    WrappedComponent: React.ComponentType<P>,
  ) {
    class InjectSaga extends React.Component<P> {
      static WrappedComponent = WrappedComponent;
      static contextType = ReactReduxContext;
      static displayName = `withInjectSaga(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      })`;
      declare context: React.ContextType<typeof ReactReduxContext>;

      constructor(props: P, context: ReactReduxContextValue) {
        super(props, context);
        if (context && context.store && (context.store as any).injectSaga) {
          (context.store as any).injectSaga(key, saga);
        }
      }

      componentWillUnmount() {
        if (this.context && this.context.store && (this.context.store as any).ejectSaga) {
          (this.context.store as any).ejectSaga(key);
        }
      }

      render() {
        return React.createElement(WrappedComponent, this.props);
      }
    }
    return InjectSaga;
  };
}
