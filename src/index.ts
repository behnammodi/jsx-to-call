import type {
  Stack,
  CallStack,
  PushStack,
  CreateCall,
  FindMyChildren,
  AddToEventQueue,
  CreateStackFrame,
  TakeCareOfChildren,
  PushComponentToStack,
  RemoveFromEventQueue,
} from "./types";

const stack: Stack = [];

const removeFromEventQueue: RemoveFromEventQueue = (timeoutId) => {
  clearTimeout(timeoutId);
};

const addToEventQueue: AddToEventQueue = (callback) => {
  return setTimeout(callback, 0);
};

const pushToStack: PushStack = (stackFrame) => {
  stack.push(stackFrame);
};

const createStackFrame: CreateStackFrame = (component, props) => {
  function stackFrame() {
    component(props);
  }

  stackFrame.__component = component;
  stackFrame.__props = props;

  return stackFrame;
};

const findMyChildren: FindMyChildren = (component, props) => {
  return stack.findIndex(
    (stackFrame) =>
      stackFrame.__component === component && stackFrame.__props === props
  );
};

const callStack: CallStack = () => {
  stack.forEach((stackFrame) => {
    stackFrame();
  });
};

const pushComponentToStack: PushComponentToStack = (component, props) => {
  const stackFrame = createStackFrame(component, props);
  pushToStack(stackFrame);
};

const takeCareOfChildren: TakeCareOfChildren = (children) => {
  if (children.length === 0) {
    return;
  }

  children.forEach(([component, props, grandchildren]) => {
    const index = findMyChildren(component, props);
    stack.splice(index, 1);
    pushComponentToStack(component, props);

    takeCareOfChildren(grandchildren);
  });
};

let stackFrameId: number;

const createCall: CreateCall = (component, props, ...children) => {
  pushComponentToStack(component, props);

  takeCareOfChildren(children);

  removeFromEventQueue(stackFrameId);
  stackFrameId = addToEventQueue(callStack);

  return [component, props, children];
};

const Fragment = () => {};

const JSX = {
  createCall,
  Fragment,
};

export { Fragment };

export default JSX;
