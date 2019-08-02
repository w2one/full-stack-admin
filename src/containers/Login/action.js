/**
 * login action
 */

import Request from "Utils/request";
import API from "Utils/api";
import { Session as Storage } from "Utils/storage";
export const LOGIN = "Login";
export const LOGOUT = "Logout";

export const loginAction = (data, callback) => async dispatch => {
  console.log(data);
  // dispatch({
  //   type: LOGIN,
  //   data: { token: 123, userInfo: { userName: "jay" } }
  // });
  // Storage.set("token", 123);
  // Storage.set("userInfo", "jay");
  // Application.set("username", data.userName);
  // callback && callback();
  let response = await Request({
    url: API.common.login,
    method: "post",
    data,
    headers: { token: data.result }
  });
  if (response.state) {
    // alert(JSON.response(response));
    dispatch({
      type: LOGIN,
      data: { token: response.data, userInfo: data }
    });
    Storage.set("token", response.data);
    // Storage.set("userInfo", data);
    // Application.set("username", data.userName);
    callback && callback();
  }
};

export const logoutAction = () => async dispatch => {
  dispatch({
    type: LOGOUT,
    data: {
      token: null
    }
  });
  Storage.clear();
};
