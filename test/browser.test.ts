import Example from "./fixtures/example.marko";
import Mockable from "./fixtures/mockable.marko";

afterEach(() => {
  document.body.innerHTML = "";
});

test("works in the browser", async () => {
  const result = await Example.render({});
  result.appendTo(document.body).getComponent();
  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div>Hello World</div>"`
  );
});

jest.mock("./fixtures/mockable.marko");
test("can be mocked", async () => {
  const result = await Mockable.render({});
  result.appendTo(document.body).getComponent();
  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div>Hello Mocked</div>"`
  );
});
