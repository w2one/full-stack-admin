/**
 * login
 */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "./action";
import { menuAction } from "../Main/action";
import { Application } from "@utils/storage";
import { Form, Icon, Input, Button } from "antd";
import "./style";

function Login(props) {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  useEffect(() => {
    setRedirectToReferrer(props.token);
  }, [props.token]);

  function fnLogin(e) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        await props.loginAction(values, () => setRedirectToReferrer(true));

        // load menu
        // await props.menuAction();
      }
    });
  }

  if (redirectToReferrer) {
    const { from } = props.location.state || {
      from: { pathname: "/" } // default site
    };
    return <Redirect to={from} />;
  }

  const { getFieldDecorator } = props.form;
  return (
    <div className="login">
      <Form onSubmit={fnLogin} className="login-form">
        <div className="title">Admin</div>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "please input usename!" }],
            initialValue: Application.get("username") || ""
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "please input password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
  menuAction: bindActionCreators(menuAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "login" })(Login));
