import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
        <div>Hello</div>
        </>
      }
    />
 

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
