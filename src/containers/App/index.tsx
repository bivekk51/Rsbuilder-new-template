/**
 *
 * App
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from '../../utils/injectSaga';
import useInjectReducer from '../../utils/injectReducer';
import App from './App';
import { appSelectors } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { defaultAction, toggleTheme, setAppLoaded } from './actions';

const key = 'app';

const mapStateToProps = createStructuredSelector({
  data: appSelectors.data,
  loading: appSelectors.loading,
  error: appSelectors.error,
  isDarkMode: appSelectors.isDarkMode,
  appLoaded: appSelectors.appLoaded,
});

function mapDispatchToProps(dispatch: any) {
  return {
    onDefaultAction: () => dispatch(defaultAction()),
    toggleTheme: () => dispatch(toggleTheme()),
    setAppLoaded: () => dispatch(setAppLoaded()),
  };
}

const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App) as React.ComponentType<any>;
