import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Routes
import { Routes } from './routes/main.routes'

// History
export const history = createBrowserHistory();

const App: React.FC = (): JSX.Element => {
  return (
    <Fragment>
      <Router history={history}>
        <Route path="/" component={Routes} />
      </Router>
    </Fragment>
  );
}

export default App;