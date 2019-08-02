/**
 * 表格
 */
import React, { Component } from "react";
import { Table, Pagination } from "antd";
import "./style";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-component">
        <Table
          bordered
          columns={this.props.columns}
          dataSource={this.props.dataSource}
          pagination={false}
          title={this.props.header}
          rowKey={record => record.id}
          locale={{ emptyText: "暂无数据" }} //   console.log("123", record, index, event) // onRowClick={(record, index, event) =>
          loading={this.props.loading}
          // }
          // onRow={record => {
          //   return {
          //     onClick: () => {
          //       this.props.fnNav(record);
          //       // console.log(record);
          //     }
          //   }; // 点击行
          // }}
          footer={() => (
            <div style={{ textAlign: "center" }}>
              <Pagination
                current={this.props.current}
                bordered
                total={
                  this.props.total // showQuickJumper
                }
                defaultPageSize={20}
                pageSizeOptions={["20", "50"]}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} 总共${total}条`
                }
                onChange={
                  page => this.props.onChangePage(page) // hideOnSinglePage={true}
                }
                showSizeChanger={true}
                onShowSizeChange={(current, size) => {
                  this.props.onChangePageSize(current, size);
                }}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default TableComponent;
