function createJSXCaller(stack) {
  const caller = function (component, props, ...children) {
    console.log({
      children,
    });
    stack.push(component, props);
    // TODO: find my children and move to front of me
    return [component, props];
  };

  return { caller };
}

export { createJSXCaller };
