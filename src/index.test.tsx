import JSX from "./index";

const delay = (ms: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

describe("jsx-to-call", () => {
  it("should jsx to call", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA"];

    function ComponentA() {
      order.push("ComponentA");
    }

    JSX.call(<ComponentA prop1="1" />);

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

    JSX.call(
      <ComponentA prop1="1">
        <ComponentB />
      </ComponentA>
    );

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

    JSX.call(
      <ComponentA prop1="1">
        <ComponentB />
        <ComponentC />
      </ComponentA>
    );

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

    JSX.call(
      <ComponentA prop1="1">
        <ComponentB>
          <ComponentC />
        </ComponentB>
      </ComponentA>
    );

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

    JSX.call(
      <ComponentA prop1="1">
        <ComponentB>
          <ComponentC />
          <ComponentD />
        </ComponentB>
      </ComponentA>
    );

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

    JSX.call(
      <>
        <ComponentA />
        <ComponentB />
      </>
    );

    expect(order).toEqual(expectedOrder);
  });
});
