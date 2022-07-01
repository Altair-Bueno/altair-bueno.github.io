<script lang="ts">
    import {GitHubEvent} from "../types/event"
    import SideBarEvent from "./SideBarEvent.svelte";

    export let events: GitHubEvent[]
</script>
<div class="bg-teal-100 dark:bg-zinc-800 dark:text-gray-50 rounded-2xl p-5 block m-1">
  <h2 class="text-xl">Latest updates</h2>
  <ul>
    {#each events as event (event.id)}
      <SideBarEvent {event}/>
    {/each}
  </ul>
</div>