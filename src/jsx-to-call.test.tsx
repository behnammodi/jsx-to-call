import JSX from "./jsx-to-call";

describe("jsx-to-call", () => {
  it("should jsx to call", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA"];

    function ComponentA() {
      order.push("ComponentA");
    }

    JSX.call(<ComponentA />);

    expect(order).toEqual(expectedOrder);
  });

  it("should return component value", async () => {
    function ComponentA() {
      return "ComponentA";
    }

    const returnValue = JSX.call(<ComponentA />);

    expect(returnValue).toEqual("ComponentA");
  });

  it("should jsx to call with children", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB"];

    function ComponentA({ children = null }) {
      order.push("ComponentA");

      return children;
    }

    function ComponentB() {
      order.push("ComponentB");
    }

    JSX.call(
      <ComponentA>
        <ComponentB />
      </ComponentA>
    );

    expect(order).toEqual(expectedOrder);
  });

  it("should jsx to call with multiple children", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB", "ComponentC"];

    function ComponentA({ children = null }) {
      order.push("ComponentA");

      return children;
    }

    function ComponentB() {
      order.push("ComponentB");
    }

    function ComponentC() {
      order.push("ComponentC");
    }

    JSX.call(
      <ComponentA>
        <ComponentB />
        <ComponentC />
      </ComponentA>
    );

    expect(order).toEqual(expectedOrder);
  });

  it("should jsx to call with nested children", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA", "ComponentB", "ComponentC"];

    function ComponentA({ children = null }) {
      order.push("ComponentA");

      return children;
    }

    function ComponentB({ children = null }) {
      order.push("ComponentB");

      return children;
    }

    function ComponentC() {
      order.push("ComponentC");
    }

    JSX.call(
      <ComponentA>
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

    function ComponentA({ children = null }) {
      order.push("ComponentA");

      return children;
    }

    function ComponentB({ children = null }) {
      order.push("ComponentB");

      return children;
    }

    function ComponentC() {
      order.push("ComponentC");
    }

    function ComponentD() {
      order.push("ComponentD");
    }

    JSX.call(
      <ComponentA>
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
