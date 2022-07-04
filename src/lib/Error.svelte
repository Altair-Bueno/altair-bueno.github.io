<script lang="ts">
  export let title = 'Heads up!'
  export let message = 'Something went wrong while loading this page'
</script>
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
     role="alert">
  <strong class="font-bold">{title}</strong>
  <span class="block sm:inline">{message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
</div>
