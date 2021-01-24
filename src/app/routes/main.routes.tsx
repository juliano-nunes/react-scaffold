import React from "react";
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

// Pages
import HomePage from '../pages/home/home.page';

export const Routes = (props: RouteComponentProps) => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
};
