export class FetchError extends Error {}

export interface LiveOptions {
  fetch?: typeof fetch;
  storage?: Pick<Storage, "getItem" | "setItem"> | undefined;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

function defaultStorage(): LiveOptions["storage"] {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

/** The last successful response for `key`, used only while a fresh fetch is in flight or failed. */
export function lastKnown<T>(key: string, storage = defaultStorage()): T | undefined {
  try {
    const raw = storage?.getItem(`live:${key}`);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

/** Fetches JSON, remembering it as the last known value. Throws a readable FetchError on failure. */
export async function fetchLive<T>(key: string, url: string, o: LiveOptions = {}): Promise<T> {
  const { fetch = globalThis.fetch, storage = defaultStorage(), signal, headers } = o;
  let res: Response;
  try {
    res = await fetch(url, { headers: headers ?? {}, ...(signal ? { signal } : {}) });
  } catch (e) {
    if (signal?.aborted) throw e;
    throw new FetchError("GitHub is unreachable right now.");
  }
  if (!res.ok) {
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    if ((res.status === 403 || res.status === 429) && res.headers.get("x-ratelimit-remaining") === "0" && reset) {
      const at = new Date(reset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      throw new FetchError(`GitHub's rate limit was reached. It resets at ${at}.`);
    }
    throw new FetchError(`GitHub answered with HTTP ${res.status}.`);
  }
  const data = (await res.json()) as T;
  try {
    storage?.setItem(`live:${key}`, JSON.stringify(data));
  } catch {}
  return data;
}
