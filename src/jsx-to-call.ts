import { createJSXCaller } from "./jsx-caller";
import { createJSXStack } from "./jsx-stack";
import { createJSXFragment } from "./jsx-fragment";

const stack = createJSXStack();
const { caller } = createJSXCaller(stack);

const Fragment = createJSXFragment();

const jsx = { caller };

export default jsx;

export { Fragment };
