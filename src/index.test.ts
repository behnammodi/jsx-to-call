import JSX, { Fragment } from "./index";

const delay = (ms: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

describe("jsx-to-call", () => {
  it("should jsx to call", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA"];

    function ComponentA() {
      order.push("ComponentA");
    }

    /**
     * <ComponentA prop1="1" />
     */
    JSX.createCall(ComponentA, { prop1: "1" });

    await delay();

    expect(order).toEqual(expectedOrder);
  });

  it("should jsx to call with children", async () => {
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
    JSX.createCall(ComponentA, { prop1: "1" }, JSX.createCall(ComponentB, {}));

    await delay();

    expect(order).toEqual(expectedOrder);
  });

  it("should jsx to call with multiple children", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB", "ComponentC"];

    function ComponentA() {
      order.push("ComponentA");
    }

    function ComponentB() {
      order.push("ComponentB");
    }

    function ComponentC() {
      order.push("ComponentC");
    }

    /**
     * <ComponentA prop1="1">
     *  <ComponentB />
     *  <ComponentC />
     * </ComponentA>
     */
    JSX.createCall(
      ComponentA,
      { prop1: "1" },
      JSX.createCall(ComponentB, {}),
      JSX.createCall(ComponentC, {})
    );

    await delay();

    expect(order).toEqual(expectedOrder);
  });

  it("should jsx to call with nested children", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB", "ComponentC"];

    function ComponentA() {
      order.push("ComponentA");
    }

    function ComponentB() {
      order.push("ComponentB");
    }

    function ComponentC() {
      order.push("ComponentC");
    }

    /**
     * <ComponentA prop1="1">
     *  <ComponentB>
     *    <ComponentC />
     *  </ComponentB>
     * </ComponentA>
     */
    JSX.createCall(
      ComponentA,
      { prop1: "1" },
      JSX.createCall(ComponentB, {}, JSX.createCall(ComponentC, {}))
    );

    await delay();

    expect(order).toEqual(expectedOrder);
  });

  it("should jsx to call with multiple nested children", async () => {
    const order: string[] = [];
    const expectedOrder = [
      "ComponentA",
      "ComponentB",
      "ComponentC",
      "ComponentD",
    ];

    function ComponentA() {
      order.push("ComponentA");
    }

    function ComponentB() {
      order.push("ComponentB");
    }

    function ComponentC() {
      order.push("ComponentC");
    }

    function ComponentD() {
      order.push("ComponentD");
    }

    /**
     * <ComponentA prop1="1">
     *  <ComponentB>
     *    <ComponentC />
     *    <ComponentD />
     *  </ComponentB>
     * </ComponentA>
     */
    JSX.createCall(
      ComponentA,
      { prop1: "1" },
      JSX.createCall(
        ComponentB,
        {},
        JSX.createCall(ComponentC, {}),
        JSX.createCall(ComponentD, {})
      )
    );

    await delay();

    expect(order).toEqual(expectedOrder);
  });

  it("should handle Fragment as well", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB"];

    function ComponentA() {
      order.push("ComponentA");
    }

    function ComponentB() {
      order.push("ComponentB");
    }

    /**
     * <>
     *  <ComponentA />
     *  <ComponentB />
     * </>
     */
    JSX.createCall(
      Fragment,
      {},
      JSX.createCall(ComponentA, {}),
      JSX.createCall(ComponentB, {})
    );

    await delay();

    expect(order).toEqual(expectedOrder);
  });
});
