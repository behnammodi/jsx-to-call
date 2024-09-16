import { nextCallStackFrame } from "./test-helpers";
import { createJSXCallStack } from "./jsx-call-stack";
import { createJSXCallStackRunner } from "./jsx-call-stack-runner";

describe("jsx-stack", () => {
  it("should run components in the order they were pushed", async () => {
    const runner = createJSXCallStackRunner();
    const { callStack, push } = createJSXCallStack(runner);

    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB", "ComponentC"];

    const ComponentA = () => {
      order.push("ComponentA");
    };
    const ComponentAProps = {};

    const ComponentB = () => {
      order.push("ComponentB");
    };
    const ComponentBProps = {};

    const ComponentC = () => {
      order.push("ComponentC");
    };
    const ComponentCProps = {};

    push(ComponentA, ComponentAProps);
    push(ComponentB, ComponentBProps);
    push(ComponentC, ComponentCProps);

    await nextCallStackFrame();

    expect(order).toEqual(expectedOrder);

    expect(callStack).toEqual([]);
  });
});
