function createJSXCallStack() {
  let callStack = [];
  let runnerId = null;

  const run = () => {
    callStack.forEach(([component, props]) => {
      component(props);
    });

    callStack = [];
  };

  const push = (component, props) => {
    callStack.push([component, props]);

    clearTimeout(runnerId);
    runnerId = setTimeout(run, 0);
  };

  return { push, callStack };
}

export { createJSXCallStack };
