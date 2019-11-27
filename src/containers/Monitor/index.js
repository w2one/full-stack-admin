import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Access from "./Access";
import Login from "./Login";
import Operation from "./Operation";

function MonitorRouter({ match: { path } }) {
  return (
    <Switch>
      <Route path={`${path}/access`} component={Access} />
      <Route path={`${path}/login`} component={Login} />
      <Route path={`${path}/operation`} component={Operation} />
      <Redirect to={`${path}/access`} />
    </Switch>
  );
}

export default MonitorRouter;
