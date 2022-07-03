<script>
  $: classes = $$props.class ? $$props.class : ""
</script>
<div class="bg-red-200 dark:bg-zinc-800 dark:text-gray-50 rounded-2xl p-5 block m-1 {classes}">
  <slot/>
</div>