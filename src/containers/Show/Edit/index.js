/**
 * 编辑
 */

import React from "react";
import { Form, Input, Button } from "antd";
import Modal from "Components/Modal";
import { Upload } from "Components";
import { update } from "../service";

function Edit(props) {
  const {
    form: { getFieldDecorator },
    vo: { title, description, images },
    vo
  } = props;

  images.map(item => (item.url = item.image));

  console.log(images);

  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 14 },
      sm: { span: 14 }
    }
  };

  function fnSave() {
    console.log("save");
    props.form.validateFields((err, values) => {
      console.log(values);

      // _id
      console.log(vo._id);

      values._id = vo._id;
      values.images.map(item => (item.image = item.url));
      update(values);
    });
  }

  return (
    <Modal
      visible={true}
      {...props}
      footer={
        <Button type="primary" onClick={fnSave}>
          保存
        </Button>
      }
    >
      <Form {...formItemLayout}>
        <Form.Item label="标题">
          {getFieldDecorator("title", { initialValue: title })(
            <Input placeholder="标题" />
          )}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator("description", { initialValue: description })(
            <Input placeholder="描述" />
          )}
        </Form.Item>
        <Form.Item label="背景图">
          {getFieldDecorator("images", { initialValue: images })(
            <Upload number={10} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create({ name: "form" })(Edit);
