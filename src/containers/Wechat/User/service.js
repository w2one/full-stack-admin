import Request from "Utils/request";
import API from "Utils/api";

export async function query() {
  let data = await Request({
    url: API.wechat.user.query,
    method: "get"
  });
  return data.data;
}

export async function queryDetail(openId) {
  let response = await Request({
    url: API.wechat.user.query + "/" + openId,
    method: "get"
  });
  return response.data;
}
