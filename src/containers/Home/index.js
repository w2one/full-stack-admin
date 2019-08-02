/**
 * Home container
 */
import React, { Component } from "react";
// import Request from "Utils/request";
// import API from "Utils/api";
// import Statistics from "./component/Statistics";
// import Message from "./component/Message";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    // const {} = this.state;

    return (
      <div className="home" data-spm="spm-a-home">
        {/* <Statistics />
        <Message /> */}
        Home
      </div>
    );
  }
}

export default Home;
