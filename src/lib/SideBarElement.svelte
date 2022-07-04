<script lang="ts">
    import Link from "./Link.svelte";
    import SvelteMarkdown from 'svelte-markdown'

    export let title: string
    export let description: string
    export let link: string
    export let date: Date

    $: timestamp = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

</script>
<article class="max-w-md hover:shadow-2xl hover:bg-red-300 hover:dark:bg-slate-900 p-2 rounded-xl">
  <h3 class="text-md">
    <Link href="{link}" target="_blank">
      <SvelteMarkdown isInline source="{title}"/>
    </Link>
  </h3>
  <div class="text-gray-800 dark:text-gray-400 text-md flex justify-between">
    <span>
      <SvelteMarkdown isInline source="{description}"/>
    </span>
    <span>{timestamp}</span>
  </div>
</article>