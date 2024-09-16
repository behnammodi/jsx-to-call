function createJSXCallStackRunner() {
  const runner = (callStack) => {
    let runnerId = null;

    const killPreviousRunner = () => {
      clearTimeout(runnerId);
    };

    const cleanUpStack = () => {
      callStack.splice(0, callStack.length);
    };

    const run = () => {
      killPreviousRunner();

      runnerId = setTimeout(() => {
        callStack.forEach(([component, props]) => {
          component(props);
        });

        cleanUpStack();
      }, 0);
    };

    return { run };
  };

  return runner;
}

export { createJSXCallStackRunner };
