<script context=module lang="ts">
    interface Update {
        id: string
        title: string
        description: string
        link: string
        date: Date
    }
    type EventToUpdate = (event: GitHubEvent) => Update

    function createUpdate(event:GitHubEvent, title:string, description?: string, link?: string): Update{
        const id = event.id
        const date = new Date(event.created_at)
        description = description ? description : event.repo.name
        link = link ? link : `https://github.com/${event.repo.name}`
        return {id, title, description, link, date}
    }

    const strategies = new Map() as Map<EventType, EventToUpdate>
    strategies.set(EventType.IssuesEvent, (event) => createUpdate(event,
        event.payload.issue.title,
        `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} issue`,
        event.payload.issue.html_url
    ))
    strategies.set(EventType.PullRequestEvent, (event) => createUpdate(event,
        event.payload.pull_request.title,
        `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} pull request`,
        event.payload.pull_request.html_url
    ))
</script>
<script lang="ts">
    import {EventType, GitHubEvent} from "../types/github"
    import SideBarEvent from "./SideBarElement.svelte";
    import Squircle from "./Squircle.svelte";

    export let minElements = 4
    export let events: GitHubEvent[] = []

    let nupdates: number | undefined = minElements

    $: updates = events.flatMap(x => {
        const strategy = strategies.get(x.type)
        return strategy ? [strategy(x)] : []
    }).slice(0, nupdates)
</script>
<Squircle>
  <h2 class="text-xl">
    Latest updates
  </h2>
  <ul class="mt-2 grid sm:grid-cols-2 md:grid-cols-1 gap-3">
    {#each updates as update (update.id)}
      <li class="col-span-1">
        <SideBarEvent {...update}/>
      </li>
    {:else}
    <span class="text-gray-800 dark:text-gray-400">
      Nothing new... yet
    </span>
    {/each}
  </ul>
</Squircle>