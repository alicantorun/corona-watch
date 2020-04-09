import React from "react";

import { Router, Route, Switch } from "react-router-dom";
import { history } from "./_helpers/history";

import AppDashboard from "./screens/AppDashboard/AppDashboard";
import CountryDashboard from "./screens/CountryDashboard/CountryDashboard";
import Header from "../App/components/Header/Header";

function App() {
  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <AppDashboard />} />
          <Route exact path="/:country" render={() => <CountryDashboard />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
