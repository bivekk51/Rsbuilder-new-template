/**
 *
 * Test
 *
 * Container/Orchestration layer - initializes controller and wires to view
 */

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TestController } from './controller';
import { testSelectors } from './selectors';

interface TestProps {}

const Test: React.FC<TestProps> = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state);

  /**
   * Initialize controller with dispatch and getState
   * Memoized to prevent unnecessary re-instantiation
   */
  const controller = useMemo(
    () =>
      new TestController(dispatch, () => store),
    [dispatch, store],
  );

  // Get state from selectors
  const data = useSelector(testSelectors.data);
  const loading = useSelector(testSelectors.loading);
  const error = useSelector(testSelectors.error);

  return (
    <div>
      Test Container
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Test;
