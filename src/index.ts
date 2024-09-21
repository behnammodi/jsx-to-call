import type {
  Stack,
  CallStack,
  CreateCall,
  PushToStack,
  FindMyChildren,
  CreateStackFrame,
  TakeCareOfChildren,
  PushComponentToStack,
  CreateJSXWithFragment,
} from "./types";

const createJSXWithFragment: CreateJSXWithFragment = () => {
  const stack: Stack = [];

  const pushToStack: PushToStack = (stackFrame) => stack.push(stackFrame);

  const createStackFrame: CreateStackFrame = (component, props, children) => {
    function stackFrame() {
      return component({ ...props, children });
    }

    stackFrame.__component = component;
    stackFrame.__props = props;

    return stackFrame;
  };

  const findMyChildren: FindMyChildren = (component, props) =>
    stack.findIndex(
      (stackFrame) =>
        stackFrame.__component === component && stackFrame.__props === props
    );

  const cleanStack = () => stack.splice(0, stack.length);

  const callStack: CallStack = () => {
    /**
     * This is for testing purposes only.
     */
    let lastStackFrameReturnValue;

    stack.forEach((stackFrame) => {
      const returnValue = stackFrame();
      lastStackFrameReturnValue = returnValue;
    });

    cleanStack();

    return lastStackFrameReturnValue;
  };

  const pushComponentToStack: PushComponentToStack = (
    component,
    props,
    children
  ) => {
    const stackFrame = createStackFrame(component, props, children);
    pushToStack(stackFrame);
  };

  const takeCareOfChildren: TakeCareOfChildren = (children) => {
    if (children.length === 0) return;

    children.forEach(([component, props, grandchildren]) => {
      const index = findMyChildren(component, props);
      if (index !== -1) {
        stack.splice(index, 1);
      }
      pushComponentToStack(component, props, grandchildren);

      takeCareOfChildren(grandchildren);
    });
  };

  const createCall: CreateCall = (component, props, ...children) => {
    pushComponentToStack(component, props, children);

    takeCareOfChildren(children);

    return [component, props, children];
  };

  const call = (_) => callStack();

  const Fragment = () => {};

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
