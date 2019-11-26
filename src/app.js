/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";
import { Provider, connect } from "react-redux";
import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./styles";
import Loading from "Components/Loading";
import createStore from "./store";

const store = createStore();

// react 懒加载
// import Home from "./containers/Home";
const Login = lazy(() =>
  import(/* webpackChunkName: "Login" */ "./containers/Login")
);

const Main = lazy(() =>
  import(/* webpackChunkName: "Main" */ "./containers/Main")
);

function App(props) {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={`/login`} component={Login} />
          <PrivateRoute path={`/`} component={Main} {...props} />
        </Switch>
      </Suspense>
    </Router>
  );
}

import Request from "Utils/request";
import API from "Utils/api";
/**
 * private route
 */
class PrivateRoute extends React.Component {
  render() {
    let { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

const AppContainer = connect(mapStateToProps, null)(App);

import ErrorBoundary from "@/components/ErrorBoundary";
// import { UserContext } from "./context/UserContext";
import { DictContext } from "Context/DictContext";

import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

class Index extends React.Component {
  state = {
    dict: []
  };

  async componentDidMount() {
    let response = await Request({
      // url: API.common.dict
      url: "json/dictjson.json",
      method: "get"
    });
    response.state && this.setState({ dict: response.data });
  }

  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ConfigProvider locale={zh_CN}>
            <DictContext.Provider value={{ ...this.state.dict }}>
              {/* <UserContext.Provider value={{ name: "jay" }}> */}
              <AppContainer />
              {/* </UserContext.Provider> */}
            </DictContext.Provider>
          </ConfigProvider>
        </Provider>
      </ErrorBoundary>
    );
  }
}

// HMR 热加载
// export default Index;
import { hot } from "react-hot-loader/root";

export default hot(Index);
