/**
 * Avoid unnecessary setState call when Route receives same props.
 * https://github.com/ReactTraining/react-router/issues/5738
 */
import React from "react";

export default function connectRoute(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.location !== this.props.location;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
