import Example from "./fixtures/example.marko";
import Mockable from "./fixtures/mockable.marko";
import Project from "./fixtures/project/index.marko";

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

test("transforms templates in node_modules", () => {
  expect(Project.renderSync({}).toString()).toMatchInlineSnapshot(
    `"<div class=direct><div class=indirect>Hello World</div></div>"`
  );
});
