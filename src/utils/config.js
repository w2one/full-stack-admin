/**
 * config
 */

const config = {};

// 微服务拆分
let BASE_API = "";

if (BUILD_ENV === "sit") {
  BASE_API = "https://api.shanghaim.net/mock/37/api/";
} else if (BUILD_ENV === "uat") {
  BASE_API = "https://api.shanghaim.net/mock/37/api/";
} else if (BUILD_ENV === "pr") {
  BASE_API = "https://api.shanghaim.net/mock/37/api/";
} else if (BUILD_ENV === "prod") {
  BASE_API = "https://m.shanghaim.net/fullstack/";
} else {
  BASE_API = "http://localhost:4000/";
  BASE_API = "https://m.shanghaim.net/fullstack/";
}

export { BASE_API };

export default config;
