<script lang="ts" context="module">
  export type AppFetchRequest = {
    link: string;
    request: RequestInit;
  };
  async function handleResponse<T>(response: Response): Promise<T> {
    const ok = response.ok;
    const content = await response.json();

    if (ok) {
      return content as T;
    } else {
      throw new Error(content.message);
    }
  }
  async function appFetch<T>({ link, request }: AppFetchRequest): Promise<T> {
    return fetch(link, request).then((x) => handleResponse<T>(x));
  }
</script>

<script lang="ts">
  import type { GitHubEvent, Resume, WebsiteSource } from "./types";
  import { InfoCard, Spinner, ErrorMessage, Events } from "./lib";

  export let websiteSource: WebsiteSource;
  export let resume: AppFetchRequest;
  export let events: AppFetchRequest;

  const resumePromise = appFetch<Resume>(resume);
  const eventsPromise = appFetch<GitHubEvent[]>(events);
</script>

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
