import { describe, expect, test } from "vitest";
import { absolute, relative, toActivity, type RawEvent } from "./activity";

let n = 0;
const ev = (
  type: string,
  payload: Record<string, any>,
  repo = "me/repo",
  created_at = "2026-03-05T10:00:00Z",
): RawEvent => ({
  id: String(n++),
  type,
  repo: { name: repo },
  created_at,
  payload,
});

describe("toActivity", () => {
  test("PR events without title or html_url (slim payload) still get a title and a working link", () => {
    const [item] = toActivity([ev("PullRequestEvent", { action: "opened", number: 17, pull_request: { number: 17 } })]);
    expect(item).toMatchObject({ verb: "Opened PR", target: "#17", url: "https://github.com/me/repo/pull/17" });
  });

  test("PR events with full payload use title and html_url", () => {
    const [item] = toActivity([
      ev("PullRequestEvent", {
        action: "closed",
        pull_request: { number: 3, title: "Fix it", merged: true, html_url: "https://example.com/pr/3" },
      }),
    ]);
    expect(item).toMatchObject({ kind: "merge", verb: "Merged PR", target: "Fix it", url: "https://example.com/pr/3" });
  });

  test("push events are shown and link to the head commit", () => {
    const [item] = toActivity([ev("PushEvent", { ref: "refs/heads/feat/x", head: "abc" })]);
    expect(item).toMatchObject({ verb: "Pushed to", target: "feat/x", url: "https://github.com/me/repo/commit/abc" });
  });

  test("pushes to the same branch collapse into the newest, even when interleaved", () => {
    const items = toActivity([
      ev("PushEvent", { ref: "refs/heads/main", head: "d" }),
      ev("PushEvent", { ref: "refs/heads/main", head: "c" }),
      ev("PushEvent", { ref: "refs/heads/main", head: "x" }, "me/other"),
      ev("PushEvent", { ref: "refs/heads/main", head: "b" }),
      ev("PushEvent", { ref: "refs/heads/dev", head: "a" }),
    ]);
    expect(items.map((i) => i.url)).toEqual([
      "https://github.com/me/repo/commit/d",
      "https://github.com/me/other/commit/x",
      "https://github.com/me/repo/commit/a",
    ]);
  });

  test("noise is skipped and the limit is honoured", () => {
    const items = toActivity(
      [
        ev("DeleteEvent", {}),
        ev("CreateEvent", { ref_type: "branch", ref: "x" }),
        ...Array.from({ length: 10 }, () => ev("WatchEvent", { action: "started" })),
      ],
      4,
    );
    expect(items).toHaveLength(4);
    expect(items.every((i) => i.kind === "star")).toBe(true);
  });
});

describe("dates", () => {
  test("absolute dates use the real month (legacy site showed getMonth(), off by one)", () => {
    expect(absolute("2026-03-05T10:00:00Z")).toContain("March 5, 2026");
  });

  test("relative dates", () => {
    const now = Date.parse("2026-03-08T10:00:00Z");
    expect(relative("2026-03-05T10:00:00Z", now)).toBe("3 days ago");
    expect(relative("2026-03-08T09:59:50Z", now)).toBe("just now");
    expect(relative("2026-03-07T10:00:00Z", now)).toBe("yesterday");
  });
});
