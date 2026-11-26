<script lang="ts">
  import { onMount } from "svelte";
  import { FetchError, fetchLive, lastKnown } from "../lib/live";
  import { resumeUrl, toResume, type RawResume, type Resume } from "../lib/resume";

  interface Props {
    name: string;
    avatar: string;
    profile: string;
  }

  let { name, avatar, profile }: Props = $props();

  let resume = $state<Resume>();
  let error = $state<string>();
  let controller: AbortController | undefined;

  const icons: Record<string, string> = {
    GitHub: "/icons/github.svg",
    LinkedIn: "/icons/linkedin.svg",
    Mail: "/icons/mail.svg",
    Resume: "/icons/resume.png",
  };

  function load() {
    controller?.abort();
    controller = new AbortController();
    error = undefined;
    fetchLive<RawResume>("resume", resumeUrl, { signal: controller.signal })
      .then((raw) => (resume = toResume(raw)))
      .catch((e) => {
        if (e instanceof FetchError) error = e.message;
      });
  }

  onMount(() => {
    const known = lastKnown<RawResume>("resume");
    if (known) resume = toResume(known);
    load();
    return () => controller?.abort();
  });
</script>

<header aria-busy={!resume && !error}>
  <img
    src={`${avatar}&s=176`}
    alt=""
    width="88"
    height="88"
    fetchpriority="high"
    class="mb-8 size-22 rounded-3xl border border-line shadow-lg shadow-black/5"
  />
  <p class="mb-3 h-5 font-mono text-sm text-accent">
    {#if resume}
      <span aria-hidden="true">{"$ "}</span>{resume.title}<span class="caret ml-1" aria-hidden="true"></span>
    {:else}
      <span aria-hidden="true">{"$ "}</span><span class="caret" aria-hidden="true"></span>
    {/if}
  </p>
  <h1 class="text-5xl font-bold tracking-tight text-balance sm:text-6xl">{name}</h1>

  {#if resume}
    <p class="mt-5 max-w-xl text-xl text-pretty text-muted">{resume.description}</p>
    {#if resume.keypoints.length}
      <ul class="mt-8 max-w-xl space-y-2.5">
        {#each resume.keypoints as point (point)}
          <li class="flex gap-3">
            <span class="font-mono text-accent" aria-hidden="true">→</span>
            <span>{point}</span>
          </li>
        {/each}
      </ul>
    {/if}
    <nav aria-label="Contact" class="mt-10 flex flex-wrap gap-2.5">
      {#each resume.links as { name, href } (name)}
        <a
          {href}
          class="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          {#if icons[name]}
            <span class="icon-mask size-4" style:--icon={`url(${icons[name]})`} aria-hidden="true"></span>
          {:else}
            <span class="font-mono" aria-hidden="true">↗</span>
          {/if}
          {name}
        </a>
      {/each}
    </nav>
  {:else if !error}
    <div class="motion-safe:animate-pulse" aria-hidden="true">
      <div class="mt-6 h-6 w-4/5 max-w-md rounded bg-line"></div>
      <div class="mt-9 space-y-4">
        {#each [72, 64, 80, 48] as w, i (i)}
          <div class="h-4 rounded bg-line" style:width={`${w}%`}></div>
        {/each}
      </div>
      <div class="mt-11 flex gap-2.5">
        {#each [0, 1, 2, 3] as i (i)}
          <div class="h-9 w-24 rounded-full bg-line"></div>
        {/each}
      </div>
    </div>
  {/if}

  {#if error}
    <p role="status" class="mt-8 max-w-xl rounded-xl border border-line bg-card p-4 text-sm">
      {resume ? "Showing the last version you loaded." : "Couldn't load the profile."}
      {error}
      <button class="font-medium text-accent underline underline-offset-4" onclick={load}>Retry</button>
      or visit <a class="font-medium text-accent underline underline-offset-4" href={profile}>GitHub</a>.
    </p>
  {/if}
</header>

{#if resume}
  {#each resume.sections as { title, tools } (title)}
    <section class="mt-14">
      <h2 class="mb-4 font-mono text-sm tracking-wide text-muted uppercase">{title}</h2>
      <ul class="flex flex-wrap gap-2">
        {#each tools as tool (tool.name)}
          {@const cls = "inline-flex items-center gap-2 rounded-lg border border-line bg-card py-1 pr-3 pl-1 text-sm"}
          <li>
            <svelte:element
              this={tool.link ? "a" : "span"}
              href={tool.link || undefined}
              class={[cls, tool.link && "transition hover:border-accent hover:text-accent"]}
            >
              <span class="grid size-6 place-items-center rounded-md bg-white p-0.5">
                <span class="size-5 bg-contain bg-center bg-no-repeat" style:background-image={`url(${tool.icon})`}
                ></span>
              </span>
              {tool.name}
            </svelte:element>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
{/if}
