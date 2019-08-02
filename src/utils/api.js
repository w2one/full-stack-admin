/**
 * api
 * API接口前拼接微服务base url 注意接口属于哪个微服务！！！
 */

// import { BASE_API } from "./config";

const api = {
  // 公共
  common: {
    login: "login", // 登录
    dict: "common/otherDictionary/dictionary", // 字典
    menu: "accountMenu/getMenu", // 菜单
    uploadToken: "qiuToken", //上传token
    upload: "https://up-z0.qiniup.com" // 上传
  },
  // 我的首页
  home: {},
  banner: {
    query: "banner/query",
    save: "banner/save"
  },
  // 系统管理
  system: {
    // 字典
    dict: {
      query: "json/" + "dict.json" // 查询字典
    }
  },
  show: {
    list: "showList", // 列表
    update: "updateShow", // 修改
    delete: "deleteShow" // 删除
  },
  wechat: {
    menu: {
      create: "wechat/add",
      query: "wechat/menu",
      delete: "wechat/menu/delete",
      update: "wechat/menu/update",
      asyncWechatMenu: "wechat/menu/asyncWechatMenu"
    },
    user: {
      query: "wechat/user",
      detail: "wechat/user"
    }
  },
  analytics: {
    point: {
      query: "analytics/point/query"
    },
    track: {
      query: "analytics/track/query"
    }
  }
};

export default api;
