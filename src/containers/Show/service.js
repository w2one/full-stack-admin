import Request from "Utils/request";
import API from "Utils/api";

export async function getShows() {
  let data = await Request({
    url: API.show.list,
    method: "post"
  });

  console.log("data", data);
  return data.data;
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
