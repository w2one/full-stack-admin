import Request from "Utils/request";
import API from "Utils/api";

export async function query() {
  let data = await Request({
    url: API.banner.query,
    method: "post"
  });

  // 数据转换
  data.data.map(
    item =>
      (item.images = [
        {
          uid: item.image,
          url: item.image
        }
      ])
  );

  return data.data;
}

export async function save(data) {
  data.image = data.images[0].url;
  delete data.images;
  console.log("------", data);

  let response = await Request({
    url: API.banner.save,
    method: "post",
    data
  });

  console.log("data", response);
  return response.data;
}

export async function update(data) {
  let response = await Request({
    url: API.show.update,
    method: "put",
    data
  });

  console.log("data", response);
  return response.data;
}

export async function fnDelete(id) {
  let response = await Request({
    url: API.show.delete,
    method: "post",
    data: { id }
  });

  console.log("data", response);
  return response.data;
}
