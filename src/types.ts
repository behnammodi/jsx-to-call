type Props = Object;
type Component = Function;
type Stack = Array<StackFrame>;
type StackFrame = Function & { __component: Component; __props: Props };

type CreateCallIdentifier = [
  component: Component,
  props: Props,
  children: Children
];

type Children = Array<CreateCallIdentifier>;

type CreateCall = (
  component: Component,
  props: Props,
  ...children: Children
) => CreateCallIdentifier;

type CallStack = () => void;
type PushToStack = (stackFrame: StackFrame) => void;
type FindMyChildren = (component: Component, props: Props) => number;
type PushComponentToStack = (
  component: Component,
  props: Props,
  children: Children
) => void;
type TakeCareOfChildren = (children: Children) => void;
type CreateStackFrame = (
  component: Component,
  props: Props,
  children: Children
) => StackFrame;
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
