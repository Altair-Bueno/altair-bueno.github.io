import { site } from "./site";

export interface Tool {
  name: string;
  link: string;
  icon: string;
}

export interface Resume {
  title: string;
  description: string;
  keypoints: string[];
  links: { name: string; href: string }[];
  sections: { title: string; tools: Tool[] }[];
}

interface RawTool {
  name: string;
  link?: string;
  icon: string;
}

export interface RawResume {
  title?: string;
  content?: { description?: string; keypoints?: string[] };
  links?: Record<string, string>;
  "known-tools"?: RawTool[];
  "learn-next"?: RawTool[];
}

// raw.githubusercontent.com is CORS-enabled and not subject to the REST API rate limit
export const rawBase = `https://raw.githubusercontent.com/${site.profileRepo}/HEAD/`;
export const resumeUrl = `${rawBase}data.json`;

const toTool = ({ name, link, icon }: RawTool): Tool => ({
  name,
  link: link ?? "",
  icon: new URL(icon, rawBase).href,
});

export function toResume(raw: RawResume): Resume {
  return {
    title: raw.title ?? "Hello, world!",
    description: raw.content?.description ?? "",
    keypoints: raw.content?.keypoints ?? [],
    links: Object.entries(raw.links ?? {}).map(([name, href]) => ({ name, href })),
    sections: [
      { title: "Toolbox", tools: (raw["known-tools"] ?? []).map(toTool) },
      { title: "Learning next", tools: (raw["learn-next"] ?? []).map(toTool) },
    ].filter((s) => s.tools.length > 0),
  };
}
