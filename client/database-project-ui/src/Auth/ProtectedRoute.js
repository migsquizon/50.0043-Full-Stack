import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {withContext} from './AuthContext';

function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    (localStorage.getItem('user')) ? 
      <Route {...rest} component={Component} /> :
      <Redirect to="/" />
  )
}

export default withContext(ProtectedRoute);