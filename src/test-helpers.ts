const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const nextCallStackFrame = () => {
  return delay(0);
};

export { nextCallStackFrame };
