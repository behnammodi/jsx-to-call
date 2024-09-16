function createJSXCallStack(runner) {
  let callStack = [];
  const { run } = runner(callStack);

  const push = (component, props) => {
    callStack.push([component, props]);

    run();
  };

  return { push, callStack };
}

export { createJSXCallStack };
