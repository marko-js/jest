import Example from "./fixtures/example.marko";
import Mockable from "./fixtures/mockable.marko";

test("server rendering", () => {
  expect(Example.renderSync({}).toString()).toMatchInlineSnapshot(
    `"<div>Hello World</div>"`
  );
});

jest.mock("./fixtures/mockable.marko");
test("can be mocked", async () => {
  expect(Mockable.renderSync({}).toString()).toMatchInlineSnapshot(
    `"<div>Hello Mocked</div>"`
  );
});
