/* eslint-disable react/display-name */
/**
 * show
 */

import React, { useState, useEffect } from "react";
import { Button, Card, Icon } from "antd";
import Table from "Components/Table";
import Search from "./Search";
import Edit from "./Edit";
import { getShows, fnDelete } from "./service";

function Show() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [vo, setVo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let response = await getShows();
      setLoading(false);
      setData(response);
    }
    fetchData();
  }, []);

  /**
   * delete
   */
  const fnDeleteShow = id => {
    fnDelete(id);
  };

  /**
   * table title
   */
  const columns = [
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "ID",
      dataIndex: "_id"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Operation",
      render: (text, record) => (
        <span className="table-actions">
          <Icon
            type="edit"
            title="eidt"
            onClick={() => fnEdit(record)}
            style={{ margin: "0 20px" }}
          />
          <Icon type="delete" onClick={() => fnDeleteShow(record._id)} />
        </span>
      )
    }
  ];

  /**
   * edit
   * @param {edit vo} vo
   */
  function fnEdit(vo) {
    console.log(vo);
    setVo(vo);
  }

  console.log("show render");
  return (
    <div>
      <Search />

      <Card
        style={{ marginTop: 10 }}
        title={
          <Button
            onClick={() => {
              setVo({});
            }}
          >
            Add
          </Button>
        }
        headStyle={{ textAlign: "right" }}
      >
        <Table
          dataSource={data.records}
          columns={columns}
          rowKey="_id"
          loading={loading}
        />
      </Card>

      {/* modal */}
      {vo && (
        <Edit
          visible={!!vo}
          onCancel={() => {
            setVo(null);
          }}
          vo={vo}
        />
      )}
    </div>
  );
}

export default Show;
