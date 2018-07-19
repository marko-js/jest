import Example from "./fixtures/example.marko";

test("works in the browser", async () => {
  const result = await Example.render({});
  result.appendTo(document.body).getComponent();
  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div>Hello World</div>"`
  );
});
