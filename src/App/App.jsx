import React, { useEffect, useState } from "react";

import { Router, Route, Switch } from "react-router-dom";
import { history } from "./_helpers/history";
// import { connect } from "react-redux";
// import { history } from "./_helpers/history";
// import { alertActions } from "./actions/alertActions";
// import { notificationActions } from "./actions//notificationActions";

import AppDashboard from "./screens/AppDashboard/AppDashboard";
import CountryDashboard from "./screens/CountryDashboard/CountryDashboard";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => <AppDashboard />} />
          <Route exact path="/:country" render={() => <CountryDashboard />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
