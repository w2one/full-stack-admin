/**
 * 通知列表
 */
import React, { Component } from "react";
import { Icon, List, Button } from "antd";
import Request from "Utils/request";
import API from "Utils/api";
export default class Message extends Component {
  state = {
    initLoading: false,
    loading: false,
    data: [],
    list: [],
    pageNo: 1,
    pageSize: 5,
    // data: [],
    hasNextPage: false,
    pageRecords: 1,
    pageTotal: 1
  };

  componentDidMount() {
    this.fnGetData();
  }

  /**
   * 获取数据
   */
  fnGetData = async () => {
    const { pageNo, pageSize } = this.state;
    let response = await Request({
      url: API.home.notice,
      method: "post",
      data: {
        pageNo,
        pageSize
      }
    });
    response.state &&
      this.setState({
        ...response.data,
        data: [...this.state.data, ...response.data.data]
      });
  };

  /**
   * 加载更多数据
   */
  fnLoadMoreData = () => {
    this.setState(state => ({ pageNo: state.pageNo + 1 }), this.fnGetData);
  };

  render() {
    const { initLoading, data, hasNextPage } = this.state;
    const loadMore = hasNextPage ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px"
        }}
      >
        <Button onClick={this.fnLoadMoreData}>加载更多</Button>
      </div>
    ) : null;

    return (
      <List
        header={
          <div>
            <Icon
              type="message"
              style={{ fontSize: "19px", marginRight: "13px", color: "block" }}
            />
            通知列表
          </div>
        }
        loadMore={loadMore}
        loading={initLoading}
        split={false}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <div className="messageList">
              <div>
                <span className={item.hasRead === "Y" ? "msgcircle" : ""} />
                <font className="msgFont">{item.messageDetail}</font>
              </div>
              <p className="msgP">{item.sendDate}</p>
            </div>
          </List.Item>
        )}
      />
    );
  }
}
