import type {
  Stack,
  CallStack,
  PushStack,
  CreateCall,
  StopRunner,
  StartRunner,
  FindMyChildren,
  CreateStackFrame,
  TakeCareOfChildren,
  PushComponentToStack,
} from "./types";

// Initialize an empty stack
const stack: Stack = [];

// Function to remove a callback from the event queue
const stopRunner: StopRunner = (timeoutId) => {
  clearTimeout(timeoutId);
};

// Function to add a callback to the event queue
const startRunner: StartRunner = (callback) => {
  return setTimeout(callback, 0);
};

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

// Function to call each stack frame in the stack
const callStack: CallStack = () => {
  stack.forEach((stackFrame) => {
    stackFrame();
  });
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

let lastRunnerID: number;

// Function to create a call for a component and its children
const createCall: CreateCall = (component, props, ...children) => {
  pushComponentToStack(component, props);

  takeCareOfChildren(children);

  stopRunner(lastRunnerID);
  lastRunnerID = startRunner(callStack);

  return [component, props, children];
};

// Fragment component
const Fragment = () => {};

// JSX object with createCall and Fragment
const JSX = {
  createCall,
  Fragment,
};

export { Fragment };

export default JSX;
