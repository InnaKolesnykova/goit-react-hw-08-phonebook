import React from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

import { Layout } from './Layout/Layout';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import { Loader } from './Loader/Loader';

const HomePage = lazy(() => import('../components/Home/Home'));
const RegisterPage = lazy(() => import('../components/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../components/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../components/ContactPage/ContactPage'));


export const App = () => {
  

  return (
    <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Layout /> }>
              <Route 
                index 
                element={<HomePage />} />
              <Route 
                path="/login" 
                element={<RestrictedRoute>
                          <LoginPage />
                        </RestrictedRoute>} />
              <Route 
                path="/register" 
                element={<RestrictedRoute>
                          <RegisterPage />
                        </RestrictedRoute>} />
              <Route 
                path="/contacts" 
                element={<PrivateRoute>
                  <ContactsPage />
                  </PrivateRoute>} />
            </Route> 
          </Routes>
        </Suspense>
      </>
  );
};
