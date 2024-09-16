function createJSXCaller(callStack) {
  const caller = function (component, props, ...children) {
    console.log({
      children,
    });
    callStack.push(component, props);
    // TODO: find my children and move to front of me
    return [component, props];
  };

  return { caller };
}

export { createJSXCaller };
