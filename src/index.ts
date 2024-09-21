import type { Call, CreateCall, CreateJSXWithFragment } from "./types";

const createJSXWithFragment: CreateJSXWithFragment = () => {
  const createCall: CreateCall = (component, props, ...children) => [
    component,
    props,
    children,
  ];

  const call: Call = (root) => {
    if (!root) return;

    if ((root as Array<unknown>).length === 0) return;

    const [component, props, children] = root;

    const returnedChildren = component({ ...props, children });

    // return children if children is not equal to next
    if (children !== returnedChildren) return returnedChildren;

    returnedChildren.forEach((children) => call(children));
  };

  const Fragment = ({ children }) => children;

  return {
    call,
    Fragment,
    createCall,
  };
};

const JSX = createJSXWithFragment();
const Fragment = JSX.Fragment;

export { Fragment, createJSXWithFragment };

export default JSX;
