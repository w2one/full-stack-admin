import React from "react";
import { Icon } from "antd";
import "./style";

import Fullscreem from "@/static/images/fullscreen.svg";

function Head(props) {
  const fnFullScream = () => {
    document.webkitIsFullScreen
      ? document.webkitCancelFullScreen()
      : document.documentElement.webkitRequestFullScreen();
  };

  return (
    <div className="header">
      <Icon
        className="trigger"
        type={props.collapsed ? "menu-unfold" : "menu-fold"}
        onClick={props.onToggle}
      />
      <div className="right">
        <Icon component={Fullscreem} onClick={fnFullScream} />
        <span style={{ marginRight: 10 }}></span>
        <Icon type="setting" onClick={props.onLogout}></Icon>
      </div>
    </div>
  );
}

export default Head;
