/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/**
 * @author Jay
 * @since 2019-11-26
 * @description banner
 */

import React, { useState, useEffect } from "react";
import { Button, Card, Icon } from "antd";
import Table from "Components/Table";
import Search from "./Search";
import Edit from "./Edit";

import { save, query } from "./service";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [vo, setVo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    let response = await query();
    setLoading(false);
    setData(response);
  }

  /**
   * 表头
   */
  const columns = [
    {
      title: "Id",
      dataIndex: "_id"
    },
    {
      title: "描述",
      dataIndex: "description"
    },
    {
      title: "图片",
      dataIndex: "image"
    },
    {
      title: "操作",
      render: (text, record) => (
        <span className="table-actions">
          <Icon type="eye" title="查看" onClick={() => fnView(record)} />
          <Icon
            type="edit"
            title="编辑"
            onClick={() => fnEdit(record)}
            style={{ margin: "0 20px" }}
          />
          <Icon
            type="delete"
            title="删除"
            onClick={() => fnDeleteShow(record._id)}
          />
        </span>
      )
    }
  ];

  /**
   * view
   * @param {*} vo
   */
  function fnView(vo) {
    setVo(vo);
    setDisabled(true);
  }

  /**
   * edit
   * @param {*} vo
   */
  function fnEdit(vo) {
    console.log(vo);
    setVo(vo);
    setDisabled(false);
  }

  /**
   * save
   * @param {*} vo
   */
  async function fnSave(vo) {
    console.log(vo);
    await save(vo);
    setVo(null);
    setDisabled(false);
    fetchData();
  }

  return (
    <div>
      {/* 搜索 */}
      <Search />
      {/* 数据 */}
      <Card
        style={{ marginTop: 10 }}
        title={
          <Button
            onClick={() => {
              setVo({});
              setDisabled(false);
            }}
          >
            新增
          </Button>
        }
        headStyle={{ textAlign: "right" }}
      >
        <Table dataSource={data} columns={columns} rowKey={"_id"} />
      </Card>
      {/* 弹框 */}
      {vo && (
        <Edit
          visible={!!vo}
          onCancel={() => {
            setVo(null);
          }}
          vo={vo}
          disabled={disabled}
          fnSave={fnSave}
        />
      )}
    </div>
  );
}

// export default React.memo(
//   Banner,
//   (prevProps, nextProps) =>
//     JSON.stringify(prevProps) === JSON.stringify(nextProps)
// );

export default React.memo(Banner);
