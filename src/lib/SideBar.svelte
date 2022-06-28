<script lang="ts">
    import {GitHubEvent} from "../types/event"
    import IssueCommentEvent from "./events/IssueCommentEvent.svelte";

    export let events: GitHubEvent[]
</script>
{#each events as event}
  {#if event.type === 'IssueCommentEvent'}
    <IssueCommentEvent {event}/>
  {/if}

{/each}