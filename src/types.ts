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
type PushStack = (stackFrame: StackFrame) => void;
type AddToEventQueue = (callback: Function) => number;
type RemoveFromEventQueue = (timeoutId: number) => void;
type FindMyChildren = (component: Component, props: Props) => number;
type PushComponentToStack = (component: Component, props: Props) => void;
type TakeCareOfChildren = (children: Array<CreateCallIdentifier>) => void;
type CreateStackFrame = (component: Component, props: Props) => StackFrame;

export {
  Props,
  Stack,
  PushStack,
  CallStack,
  Component,
  StackFrame,
  CreateCall,
  FindMyChildren,
  AddToEventQueue,
  CreateStackFrame,
  TakeCareOfChildren,
  PushComponentToStack,
  CreateCallIdentifier,
  RemoveFromEventQueue,
};
