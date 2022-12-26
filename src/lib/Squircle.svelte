<script lang="ts">
  const classes = `
  shadow shadow-xl rounded-2xl p-5 block m-1
  bg-rose-200 dark:bg-neutral-900 dark:text-neutral-200
  ${$$props.class ?? ""}
  `;
</script>

<div class={classes}>
  <slot />
</div>
