import JSX from "./index";

export const Fragment = JSX.Fragment;

export function jsx(type: any, props: any, key?: string) {
  return JSX.createCall(type, { ...props, key });
}

export function jsxs(type: any, props: any, key?: string) {
  return JSX.createCall(type, { ...props, key }, ...(props.children || []));
}
