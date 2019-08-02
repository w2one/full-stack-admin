/**
 * toast
 */
import { message } from "antd";

// export default (message, type, duration = 1) => {
//   switch (type) {
//     case "fail":
//       Toast.fail(message, duration);
//       break;
//     case "sucess":
//       Toast.success(message, duration);
//       break;
//     default:
//       Toast.info(message, duration);
//       break;
//   }
// };

const msg = (message, duration = 1) => message(message, duration);
const fail = (msg, duration = 1) => {
  console.log("fail", msg);
  message.error(msg, duration);
};

export default {
  msg,
  fail
};
