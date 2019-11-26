/**
 * 面包屑
 */
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

class MenuBreadcrumb extends React.Component {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    const { location, data } = this.props;

    const breadcrumbNameMap = {};
    data.map(item => {
      breadcrumbNameMap[`/${item.link}`] = item.name;
      if (item.children && item.children.length > 0) {
        item.children.map(children => {
          breadcrumbNameMap[`/${item.link}/${children.link}`] = children.name;
        });
      }
    });

    const pathSnippets = location.pathname.split("/").filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      return (
        // 存在才渲染
        breadcrumbNameMap[url] && (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          </Breadcrumb.Item>
        )
      );
    });

    return (
      <Breadcrumb style={{ margin: 10 }}>{extraBreadcrumbItems}</Breadcrumb>
    );
  }
}

export default withRouter(MenuBreadcrumb);
