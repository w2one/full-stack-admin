/**
 * search
 */

import React from "react";
import { Card, Form, Input, Row, Col, Button } from "antd";
const Item = Form.Item;
class Search extends React.PureComponent {
  /**
   * 搜索
   */
  fnSubmit = () => {
    const {
      form: { validateFields }
    } = this.props;

    validateFields((error, value) => {
      if (!error) {
        console.log(value);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        // xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        // xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div>
        <Card>
          <Form
            {...formItemLayout}
            layout="horizontal"
            labelAlign="right"
            onSubmit={this.fnSubmit}
          >
            <Row>
              <Col span={8}>
                <Item
                  label="名字"
                  labelCol={{ sm: { span: 6 } }}
                  wrapperCol={{ sm: { span: 12 } }}
                >
                  {getFieldDecorator(
                    "name",
                    {}
                  )(<Input placeholder="请输入名字" />)}
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="名字"
                  labelCol={{ sm: { span: 6 } }}
                  wrapperCol={{ sm: { span: 12 } }}
                >
                  {getFieldDecorator(
                    "name",
                    {}
                  )(<Input placeholder="请输入名字" />)}
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="名字"
                  labelCol={{ sm: { span: 6 } }}
                  wrapperCol={{ sm: { span: 12 } }}
                >
                  {getFieldDecorator(
                    "name",
                    {}
                  )(<Input placeholder="请输入名字" />)}
                </Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Item
                  label="名字"
                  labelCol={{ sm: { span: 6 } }}
                  wrapperCol={{ sm: { span: 12 } }}
                >
                  {getFieldDecorator(
                    "name",
                    {}
                  )(<Input placeholder="请输入名字" />)}
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="名字"
                  labelCol={{ sm: { span: 6 } }}
                  wrapperCol={{ sm: { span: 12 } }}
                >
                  {getFieldDecorator(
                    "name",
                    {}
                  )(<Input placeholder="请输入名字" />)}
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="名字"
                  labelCol={{ sm: { span: 6 } }}
                  wrapperCol={{ sm: { span: 12 } }}
                >
                  {getFieldDecorator(
                    "name",
                    {}
                  )(<Input placeholder="请输入名字" />)}
                </Item>
              </Col>
            </Row>
            <Row>
              <Col offset={2}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Search);
