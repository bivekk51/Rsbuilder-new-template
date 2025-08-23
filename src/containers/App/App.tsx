/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Space } from 'antd';



import '../../App.css';
import AppRoutes from '../../routes/AppRoutes';


interface AppProps {
  isDarkMode: boolean;
  data: any;
  loading: boolean;
  error: string | null;
  appLoaded: boolean;
  toggleTheme: () => void;
  onDefaultAction: () => void;
  setAppLoaded: () => void;
}

const App: React.FC<AppProps> = ({
  isDarkMode,
  data,
  loading,
  error,
  appLoaded,
  toggleTheme,
  onDefaultAction,
  setAppLoaded,
}) => {
  const { t } = useTranslation();

  // useEffect(() => {
  //   // Simulate app initialization (you can add real initialization logic here)
  //   const timer = setTimeout(() => {
  //     setAppLoaded();
  //   }, 2000); // Show splash screen for 2 seconds

  //   return () => clearTimeout(timer);
  // }, [setAppLoaded]);

  // // Show splash screen while app is loading
  // if (!appLoaded) {
  //   return <SplashScreen />;
  // }

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
