import Request from "@utils/request";
import API from "@utils/api";
import { Session as Storage } from "@utils/storage";
export const MENUS = "MENUS";

/**
 * get menu
 */
export const menuAction = () => async dispatch => {
  let response = await Request({
    url: API.common.menu,
    method: "get"
  });

  if (response.state) {
    dispatch({ type: MENUS, data: response.data });
    Storage.set("menus", response.data);
  }
};
