import React from "react";

function Content(props) {
  console.log(props);
  return <div>Content</div>;
}

export default React.memo(Content);
