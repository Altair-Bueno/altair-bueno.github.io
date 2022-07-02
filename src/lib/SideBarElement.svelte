<script lang="ts">
    export let title: string
    export let description: string
    export let link: string
    export let date: Date

    $: timestamp = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

</script>
<article class="max-w-md">
  <h3 class="text-md">
    <a class="underline text-emerald-300 visited:text-emerald-500 hover:text-emerald-500"
       href="{link}"
       target="_blank">
      {title}
    </a>
  </h3>
  <div class="text-gray-500 text-md">
    <span>{description}</span>
    <span>{timestamp}</span>
  </div>
</article>