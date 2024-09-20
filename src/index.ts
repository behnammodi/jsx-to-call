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

  const createStackFrame: CreateStackFrame = (component, props) => {
    function stackFrame() {
      component(props);
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
    stack.forEach((stackFrame) => {
      stackFrame();
    });

    cleanStack();
  };

  const pushComponentToStack: PushComponentToStack = (component, props) => {
    const stackFrame = createStackFrame(component, props);
    pushToStack(stackFrame);
  };

  const takeCareOfChildren: TakeCareOfChildren = (children) => {
    if (children.length === 0) return;

    children.forEach(([component, props, grandchildren]) => {
      const index = findMyChildren(component, props);
      if (index !== -1) {
        stack.splice(index, 1);
      }
      pushComponentToStack(component, props);

      takeCareOfChildren(grandchildren);
    });
  };

  const createCall: CreateCall = (component, props, ...children) => {
    pushComponentToStack(component, props);

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
