import type {
  Stack,
  CallStack,
  PushStack,
  CreateCall,
  FindMyChildren,
  CreateStackFrame,
  TakeCareOfChildren,
  PushComponentToStack,
} from "./types";

function createJSX() {
  // Initialize an empty stack
  const stack: Stack = [];

  // Function to push a stack frame onto the stack
  const pushToStack: PushStack = (stackFrame) => {
    stack.push(stackFrame);
  };

  // Function to create a stack frame for a component and its props
  const createStackFrame: CreateStackFrame = (component, props) => {
    function stackFrame() {
      component(props);
    }

    stackFrame.__component = component;
    stackFrame.__props = props;

    return stackFrame;
  };

  // Function to find the index of a component's stack frame in the stack
  const findMyChildren: FindMyChildren = (component, props) => {
    return stack.findIndex(
      (stackFrame) =>
        stackFrame.__component === component && stackFrame.__props === props
    );
  };

  const cleanStack = () => {
    stack.splice(0, stack.length);
  };

  // Function to call each stack frame in the stack
  const callStack: CallStack = () => {
    stack.forEach((stackFrame) => {
      stackFrame();
    });

    cleanStack();
  };

  // Function to push a component and its props onto the stack
  const pushComponentToStack: PushComponentToStack = (component, props) => {
    const stackFrame = createStackFrame(component, props);
    pushToStack(stackFrame);
  };

  // Recursive function to handle children components
  const takeCareOfChildren: TakeCareOfChildren = (children) => {
    if (children.length === 0) {
      return;
    }

    children.forEach(([component, props, grandchildren]) => {
      const index = findMyChildren(component, props);
      if (index !== -1) {
        stack.splice(index, 1);
      }
      pushComponentToStack(component, props);

      takeCareOfChildren(grandchildren);
    });
  };

  // Function to create a call for a component and its children
  const createCall: CreateCall = (component, props, ...children) => {
    pushComponentToStack(component, props);

    takeCareOfChildren(children);

    return [component, props, children];
  };

  // Fragment component
  const Fragment = () => {};

  const call = (component) => {
    callStack();
  };

  return {
    call,
    Fragment,
    createCall,
  };
}

const JSX = createJSX();
const Fragment = JSX.Fragment;

export { Fragment, createJSX };

export default JSX;
