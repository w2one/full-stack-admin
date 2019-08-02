/**
 * 字典编辑组件
 */
import React, { Component } from "react";
import { Form, Input, Button, Radio } from "antd";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
import Request from "Utils/request";
import API from "Utils/api";
import "./style";

class Edit extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let response = await Request({
      url: API.getSubmitKey
    });
    console.log(response);
    if (response.state) {
      this.setState({ submitKey: response.result });
    } else {
      console.log(data.msg);
    }
  }

  fnHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { id } = this.props.data;
        values.id = id;
        values.systemFlag = this.props.systemFlag;

        const { parent } = this.props;
        if (parent) {
          values.parentId = parent.id;
          values.dictLevel = parent.dictLevel + 1;
        } else {
          values.parentId = 0;
          values.dictLevel = 0;
        }

        if (id) {
          await this.props.onUpdate(values);
        } else {
          await this.props.onInsert(values);
        }
        // callback
        this.props.onCancle();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      data: {
        dictNameCn,
        dictNameEn,
        dictCode,
        dictValue,
        dictSort,
        description: dictDesc,
        distabledFlag
      } = {},
      disabled
    } = this.props;

    return (
      <div>
        <Form onSubmit={this.fnHandleSubmit}>
          <FormItem
            label="中文名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("dictNameCn", {
              rules: [{ required: true, message: "请输入中文名称" }],
              initialValue: dictNameCn
            })(
              <Input
                disabled={disabled}
                placeholder="请输入中文名称"
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem
            label="英文名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("dictNameEn", {
              // rules: [{ required: true, message: "请输入英文名称" }],
              initialValue: dictNameEn
            })(
              <Input
                disabled={disabled}
                placeholder="请输入英文名称"
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem
            label="编码"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("dictCode", {
              rules: [{ required: true, message: "请输入编码" }],
              initialValue: dictCode
            })(
              <Input
                disabled={disabled}
                placeholder="请输入编码"
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem
            label="选项取值"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("dictValue", {
              rules: [{ required: true, message: "请输入数值" }],
              initialValue: dictValue
            })(
              <Input
                disabled={disabled}
                placeholder="请输入数值"
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem
            label="是否显示"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("distabledFlag", {
              rules: [{ required: true, message: "请输入数值" }],
              initialValue: distabledFlag || 0
            })(
              <RadioGroup disabled={disabled}>
                <Radio value={0}>是</Radio>
                <Radio value={1}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="排序"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("dictSort", {
              rules: [{ required: true, message: "请输入排序" }],
              initialValue: dictSort
            })(
              <Input
                disabled={disabled}
                placeholder="请输入排序"
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem
            label="描述"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("dictDesc", {
              rules: [
                // { required: true, message: "请输入描述" }
                { max: 255, message: "最多输入255个汉字" }
              ],
              initialValue: dictDesc
            })(
              <TextArea
                disabled={disabled}
                placeholder="请输入描述"
                autosize={{ minRows: 6, maxRows: 6 }}
              />
            )}
          </FormItem>
          {!disabled && (
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ marginRight: "2rem" }}
                disabled={disabled}
                onClick={() => this.props.onCancle()}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit" disabled={disabled}>
                确定
              </Button>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default Form.create()(Edit);
