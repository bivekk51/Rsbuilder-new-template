import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { appSelectors } from '../containers/App/selectors';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector(appSelectors.token);
  console.log('token fromt eh  PrivateRoute', token);
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
