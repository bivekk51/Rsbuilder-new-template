/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import '../../App.css';
import AppRoutes from '../../routes/AppRoutes';
import { AppController } from './controller';
import { appSelectors } from './selectors';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state);

  /**
   * Initialize controller with dispatch and getState
   * Memoized to prevent unnecessary re-instantiation
   */
  const controller = useMemo(
    () => new AppController(dispatch, () => store),
    [dispatch, store],
  );

  // Get state from selectors
  const isDarkMode = useSelector(appSelectors.isDarkMode);
  const data = useSelector(appSelectors.data);
  const loading = useSelector(appSelectors.loading);
  const error = useSelector(appSelectors.error);
  const appLoaded = useSelector(appSelectors.appLoaded);

  return (
    <div
      className="App"
      style={{ margin: 0, padding: 0, minHeight: '100vh', width: '100%' }}
    >
      <AppRoutes />
    </div>
  );
};

export default App;
