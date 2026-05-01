/**
 *
 * App
 *
 */

import { compose } from 'redux';

import useInjectSaga from '../../utils/injectSaga';
import useInjectReducer from '../../utils/injectReducer';
import App from './App';
import reducer from './reducer';
import saga from './saga';

const key = 'app';

const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
)(App) as React.ComponentType<any>;
