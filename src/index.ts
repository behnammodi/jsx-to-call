type Component = Function;
type Props = Object;
type StackFrame = Function;
type Stack = Array<StackFrame>;

type CreateCallIdentifier = [component: Component, props: Props];

type CreateCall = (
  component: Component,
  props: Props,
  ...children: Array<CreateCallIdentifier>
) => CreateCallIdentifier;

type CreateStackFrame = (component: Component, props: Props) => StackFrame;

type PushStack = (stack: Stack, stackFrame: StackFrame) => void;

type CallStack = () => void;

type AddToEventQueue = (callback: Function) => number;

type RemoveFromEventQueue = (timeoutId: number) => void;

///////////////////////////////////////////////////////////////////////////////////////////////////

const stack: Stack = [];

const removeFromEventQueue: RemoveFromEventQueue = (timeoutId) => {
  clearTimeout(timeoutId);
};

const addToEventQueue: AddToEventQueue = (callback) => {
  return setTimeout(callback, 0);
};

const pushToStack: PushStack = (stack, stackFrame) => {
  stack.push(stackFrame);
};

const createStackFrame: CreateStackFrame = (component, props) => {
  return () => {
    component(props);
  };
};

const callStack: CallStack = () => {
  stack.forEach((stackFrame) => {
    stackFrame();
  });
};

let stackFrameId: number;

const createCall: CreateCall = (component, props, ...children) => {
  const stackFrame = createStackFrame(component, props);

  pushToStack(stack, stackFrame);

  removeFromEventQueue(stackFrameId);
  stackFrameId = addToEventQueue(callStack);

  return [component, props];
};

const jsx = {
  createCall,
};

export default jsx;
