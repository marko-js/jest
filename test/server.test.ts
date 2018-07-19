import Example from "./fixtures/example.marko";

test("server rendering", () => {
  expect(Example.renderSync({}).toString()).toMatchInlineSnapshot(
    `"<div>Hello World</div>"`
  );
});
