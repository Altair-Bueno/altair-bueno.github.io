<script lang="ts">
    import Link from "./Link.svelte";

    export let title: string
    export let description: string
    export let link: string
    export let date: Date

    $: timestamp = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

</script>
<article class="max-w-md">
  <h3 class="text-md">
    <Link href="{link}" target="_blank">{title}</Link>
  </h3>
  <div class="text-gray-800 dark:text-gray-400 text-md flex justify-between">
    <span>{description}</span>
    <span>{timestamp}</span>
  </div>
</article>