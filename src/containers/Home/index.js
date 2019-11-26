/**
 * Home container
 */
import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line react/sort-comp
  // shouldComponentUpdate() {
  //   // console.log(nextProps);
  //   return false;
  // }

  render() {
    console.log("render main", this.props);

    return (
      <div className="home" data-spm="spm-a-home">
        Home
      </div>
    );
  }
}

export default Home;
