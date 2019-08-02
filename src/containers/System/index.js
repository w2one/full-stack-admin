import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dict from "./Dict";
import User from "./User";

function SystemRouter({ match: { path } }) {
  return (
    <Switch>
      <Route path={`${path}/dict`} component={Dict} />
      <Route path={`${path}/user`} component={User} />
      <Redirect to={`${path}/dict`} />
    </Switch>
  );
}

export default SystemRouter;
