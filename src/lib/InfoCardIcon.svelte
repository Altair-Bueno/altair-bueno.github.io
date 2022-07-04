<script lang="ts">
    export let target: string
    export let href: string
    export let src: string
    export let alt: string

    $: classes = `w-7 transition ease-in-out delay-150 hover:scale-110 duration-100 ${$$props.class || ''}`

</script>
<a {href} {target}>
  <img {alt} class="{classes}" {src}/>
</a>