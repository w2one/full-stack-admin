import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Banner from "../Banner";
import Show from "../Show";
import Notice from "./Notice";

function ContentRouter({ match: { path } }) {
  return (
    <Switch>
      <Route path={`${path}/banner`} component={Banner} />
      <Route path={`${path}/show`} component={Show} />
      <Route path={`${path}/notice`} component={Notice} />
      <Redirect to={`${path}/banner`} />
    </Switch>
  );
}

export default ContentRouter;
