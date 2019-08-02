/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/sort-comp */

import React, { Component } from "react";
import { Modal, Popconfirm, Table, Button } from "antd";
import Request from "Utils/request";
import API from "Utils/api";
import Edit from "./Edit";
import "./style";

class DictContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      vo: null
    };
  }

  async componentDidMount() {
    this.query();
  }

  /**
   * 表头
   */
  columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (text, record, index) => index + 1
    },
    { title: "类型", dataIndex: "type" },
    {
      title: "菜单名称",
      dataIndex: "name",
      align: "center",
      render: (text, record) => (
        <div onClick={() => this.fnNav(record)} style={{ cursor: "pointer" }}>
          {text}
        </div>
      )
    },
    {
      title: "描述",
      dataIndex: "description",
      width: 200,
      align: "center",
      render: text => {
        return text && text.length > 25 ? text.substr(0, 25) + "..." : text;
      }
    },
    {
      title: "排序",
      key: "dictSort",
      dataIndex: "dictSort",
      align: "center"
    },
    {
      title: "操作",
      key: "opt",
      dataIndex: "opt",
      align: "center",
      render: (text, record) => (
        <span>
          <a className="btn-view" onClick={() => this.onView(record)}>
            查看
          </a>
          <a
            className="btn-modify"
            onClick={() => this.onModify(record)}
            style={{ margin: "0 10px" }}
          >
            修改
          </a>
          <a
            className="btn-view"
            onClick={() => this.onModify({ parentId: record._id })}
            style={{ marginRight: "10px" }}
          >
            添加子集
          </a>
          <Popconfirm
            title="确认删除?"
            onConfirm={() => this.fnDelete(record._id)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  expandedRowRender = record => {
    const data = record.sub_button;
    data.parentId = record._id;
    const columns = [
      {
        title: "序号",
        key: "id",
        dataIndex: "id",
        align: "center",
        render: (text, record, index) => index + 1
      },
      { title: "菜单名称", dataIndex: "name" },
      { title: "类型", dataIndex: "type" },
      { title: "链接", dataIndex: "url", width: "200px" },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (text, obj) => {
          obj.parentId = record._id;
          return (
            <span className="table-operation">
              <a
                className="btn-modify"
                onClick={() => this.onModify(obj)}
                style={{ margin: "0 10px" }}
              >
                修改
              </a>
              <Popconfirm
                title="确认删除?"
                onConfirm={() => this.fnDelete(obj._id, record._id)}
                okText="确定"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        }
      }
    ];

    return (
      <Table
        className={"subTable"}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="_id"
      />
    );
  };

  /**
   * 点击中文名查找子集
   */
  fnNav = data => {
    const { id, dictLevel } = data;
    const { nav } = this.state;
    nav[dictLevel] = (dictLevel, { ...data });
    // if (!nav.find(item => item.id === data.id)) {
    //   this.state.nav.push({ dictNameCn, dictCode, id });
    // }
    this.setState({
      nav,
      dictNameCn: "",
      dictNameEn: "",
      dictCode: ""
    });
    this.query({ parentId: id });
  };

  /**
   * 点击面包屑
   */
  fnBreadcrumb = (data, index) => {
    if (data) {
      let { nav } = this.state;
      nav = nav.slice(0, index + 1);
      console.log(nav);
      this.setState(
        { nav, dictNameCn: "", dictNameEn: "", dictCode: "" },
        this.query
      );
    } else {
      this.setState(
        { nav: [], dictNameCn: "", dictNameEn: "", dictCode: "" },
        this.query
      );
    }
  };

  /**
   * 查找
   */
  query = async () => {
    let response = await Request({
      url: API.wechat.menu.query
    });
    console.log(response);
    this.setState({ loading: false });
    if (response.state) {
      // const records = response.data.menu.button;
      const records = response.data;

      records.map((item, index) => (item.key = index));
      this.setState({ records }, () => console.log(this.state));
    } else {
      console.log(response.msg);
    }
  };

  /**
   * 新增
   */
  fnInsert = async vo => {
    let data = await Request({
      url: API.wechat.menu.create,
      method: "post",
      data: vo
    });

    if (data.state) {
      this.query();
    }
  };

  /**
   * 修改
   * @param {*} vo
   */
  fnUpdate = async data => {
    let response = await Request({
      url: API.wechat.menu.update,
      method: "post",
      data
    });

    if (response.state) {
      this.query();
    } else {
      console.log(response.msg);
    }
  };

  /**
   * 删除
   * @param {*} id
   */
  fnDelete = async (id, parentId) => {
    let data = await Request({
      url: API.wechat.menu.delete,
      method: "post",
      data: { id, parentId }
    });

    // 删除完查找
    if (data.state) {
      this.query();
    } else {
      console.log(data.msg);
    }
  };

  /**
   * 切换page
   */
  onChangePage = currentPage => {
    const { dictNameCn, dictNameEn, dictCode, size } = this.state;
    this.query({ dictNameCn, dictNameEn, dictCode, currentPage, size });
  };

  /**
   * 切换pageSize
   */
  onChangePageSize = (currentPage, size) => {
    this.setState({ size }, () => {
      const { dictNameCn, dictNameEn, dictCode } = this.state;
      this.query({ dictNameCn, dictNameEn, dictCode, currentPage, size });
    });
  };

  /**
   * 搜索
   */
  fnSearch = () => {
    this.setState({ currentPage: 1 }, () => {
      const {
        dictNameCn,
        dictNameEn,
        dictCode,
        size,
        currentPage
      } = this.state;
      this.query({ dictNameCn, dictNameEn, dictCode, size, currentPage });
    });
  };

  onView = vo => {
    this.setState({
      title: "查看",
      vo
    });
  };

  onModify = vo => {
    this.setState({
      title: "修改",
      vo
    });
  };

  fnAdd = () => {
    this.setState({
      title: "新增",
      vo: {}
    });
  };

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  fnWechatMenu = async () => {
    await Request({
      url: API.wechat.menu.asyncWechatMenu,
      method: "post"
    });
  };

  render() {
    const { records, vo } = this.state;
    console.log(records);
    return (
      <div>
        <Button onClick={this.fnAdd}>Add</Button>
        <Button onClick={this.fnWechatMenu}>同步到微信公众号</Button>
        <Table
          columns={this.columns}
          dataSource={records}
          loading={this.state.loading}
          expandedRowRender={this.expandedRowRender}
        />

        <Modal
          title={this.state.title}
          visible={!!this.state.title}
          maskClosable={false}
          destroyOnClose={true}
          keyboard={false}
          width={600}
          footer={null}
          onCancel={() => this.setState({ title: "" })}
        >
          <Edit
            data={vo}
            disabled={this.state.title === "查看"}
            onCancle={() => this.setState({ title: "" })}
            onInsert={this.fnInsert}
            onUpdate={this.fnUpdate}
          />
        </Modal>
      </div>
    );
  }
}

export default DictContainer;
