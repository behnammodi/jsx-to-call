type Props = Object;
type Component = Function;
type Stack = Array<StackFrame>;
type StackFrame = Function & { __component: Component; __props: Props };

type CreateCallIdentifier = [
  component: Component,
  props: Props,
  children: Array<CreateCallIdentifier>
];

type CreateCall = (
  component: Component,
  props: Props,
  ...children: Array<CreateCallIdentifier>
) => CreateCallIdentifier;

type CallStack = () => void;
type PushToStack = (stackFrame: StackFrame) => void;
type FindMyChildren = (component: Component, props: Props) => number;
type PushComponentToStack = (component: Component, props: Props) => void;
type TakeCareOfChildren = (children: Array<CreateCallIdentifier>) => void;
type CreateStackFrame = (component: Component, props: Props) => StackFrame;
type CreateJSXWithFragment = () => {
  call: Function;
  Fragment: Function;
  createCall: CreateCall;
};

export {
  Props,
  Stack,
  CallStack,
  Component,
  StackFrame,
  CreateCall,
  PushToStack,
  FindMyChildren,
  CreateStackFrame,
  TakeCareOfChildren,
  PushComponentToStack,
  CreateCallIdentifier,
  CreateJSXWithFragment,
};
