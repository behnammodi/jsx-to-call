type Props = Object;
type Component = Function;
type CallIdentifier = [component: Component, props: Props, children: Children];
type Children = Array<CallIdentifier>;
type CreateCall = (
  component: Component,
  props: Props,
  ...children: Children
) => CallIdentifier;
type CreateJSXWithFragment = () => {
  call: Function;
  Fragment: Function;
  createCall: CreateCall;
};
type Call = (root: CallIdentifier) => unknown;

export { CreateCall, Children, CreateJSXWithFragment, Call };
