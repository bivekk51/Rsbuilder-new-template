/**
 *
 * Test
 *
 * Redux connection layer - ONLY place for reducer/saga injection
 */

import { compose } from 'redux';

import useInjectSaga from '../../utils/injectSaga';
import useInjectReducer from '../../utils/injectReducer';
import Test from './Test';
import reducer from './reducer';
import saga from './saga';

const key = 'test';

const withReducer = useInjectReducer({ key, reducer });
const withSaga = useInjectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
)(Test) as React.ComponentType<any>;
