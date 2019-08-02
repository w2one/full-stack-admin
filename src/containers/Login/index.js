/**
 * login
 */
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "./action";
import { menuAction } from "../Main/action";
import { Application } from "Utils/storage";
import { Form, Icon, Input, Button } from "antd";
import "./style";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: props.token || false
    };
  }

  componentDidMount() {}

  /**
   * login
   * 登陆成功后需要获取菜单
   */
  fnLogin = async () => {
    const data = {
      account: "test",
      password: "password"
    };
    await this.props.loginAction(data, () =>
      this.setState({ redirectToReferrer: true })
    );

    // 加载资源中
    await this.props.menuAction();
  };

  fnBack = () => {
    Storage.clear();
    goBack();
  };

  fnHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        await this.props.loginAction(values, () =>
          this.setState({ redirectToReferrer: true })
        );

        // 加载资源中
        await this.props.menuAction();
      }
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      const { from } = this.props.location.state || {
        from: { pathname: "/" } // default site
      };
      return <Redirect to={from} />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.fnHandleSubmit} className="login-form">
          <div className="title">Admin</div>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "please input usename!" }],
              initialValue: Application.get("username") || ""
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "please input password!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
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
)(Form.create({ name: "normal_login" })(Login));
