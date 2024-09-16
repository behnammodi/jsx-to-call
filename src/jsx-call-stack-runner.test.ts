import { createJSXCallStackRunner } from "./jsx-call-stack-runner";
import { nextCallStackFrame } from "./test-helpers";

describe("jsx-call-stack-runner", () => {
  it("should run components in the order they were pushed", async () => {
    const runner = createJSXCallStackRunner();

    const expectedOrder = ["ComponentA", "ComponentB", "ComponentC"];

    const order: string[] = [];

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

    const { run } = runner([
      [ComponentA, ComponentAProps],
      [ComponentB, ComponentBProps],
      [ComponentC, ComponentCProps],
    ]);

    run();

    await nextCallStackFrame();

    expect(order).toEqual(expectedOrder);
  });
});
