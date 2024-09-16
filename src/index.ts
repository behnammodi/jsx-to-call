type Component = Function;
type Props = Object;
type StackFrame = Function & { __component: Component; __props: Props };
type Stack = Array<StackFrame>;

type CreateCallIdentifier = [component: Component, props: Props];

type CreateCall = (
  component: Component,
  props: Props,
  ...children: Array<CreateCallIdentifier>
) => CreateCallIdentifier;

type CreateStackFrame = (component: Component, props: Props) => StackFrame;

type PushStack = (stackFrame: StackFrame) => void;

type CallStack = () => void;

type AddToEventQueue = (callback: Function) => number;

type RemoveFromEventQueue = (timeoutId: number) => void;

type FindMyChildren = (component: Component, props: Props) => number;

type TakeCareOfChildren = (children: Array<CreateCallIdentifier>) => void;

type PushComponentToStack = (component: Component, props: Props) => void;

///////////////////////////////////////////////////////////////////////////////////////////////////

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
  if (children.length > 0) {
    children.forEach(([component, props]) => {
      const index = findMyChildren(component, props);
      stack.splice(index, 1);
      pushComponentToStack(component, props);
    });
  }
};

let stackFrameId: number;

const createCall: CreateCall = (component, props, ...children) => {
  pushComponentToStack(component, props);

  takeCareOfChildren(children);

  removeFromEventQueue(stackFrameId);
  stackFrameId = addToEventQueue(callStack);

  return [component, props];
};

const Fragment = () => {};

const JSX = {
  createCall,
  Fragment,
};

export { Fragment };

export default JSX;
