export interface RawEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, any>;
}

export type Kind = "push" | "pr" | "merge" | "issue" | "review" | "repo" | "tag" | "release" | "star";

export interface Item {
  id: string;
  kind: Kind;
  verb: string;
  target: string;
  url: string;
  repo: string;
  date: string;
}

const gh = (path: string) => `https://github.com/${path}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function toItem(e: RawEvent): Item | undefined {
  const repo = e.repo.name;
  const p = e.payload;
  const base = { id: e.id, repo, date: e.created_at };
  switch (e.type) {
    case "PushEvent": {
      const branch = String(p["ref"] ?? "").replace(/^refs\/heads\//, "");
      return {
        ...base,
        kind: "push",
        verb: "Pushed to",
        target: branch,
        url: p["head"] ? gh(`${repo}/commit/${p["head"]}`) : gh(repo),
      };
    }
    case "PullRequestEvent": {
      const pr = p["pull_request"] ?? {};
      const action: string = p["action"] === "closed" && pr.merged ? "merged" : p["action"];
      if (!["opened", "merged", "reopened"].includes(action)) return undefined;
      return {
        ...base,
        kind: action === "merged" ? "merge" : "pr",
        verb: `${cap(action)} PR`,
        target: pr.title ?? `#${pr.number ?? p["number"]}`,
        url: pr.html_url ?? gh(`${repo}/pull/${pr.number ?? p["number"]}`),
      };
    }
    case "IssuesEvent": {
      const issue = p["issue"] ?? {};
      if (!["opened", "closed", "reopened"].includes(p["action"])) return undefined;
      return {
        ...base,
        kind: "issue",
        verb: `${cap(p["action"])} issue`,
        target: issue.title ?? `#${issue.number}`,
        url: issue.html_url ?? gh(`${repo}/issues/${issue.number}`),
      };
    }
    case "PullRequestReviewEvent": {
      const pr = p["pull_request"] ?? {};
      return {
        ...base,
        kind: "review",
        verb: "Reviewed PR",
        target: pr.title ?? `#${pr.number}`,
        url: pr.html_url ?? gh(`${repo}/pull/${pr.number}`),
      };
    }
    case "CreateEvent":
      if (p["ref_type"] === "repository")
        return { ...base, kind: "repo", verb: "Created", target: repo, url: gh(repo) };
      if (p["ref_type"] === "tag")
        return {
          ...base,
          kind: "tag",
          verb: "Tagged",
          target: p["ref"],
          url: gh(`${repo}/releases/tag/${p["ref"]}`),
        };
      return undefined;
    case "ReleaseEvent": {
      const r = p["release"] ?? {};
      if (p["action"] !== "published") return undefined;
      return {
        ...base,
        kind: "release",
        verb: "Released",
        target: r.name || r.tag_name,
        url: r.html_url ?? gh(`${repo}/releases`),
      };
    }
    case "WatchEvent":
      return { ...base, kind: "star", verb: "Starred", target: repo, url: gh(repo) };
    default:
      return undefined;
  }
}

/**
 * Turns raw GitHub events (newest first) into feed items. Pushes to the same
 * branch collapse into the newest one, so a busy branch does not drown every
 * other kind of activity.
 */
export function toActivity(events: RawEvent[], limit = 8): Item[] {
  const items: Item[] = [];
  const pushed = new Set<string>();
  for (const e of events) {
    const item = toItem(e);
    if (!item) continue;
    if (item.kind === "push") {
      const key = `${item.repo}\0${item.target}`;
      if (pushed.has(key)) continue;
      pushed.add(key);
    }
    items.push(item);
    if (items.length === limit) break;
  }
  return items;
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

export function relative(date: string, now: number): string {
  const secs = (new Date(date).getTime() - now) / 1000;
  for (const [unit, size] of units) {
    if (Math.abs(secs) >= size) return rtf.format(Math.round(secs / size), unit);
  }
  return "just now";
}

const dtf = new Intl.DateTimeFormat("en", { dateStyle: "long", timeStyle: "short", timeZone: "UTC" });

export const absolute = (date: string) => `${dtf.format(new Date(date))} UTC`;
