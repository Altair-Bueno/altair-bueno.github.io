<script lang="ts">
    import InfoCard from "./lib/InfoCard.svelte";
    import Footer from "./lib/Footer.svelte";
    import Spinner from "./lib/Spinner.svelte";
    import Error from "./lib/Error.svelte";
    import Events from "./lib/Events.svelte";

    import config from "./assets/data/config.json"
    import acknowledgments from "./assets/data/acknowledgments.json"

    const {websiteSource, resume, events} = config
    const resumePromise = fetch(resume.link, resume.request).then(x => x.json())
    const eventsPromise = fetch(events.link, events.request).then(x => x.json())
    const all = Promise.all([resumePromise, eventsPromise]);

</script>
<div class="flex flex-col w-full h-screen">
  <div class="grid place-content-center mt-24">
    <main>
      {#await all}
        <Spinner/>
      {:then [resume, events]}
        <InfoCard {resume} {websiteSource}/>
        <Events {events}/>
      {:catch error}
        <Error/>
      {/await}
    </main>
  </div>
  <footer class="mt-auto w-full">
    <Footer {acknowledgments}/>
  </footer>
</div>