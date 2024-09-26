type Falsy = null | undefined | false | 0 | "" | void;
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

interface FunctionComponent<P = {}> {
  (props: P & { children?: CallIdentifier }): CallIdentifier | Falsy;
}

type FC<P> = FunctionComponent<P>;

export type {
  CreateCall,
  Children,
  CreateJSXWithFragment,
  Call,
  FunctionComponent,
  FC,
};
