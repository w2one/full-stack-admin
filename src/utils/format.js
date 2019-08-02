/**
 * formate
 */

const format = {
  //  格式化日期 或者使用moment
  date: function(d, formatStr) {
    // alert(d);
    // 转换成Date类型
    if (!d) return;
    var date;
    if (typeof d === "number") {
      date = new Date(d);
    } else if (typeof d === "string") {
      date = new Date(d.replace(/-/g, "/"));
    } else {
      date = d;
    }

    var opt = {
      YYYY: date.getFullYear(),
      MM: addZero(date.getMonth() + 1),
      M: date.getMonth() + 1,
      dd: addZero(date.getDate()),
      d: date.getDate(),
      HH: addZero(date.getHours()),
      h: date.getHours(),
      mm: addZero(date.getMinutes()),
      m: date.getMinutes(),
      ss: addZero(date.getSeconds()),
      s: date.getSeconds()
    };

    // 如果是个位数则前面添加0
    function addZero(value) {
      return value < 10 ? "0" + value : value;
    }

    // 遍历替换
    for (var k in opt) {
      formatStr = formatStr.replace(k, opt[k]);
    }

    // console.log(formatStr);
    return formatStr;
  },

  /**
   * 字符串中的emoj替换
   * @param {*} v
   * @param {*} str
   */
  emoj: function(v, str = "") {
    return v.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, str);
  }
};

export default format;
