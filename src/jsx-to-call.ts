import { createJSXCaller } from "./jsx-caller";
import { createJSXCallStack } from "./jsx-call-stack";
import { createJSXFragment } from "./jsx-fragment";

const jsxCallStack = createJSXCallStack();
const { caller } = createJSXCaller(jsxCallStack);

const Fragment = createJSXFragment();

const jsx = { caller };

export default jsx;

export { Fragment };
