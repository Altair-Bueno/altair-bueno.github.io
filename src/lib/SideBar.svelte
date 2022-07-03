<script lang="ts">
    import {EventType, GitHubEvent} from "../types/event"
    import SideBarEvent from "./SideBarElement.svelte";
    import Squircle from "./Squircle.svelte";

    export let minElements = 4
    export let events: GitHubEvent[] = []

    let nupdates: number | undefined = minElements

    interface Update {
        id: string
        title: string
        description: string
        link: string
        date: Date
    }

    const createUpdate = (event, title, description?, link?) => {
        const id = event.id
        const date = new Date(event.created_at)
        //title = "sldkfjj asj kafjk jajsj jasjk fdjas klfjasjdf askfjlasjdfjasl jfajskdl fjaksjf sajdl fj"
        description = description ? description : event.repo.name
        link = link ? link : `https://github.com/${event.repo.name}`
        return {id, title, description, link, date}
    }

    const strategies = new Map() as Map<EventType, (event: GitHubEvent) => Update>
    //strategies.set(EventType.PushEvent, (event: GitHubEvent) => createUpdate(event, `Pushed ${event.payload.commits.length} commit${event.payload.commits.length > 1 ? "s" : ""} to ${event.payload.ref.replace("refs/heads/","")}`))
    strategies.set(EventType.IssuesEvent, (event) => createUpdate(event, event.payload.issue.title, `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} issue`, event.payload.issue.html_url))
    strategies.set(EventType.PullRequestEvent, (event) => createUpdate(event, event.payload.pull_request.title, `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} pull request`, event.payload.pull_request.html_url))

    function eventToUpdate(event: GitHubEvent) {
        const strategy = strategies.get(event.type)
        return strategy(event)
    }

    function eventFilter(event: GitHubEvent) {
        return strategies.has(event.type)
    }

    function toggleAll() {
        nupdates = nupdates ? undefined : minElements
    }

    $: updates = events.filter(eventFilter)
        .slice(0, nupdates)
        .map(eventToUpdate)

</script>
<Squircle>
  <h2 class="text-xl">
    Latest updates
  </h2>
  <ul class="mt-2 grid sm:grid-cols-2 md:grid-cols-1">
    {#each updates as update (update.id)}
      <li class="col-span-1">
        <SideBarEvent {...update}/>
      </li>
    {/each}
  </ul>
</Squircle>