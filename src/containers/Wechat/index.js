import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Menu from "./Menu";
import User from "./User";

function WechatRouter({ match: { path } }) {
  return (
    <Switch>
      <Route path={`${path}/menu`} component={Menu} />
      <Route path={`${path}/user`} component={User} />
      <Redirect to={`${path}/dict`} />
    </Switch>
  );
}

export default WechatRouter;
