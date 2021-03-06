import React from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";

import { Login } from '../Login';
import { PlaylistPage } from '../PlaylistPage';
import { useAuth } from '../AuthProvider';


function RequireAuth(props) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
}


export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <RequireAuth>
            <PlaylistPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
