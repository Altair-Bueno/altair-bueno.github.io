import { describe, expect, test } from "vitest";
import { FetchError, fetchLive, lastKnown } from "./live";

const memory = () => {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) };
};

describe("fetchLive", () => {
  test("rate limits become a readable FetchError instead of crashing", async () => {
    const fetch = async () =>
      new Response("{}", { status: 403, headers: { "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1800000000" } });
    const result = fetchLive("k", "u", { fetch, storage: memory() });
    await expect(result).rejects.toBeInstanceOf(FetchError);
    await expect(result).rejects.toThrow(/rate limit/);
  });

  test("network failures become a FetchError", async () => {
    const fetch = async () => Promise.reject(new TypeError("Failed to fetch"));
    await expect(fetchLive("k", "u", { fetch, storage: memory() })).rejects.toBeInstanceOf(FetchError);
  });

  test("successful responses are remembered as the last known value", async () => {
    const storage = memory();
    await fetchLive("k", "u", { fetch: async () => Response.json([1, 2]), storage });
    expect(lastKnown("k", storage)).toEqual([1, 2]);
  });

  test("failures don't overwrite the last known value", async () => {
    const storage = memory();
    await fetchLive("k", "u", { fetch: async () => Response.json("good"), storage });
    await fetchLive("k", "u", { fetch: async () => new Response("", { status: 500 }), storage }).catch(() => {});
    expect(lastKnown("k", storage)).toBe("good");
  });
});
