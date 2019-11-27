import React from "react";
import Search from "./Compnent/Search";
import Content from "./Compnent/Content";
import Edit from "./Compnent/Edit";

function User() {
  // content data
  const [data, setData] = React.useState({
    username: null
  });

  // search condition
  const [searchVo, setSearchVo] = React.useState({
    username: "jack"
  });

  function fnSearch() {
    console.log("search", searchVo);
  }

  return (
    <>
      <Search
        condition={searchVo}
        setCondition={setSearchVo}
        onSearch={fnSearch}
      />
      <Content data={data} setCondition={setData} />
      <Edit />
    </>
  );
}

export default User;
