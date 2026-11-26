<script lang="ts">
  import { onMount } from "svelte";
  import { absolute, relative, toActivity, type Item, type Kind, type RawEvent } from "../lib/activity";
  import { FetchError, fetchLive, lastKnown } from "../lib/live";

  interface Props {
    url: string;
    profile: string;
  }

  let { url, profile }: Props = $props();

  let items = $state<Item[]>();
  let error = $state<string>();
  let live = $state(false);
  let now = $state(0);
  let controller: AbortController | undefined;

  const glyph: Record<Kind, string> = {
    push: "↑",
    pr: "↗",
    merge: "◆",
    issue: "◎",
    review: "✓",
    repo: "+",
    tag: "#",
    release: "▲",
    star: "★",
  };

  function load() {
    controller?.abort();
    controller = new AbortController();
    error = undefined;
    fetchLive<RawEvent[]>("events", url, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((events) => {
        items = toActivity(events);
        live = true;
        now = Date.now();
      })
      .catch((e) => {
        if (e instanceof FetchError) error = e.message;
      });
  }

  onMount(() => {
    now = Date.now();
    const known = lastKnown<RawEvent[]>("events");
    if (known) items = toActivity(known);
    load();
    const tick = setInterval(() => (now = Date.now()), 60_000);
    return () => {
      controller?.abort();
      clearInterval(tick);
    };
  });
</script>

<div class="mb-4 flex items-baseline justify-between gap-4">
  <h2 class="font-mono text-sm tracking-wide text-muted uppercase">Recent activity</h2>
  {#if items}
    <span
      class="flex items-center gap-2 font-mono text-xs text-muted"
      title={live ? "Fetched just now from GitHub" : "Last version you loaded"}
    >
      <span class={["size-1.5 rounded-full", live ? "bg-accent motion-safe:animate-pulse" : "bg-line"]}></span>
      {live ? "live" : "offline"}
    </span>
  {/if}
</div>

<div aria-busy={!items && !error}>
  {#if items?.length}
    <ol
      class="relative space-y-1 before:absolute before:top-3 before:bottom-3 before:left-[0.95rem] before:w-px before:bg-line"
    >
      {#each items as item (item.id)}
        <li>
          <a
            href={item.url}
            class="group relative flex items-start gap-3 rounded-xl p-1.5 pr-3 transition-colors hover:bg-card"
          >
            <span
              aria-hidden="true"
              class="relative grid size-6 shrink-0 place-items-center rounded-full border border-line bg-paper font-mono text-xs text-accent group-hover:border-accent"
            >
              {glyph[item.kind]}
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate">
                <span class="text-muted">{item.verb}</span>
                <span class="font-medium group-hover:text-accent">{item.target}</span>
              </span>
              <span class="flex justify-between gap-3 font-mono text-xs text-muted">
                <span class="truncate">{item.repo}</span>
                <time class="shrink-0" datetime={item.date} title={absolute(item.date)}>
                  {relative(item.date, now)}
                </time>
              </span>
            </span>
          </a>
        </li>
      {/each}
    </ol>
  {:else if items}
    <p class="text-muted">Nothing new… yet.</p>
  {:else if !error}
    <ol class="space-y-1 motion-safe:animate-pulse" aria-hidden="true">
      {#each [70, 55, 80, 60, 75, 50] as w, i (i)}
        <li class="flex gap-3 p-1.5">
          <span class="size-6 shrink-0 rounded-full bg-line"></span>
          <span class="flex-1 space-y-2 pt-1">
            <span class="block h-3.5 rounded bg-line" style:width={`${w}%`}></span>
            <span class="block h-2.5 w-2/5 rounded bg-line"></span>
          </span>
        </li>
      {/each}
    </ol>
  {/if}

  {#if error}
    <p role="status" class="mt-3 rounded-xl border border-line bg-card p-3 text-sm">
      {items ? "Couldn't refresh." : "Couldn't load activity."}
      {error}
      <button class="font-medium text-accent underline underline-offset-4" onclick={load}>Retry</button>
    </p>
  {/if}
</div>

<a
  href={profile}
  class="mt-4 inline-block font-mono text-xs text-muted underline-offset-4 hover:text-accent hover:underline"
>
  more on GitHub →
</a>
