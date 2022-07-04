<script lang="ts">
  type Kind = 'normal'
  export let href: string | URL | undefined = undefined
  export let target: string | undefined = undefined
  export let kind: Kind = "normal"

  const baseClasses = 'underline'
  let classes
  $: {
      if (kind === 'normal') {
          classes = "text-blue-800 hover:text-purple-700 visited:text-purple-900" + " " +
              "dark:text-emerald-400 dark:hover:text-emerald-500 dark:visited:text-emerald-700"
      } else if (kind === 'dimmed'){
          classes = ""
      }
      classes = `${baseClasses} ${classes} ${$$props.class}`
  }

</script>
<a class="{classes}" {href} {target}>
  <slot/>
</a>