<script lang="ts">
  export let target: string;
  export let href: string;
  export let src: string;
  export let alt: string;

  $: classes = `
  w-7 motion-safe:transition motion-safe:ease-in-out 
  motion-safe:hover:scale-110 motion-safe:duration-200 
  ${$$props.class ?? ""}`;
</script>

<a {href} {target}>
  <img {alt} class={classes} {src} />
</a>
