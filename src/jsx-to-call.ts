import { createJSXCaller } from "./jsx-caller";
import { createJSXCallStack } from "./jsx-call-stack";
import { createJSXCallStackRunner } from "./jsx-call-stack-runner";
import { createJSXFragment } from "./jsx-fragment";

const jsxCallStackRunner = createJSXCallStackRunner();
const jsxCallStack = createJSXCallStack(jsxCallStackRunner);
const { caller } = createJSXCaller(jsxCallStack);

const Fragment = createJSXFragment();

const jsx = { caller };

export default jsx;

export { Fragment };
