/**
 * table
 */

import React from "react";
import { Table, Pagination } from "antd";
import "./style.less";

export default function MTable(props) {
  //   console.log("ss", props);

  return (
    <Table
      size="middle"
      bordered={props.bordered || true}
      {...props}
      rowKey={props.rowKey || "id"}
      pagination={false}
      footer={() =>
        props.noFooter ? null : (
          <div style={{ textAlign: "right" }}>
            <Pagination
              current={props.current}
              showQuickJumper
              bordered
              total={props.total}
              // showTotal={(total, range) =>
              //   `${range[0]}-${range[1]} 总共${total}条`
              // }
              //   hideOnSinglePage={true}
              onChange={page => props.onChangePage(page)}
              // showSizeChanger={true}// 是否切换分页
              onShowSizeChange={(current, size) =>
                props.onChangePageSize(current, size)
              }
            />
          </div>
        )
      }
    />
  );
}
