import React from 'react';
import { withRouter } from "react-router-dom";

import './home.page.scss';
const logo = require('../../assets/logo.svg');

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page">
      <header className="home-page__header">
        <img src={logo} className="home-page__logo" alt="logo" />
        <p>
          Edit <code>src/app/pages/home/home.page.tsx</code> and save to reload.
        </p>
        <a
          className="home-page__app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default withRouter(HomePage);
