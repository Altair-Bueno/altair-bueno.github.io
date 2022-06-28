<script lang="ts">
    import InfoCard from "./lib/InfoCard.svelte";
    import Footer from "./lib/Footer.svelte";

    import spinner from './assets/spinner.svg'
    import config from "./assets/data/config.json"
    import acknowledgments from "./assets/data/acknowledgments.json"

    const {websiteSource,resume} = config

    const resumePromise = fetch(resume.link,resume.request).then(x => x.json())

</script>
<main class="flex flex-col w-full h-screen">
  <div class="grid place-content-center mt-24">
    {#await resumePromise}
      <img src="{spinner}" alt="" class="invert w-24"/>
    {:then resume}
      <InfoCard {resume} {websiteSource}/>
    {:catch error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
           role="alert">
        <strong class="font-bold">Heads up!</strong>
        <span class="block sm:inline">Something went wrong while loading the content</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    {/await}
  </div>
  <footer class="mt-auto w-full">
    <Footer {acknowledgments}/>
  </footer>
</main>