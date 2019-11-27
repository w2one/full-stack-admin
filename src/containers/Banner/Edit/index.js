/**
 * @author Jay
 * @since 2019-11-26
 * @description edit
 */

import React from "react";
import { Form, Input, Button } from "antd";
import Modal from "Components/Modal";
import { Upload } from "Components";

function Edit(props) {
  const {
    form: { getFieldDecorator },
    vo: { _id: id, description, images, link },
    disabled
  } = props;

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

      // // _id
      // console.log(vo._id);

      if (id) values._id = id;
      // values._id = vo._id;
      // values.images.map(item => (item.image = item.url));
      props.fnSave(values);
    });
  }

  console.log("disabled", disabled);
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
        <Form.Item label="外链">
          {getFieldDecorator("link", { initialValue: link })(
            <Input placeholder="外链" disabled={disabled} />
          )}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator("description", { initialValue: description })(
            <Input placeholder="描述" disabled={disabled} />
          )}
        </Form.Item>
        <Form.Item label="图片">
          {getFieldDecorator("images", { initialValue: images })(
            <Upload number={1} disabled={disabled} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create()(Edit);
