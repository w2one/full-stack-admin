/**
 * dict context
 */
import React, { createContext } from "react";

export const DictContext = createContext({ value: {} });

export function withDict(Component) {
  const C = props => {
    const { forwardedRef, ...remainingProps } = props;
    return (
      <DictContext.Consumer>
        {context => (
          <Component {...remainingProps} {...context} ref={forwardedRef} />
        )}
      </DictContext.Consumer>
    );
  };

  C.displayName = Component.name;
  C.WrappedComponent = Component;

  return React.forwardRef((props, ref) => {
    return <C {...props} forwardedRef={ref} />;
  });
}
