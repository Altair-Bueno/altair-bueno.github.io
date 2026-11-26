import { expect, test } from "vitest";
import { toResume } from "./resume";

test("tool icons resolve against the profile repo and empty sections are dropped", () => {
  const r = toResume({
    "known-tools": [{ name: "Rust", icon: ".github/resources/rust.png" }],
    links: { GitHub: "https://github.com/x" },
  });
  expect(r.sections).toEqual([
    {
      title: "Toolbox",
      tools: [
        {
          name: "Rust",
          link: "",
          icon: "https://raw.githubusercontent.com/Altair-Bueno/Altair-Bueno/HEAD/.github/resources/rust.png",
        },
      ],
    },
  ]);
  expect(r.links).toEqual([{ name: "GitHub", href: "https://github.com/x" }]);
  expect(r.title).toBe("Hello, world!");
});
