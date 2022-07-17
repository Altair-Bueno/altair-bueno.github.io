<script>
  const classes =
    "shadow shadow-xl rounded-2xl p-5 block m-1" +
    " " +
    "bg-rose-200 dark:bg-neutral-900 dark:text-neutral-200";
</script>

<div class="{classes} {$$props.class || ''}">
  <slot />
</div>
