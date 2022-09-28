import Example from "./fixtures/example.marko";
import Mockable from "./fixtures/mockable.marko";
import Project from "./fixtures/project/index.marko";
import StyledInline from "./fixtures/styled-inline.marko";
import StyledExternal from "./fixtures/styled-external.marko";

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

test("transforms templates in node_modules", async () => {
  const result = await Project.render({});
  result.appendTo(document.body).getComponent();
  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div class="direct"><div class="indirect">Hello World</div></div>"`
  );
});

test("includes inline styles in jsdom", async () => {
  const result = await StyledInline.render({});
  result.appendTo(document.body).getComponent();
  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div class="inline">Hello world</div>"`
  );

  expect(
    getComputedStyle(document.body.firstElementChild!).color
  ).toMatchInlineSnapshot(`"green"`);
});

test("includes external styles in jsdom", async () => {
  const result = await StyledExternal.render({});
  result.appendTo(document.body).getComponent();
  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div class="external">Hello world</div>"`
  );

  expect(
    getComputedStyle(document.body.firstElementChild!).color
  ).toMatchInlineSnapshot(`"blue"`);
});
