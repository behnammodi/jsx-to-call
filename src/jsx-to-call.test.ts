import jsx from "./jsx-to-call";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("jsx-to-call", () => {
  it("should convert jsx to call", async () => {
    const order: string[] = [];
    const expectedOrder = ["ComponentA"];

    function ComponentA() {
      order.push("ComponentA");
    }

    jsx.caller(ComponentA, { prop1: "1" });

    await delay(1);

    expect(order).toEqual(expectedOrder);
  });
});
