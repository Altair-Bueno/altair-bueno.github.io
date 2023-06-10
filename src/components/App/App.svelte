<script lang="ts" context="module">
  async function handleResponse<T>(response: Response): Promise<T> {
    const ok = response.ok;
    const content = await response.json();

    if (ok) {
      return content as T;
    } else {
      throw new Error(content.message);
    }
  }
  async function appFetch<T>({
    link,
    request,
  }: {
    link: string;
    request: RequestInit;
  }): Promise<T> {
    return fetch(link, request).then((x) => handleResponse<T>(x));
  }
</script>

<script lang="ts">
  import type { GitHubEvent, Resume } from "./types";
  import { InfoCard, Footer, Spinner, ErrorMessage, Events } from "./lib";

  import {
    websiteSource,
    resume,
    events,
    acknowledgments,
  } from "./assets/data/config.json";
  const resumePromise = appFetch<Resume>(resume);
  const eventsPromise = appFetch<GitHubEvent[]>(events);
</script>

<div class="flex flex-col w-screen h-screen items-center">
  <div class="flex flex-col md:flex-row gap-4 m-4 md:mt-24">
    {#await Promise.all([resumePromise, eventsPromise])}
      <Spinner />
    {:then [resume, events]}
      <main>
        <InfoCard {resume} {websiteSource} />
      </main>
      <aside>
        <Events {events} />
      </aside>
    {:catch error}
      <ErrorMessage message={error.toString()} />
    {/await}
  </div>
  <footer class="mt-auto w-full">
    <Footer {acknowledgments} />
  </footer>
</div>
