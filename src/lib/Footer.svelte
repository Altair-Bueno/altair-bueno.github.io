<script lang="ts">
    import {Acknowledgment} from '../types/acknowledgment'
    import Link from "./Link.svelte";

    export let acknowledgments: Acknowledgment[]
</script>
<div class="text-gray-600 dark:text-gray-400 text-xs">
  <div class="p-3">
    {#if (acknowledgments)}
      <ul>
        {#each acknowledgments as ack}
          <li>
            {ack.iconName} icon made by <Link target="_blank" href="{ack.author.link}">{ack.author.name}</Link>
            from <Link target="_blank" href="{ack.website.link}">{ack.website.name}</Link>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>