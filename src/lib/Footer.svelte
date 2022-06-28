<script lang="ts">
    import {Acknowledgment} from '../types/acknowledgment'

    export let acknowledgments: Acknowledgment[]
</script>
<div class="text-gray-600 dark:text-gray-400 text-xs">
  <div class="p-3">
    {#if (acknowledgments)}
      <ul>
        {#each acknowledgments as ack}
          <li>
            {ack.iconName} icon made by
            <a href="{ack.author.link}"
               class="underline text-emerald-700 visited:text-emerald-900 dark:text-emerald-400 dark:visited:text-emerald-700">
              {ack.author.name}
            </a>
            from <a
                  class="underline text-emerald-700 visited:text-emerald-900 dark:text-emerald-400 dark:visited:text-emerald-700"
                  href="{ack.website.link}">
            {ack.website.name}
          </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>