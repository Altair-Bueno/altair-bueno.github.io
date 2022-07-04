<script>
  const classes = 'shadow shadow-xl rounded-2xl p-5 block m-1' + ' ' +
      'bg-red-200 dark:bg-slate-800 dark:text-gray-50'
</script>
<div class="{classes} {$$props.class || ''}">
  <slot/>
</div>