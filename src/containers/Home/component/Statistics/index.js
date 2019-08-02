/**
 * 代办事项
 */
import React, { useEffect, useState } from "react";
import { Icon } from "antd";
import { Row } from "Components";
import Request from "Utils/request";
import API from "Utils/api";
import "./style";

function Statistics() {
  const [data, setData] = useState({
    countPkgProposalNum: 0 /* PKG投保申请数量*/,
    countGvsProposalNum: 0 /* GVS投保申请数量*/,
    undealProlposalNum: 0 /*待处理授权变更数量*/,
    waitWeiterversicherungNum: 0 /*  待续保保单数量*/,
    waitApplyNote: 0 /*待回复照会数量*/,
    waitPayRechnung: 0 /*待缴账单数量*/,
    needTransferInsurancedNum: 0 /*待缴转换被保险人人数*/
  });

  useEffect(() => {
    getData(data);
  }, data);

  async function getData() {
    let response = await Request({
      url: API.home.todayCount,
      method: "post"
    });
    response.state && setData(response.data);
  }

  return (
    <div className="statisDib">
      <header>
        <Icon type="calendar" style={{ fontSize: "19px" }} />
        <p>代办事项</p>
      </header>
      <div style={{ padding: "30px" }}>
        <Row items={4}>
          <div className="homeCard">
            <Icon type="calendar" style={{ fontSize: "19px" }} />
            <div className="rightDiv">
              <span className="topSpan">{data.countPkgProposalNum}</span>
              <font className="btmFont">PKG投保申请</font>
            </div>
          </div>
          <div className="homeCard">
            <Icon type="calendar" style={{ fontSize: "19px" }} />
            <div className="rightDiv">
              <span className="topSpan">{data.countGvsProposalNum}</span>
              <font className="btmFont">GVS投保申请</font>
            </div>
          </div>
          <div className="homeCard">
            <Icon type="calendar" style={{ fontSize: "19px" }} />
            <div className="rightDiv">
              <span className="topSpan">{data.undealProlposalNum}</span>
              <font className="btmFont">待处理授权变更</font>
            </div>
          </div>
          <div className="homeCard">
            <Icon type="calendar" style={{ fontSize: "19px" }} />
            <div className="rightDiv">
              <span className="topSpan">{data.waitWeiterversicherungNum}</span>
              <font className="btmFont">待续保保单</font>
            </div>
          </div>
          <div className="homeCard">
            <Icon type="calendar" style={{ fontSize: "19px" }} />
            <div className="rightDiv">
              <span className="topSpan">{data.waitApplyNote}</span>
              <font className="btmFont">待回复照会</font>
            </div>
          </div>
          <div className="homeCard">
            <Icon type="calendar" style={{ fontSize: "19px" }} />
            <div className="rightDiv">
              <span className="topSpan">{data.waitPayRechnung}</span>
              <font className="btmFont">待缴账单</font>
            </div>
          </div>
          <div className="homeCard">
            <Icon type="calendar" style={{ fontSize: "19px" }} />
            <div className="rightDiv">
              <span className="topSpan">{data.needTransferInsurancedNum}</span>
              <font className="btmFont">待转换被保险人数</font>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default Statistics;
