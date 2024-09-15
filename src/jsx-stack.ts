function createJSXStack() {
  let stack = [];
  let runnerId = null;

  const run = () => {
    console.log(JSON.stringify(stack));

    stack.forEach(([component, props]) => {
      component(props);
    });

    stack = [];
  };

  const push = (component, props) => {
    stack.push([component, props]);

    clearTimeout(runnerId);
    runnerId = setTimeout(run, 1);
  };

  return { push };
}

export { createJSXStack };
