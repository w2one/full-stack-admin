/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/sort-comp */
/**
 *系统配置
 *systemFlag 父组件的传参 是否系统字典（0：系统字典；1业务选项）
 */
import React, { Component } from "react";
import Table from "Components/Table/table";
import { Input, Button, Modal, Row, Col, Breadcrumb, Popconfirm } from "antd";
import Request from "Utils/request";
import API from "Utils/api";
import Edit from "./Edit";

class DictContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      size: 20,
      pages: 1,
      records: [],
      total: 1,
      title: "",
      vo: null,
      loading: false,
      nav: [
        //存储面包屑数据
        // {
        //   name: "name",
        //   code: "jay"
        // }
      ],
      dictNameCn: "",
      dictNameEn: "",
      dictCode: ""
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
      render: (text, record, index) => (
        <span>
          {(this.state.currentPage - 1) * this.state.size + (index + 1)}
        </span>
      )
    },
    {
      title: "中文名称",
      key: "dictNameCn",
      dataIndex: "dictNameCn",
      align: "center",
      render: (text, record) => (
        <div onClick={() => this.fnNav(record)} style={{ cursor: "pointer" }}>
          {text}
        </div>
      )
    },
    {
      title: "英文名称",
      key: "dictNameEn",
      dataIndex: "dictNameEn",
      align: "center"
    },
    {
      title: "编码",
      key: "dictCode",
      dataIndex: "dictCode",
      align: "center"
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
          <Popconfirm
            title="确认删除?"
            onConfirm={() => this.fnDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

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
  query = async (data = {}) => {
    this.setState({ loading: true });
    const {
      //   systemFlag,
      nav,
      currentPage,
      size,
      dictNameCn,
      dictNameEn,
      dictCode
    } = this.state;

    const current = nav[nav.length - 1];
    if (current) {
      data.parentId = current.id;
    }
    if (!data.hasOwnProperty("currentPage")) {
      data.currentPage = currentPage;
    }
    if (!data.hasOwnProperty("size")) {
      data.size = size;
    }
    if (!data.hasOwnProperty("dictNameCn")) {
      data.dictNameCn = dictNameCn;
    }
    if (!data.hasOwnProperty("dictNameEn")) {
      data.dictNameEn = dictNameEn;
    }
    if (!data.hasOwnProperty("dictCode")) {
      data.dictNameEn = dictCode;
    }

    // 都是字典,区分 0:系统配置 1:和选项配置
    // data.systemFlag = systemFlag;

    let response = await Request({
      url: API.system.dict.query,
      method: "get",
      data
    });
    this.setState({ loading: false });
    if (response.state) {
      this.setState({ ...response.data }, () => console.log(this.state));
    } else {
      console.log(response.msg);
    }
  };

  /**
   * 新增
   */
  fnInsert = async vo => {
    let data = await Request({
      url: API.System.insert,
      method: "post",
      data: vo
    });

    if (data.status === "success") {
      this.query();
    }
  };

  /**
   * 修改
   * @param {*} vo
   */
  fnUpdate = async data => {
    let response = await Request({
      url: API.System.update,
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
  fnDelete = async id => {
    let data = await Request({
      url: API.System.delete,
      method: "post",
      data: id
    });

    // 删除完查找
    if (data.status === "success") {
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

  render() {
    const { records, total, currentPage, nav } = this.state;
    console.log(records);
    return (
      <div>
        <Breadcrumb style={{ marginBottom: 10, fontSize: 17 }}>
          <Breadcrumb.Item
            style={{ cursor: "pointer" }}
            onClick={this.fnBreadcrumb}
          >
            一级
          </Breadcrumb.Item>
          {nav.map((item, index) => (
            <Breadcrumb.Item
              key={index}
              onClick={() => this.fnBreadcrumb(item, index)}
              style={{ cursor: "pointer" }}
            >
              {item.dictNameCn}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div className="panel-search" style={{ margin: 10 }}>
          <Row gutter={24}>
            <Col span={6}>
              <label>中文名称: </label>
              <Input
                style={{ width: 150 }}
                placeholder="请输入中文名称"
                value={this.state.dictNameCn}
                autoComplete="off"
                onChange={e =>
                  this.setState({ dictNameCn: e.currentTarget.value })
                }
              />
            </Col>

            <Col span={6}>
              <label>英文名称: </label>
              <Input
                value={this.state.dictNameEn}
                onChange={e =>
                  this.setState({
                    dictNameEn: e.currentTarget.value
                  })
                }
                autoComplete="off"
                style={{ width: 150 }}
                placeholder="请输入英文名称"
              />
            </Col>

            <Col span={6}>
              <label>编码: </label>
              <Input
                value={this.state.dictCode}
                onChange={e =>
                  this.setState({
                    dictCode: e.currentTarget.value
                  })
                }
                autoComplete="off"
                style={{ width: 150 }}
                placeholder="请输入编码"
              />
            </Col>

            <Col span={3}>
              <Button type="primary" onClick={this.fnSearch}>
                搜索
              </Button>
            </Col>
            <Col span={3}>
              <Button type="primary" onClick={this.fnAdd}>
                新增
              </Button>
            </Col>
          </Row>
        </div>

        <Table
          columns={this.columns}
          dataSource={records}
          current={currentPage}
          total={total}
          loading={this.state.loading}
          fnNav={this.fnNav}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize}
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
            data={this.state.vo}
            isEdit={true}
            systemFlag={this.state.systemFlag}
            parent={this.state.nav[this.state.nav.length - 1]}
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
