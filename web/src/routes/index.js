import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Purchase from '../pages/Purchase';
import PurchaseList from '../pages/PurchaseList';
import PurchaseView from '../pages/PurchaseView';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/purchase/vendor/:id" component={Purchase} isPrivate />
      <Route path="/purchase/:id" component={PurchaseView} isPrivate />
      <Route path="/purchases" component={PurchaseList} isPrivate />
    </Switch>
  );
}
