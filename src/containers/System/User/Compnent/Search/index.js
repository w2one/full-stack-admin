import React from "react";
import { Input } from "antd";

function Search(props) {
  console.log(props);

  return (
    <div>
      serach
      <Input
        placeholder="placeholder"
        onChange={e => {
          console.log(e.target.value);
          props.setCondition({ username: e.target.value });
        }}
      />
    </div>
  );
}

export default React.memo(Search);
