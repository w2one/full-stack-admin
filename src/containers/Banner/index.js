/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/**
 * Role
 */

import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import Table from "Components/Table";
import Search from "./Search";
import Edit from "./Edit";

import { save, query } from "./service";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [vo, setVo] = useState(null);

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
      title: "id",
      dataIndex: "_id"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "image",
      dataIndex: "image"
    },
    {
      title: "操作",
      render: (text, record) => (
        <span className="table-actions">
          <span onClick={() => fnEdit(record)}>修改</span>
          <span>删除</span>
        </span>
      )
    }
  ];

  /**
   * 编辑
   * @param {编辑对象} vo
   */
  function fnEdit(vo) {
    console.log(vo);
    setVo(vo);
  }

  /**
   * 保存
   * @param {*} vo
   */
  async function fnSave(vo) {
    console.log(vo);
    await save(vo);
    setVo(null);
    fetchData();
  }
  console.log("banner render");
  return (
    <div>
      {/* 搜索 */}
      {/* <Search /> */}
      {/* 数据 */}
      <Card
        style={{ marginTop: 10 }}
        title={
          <Button
            onClick={() => {
              setVo({});
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
