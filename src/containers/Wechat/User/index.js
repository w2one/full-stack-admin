/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { query, queryDetail } from "./service";

function WechatUser() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await query();
      setList(data.data.openid);
    }
    getData();
  }, []);

  return (
    <div>
      {list.map(item => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}

export default WechatUser;
