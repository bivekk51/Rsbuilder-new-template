import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { appSelectors } from '../containers/App/selectors';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector(appSelectors.token);
  return !token ? <>{children}</> : <Navigate to="/account" replace />;
};

export default PublicRoute;
