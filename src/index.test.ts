import jsx from "./index";
import { nextCallStackFrame } from "./test-helpers";

describe("jsx-to-call", () => {
  it("should convert jsx to call", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA"];

    function ComponentA() {
      order.push("ComponentA");
    }

    /**
     * <ComponentA prop1="1" />
     */
    jsx.createCall(ComponentA, { prop1: "1" });

    await nextCallStackFrame();

    expect(order).toEqual(expectedOrder);
  });

  it("should convert jsx to call with children", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB"];

    function ComponentA() {
      order.push("ComponentA");
    }

    function ComponentB() {
      order.push("ComponentB");
    }

    /**
     * <ComponentA prop1="1">
     *  <ComponentB />
     * </ComponentA>
     */
    jsx.createCall(ComponentA, { prop1: "1" }, jsx.createCall(ComponentB, {}));

    await nextCallStackFrame();

    expect(order).toEqual(expectedOrder);
  });
});
