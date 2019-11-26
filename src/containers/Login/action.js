/**
 * login action
 */

import { Request, API, Storage } from "@utils";
const Session = Storage.Session;
export const LOGIN = "Login";
export const LOGOUT = "Logout";

/**
 * login action
 * @param {*} data
 * @param {*} callback
 */
export const loginAction = (data, callback) => async dispatch => {
  let response = await Request({
    url: API.common.login,
    data,
    headers: { token: data.result }
  });
  if (response.state) {
    dispatch({
      type: LOGIN,
      data: { token: response.data, userInfo: data }
    });
    Session.set("token", response.data);
    callback && callback();
  }
};

/**
 * logout action
 */
export const logoutAction = () => async dispatch => {
  dispatch({
    type: LOGOUT,
    data: {
      token: null
    }
  });
  Session.clear();
};
