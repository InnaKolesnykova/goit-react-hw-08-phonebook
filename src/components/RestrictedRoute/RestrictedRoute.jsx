import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = ({children}) => {
  const token = useSelector(state => state.auth.token);
  return token ? <Navigate to="/contacts" /> : children;
};

export default RestrictedRoute;