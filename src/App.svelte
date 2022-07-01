<script lang="ts">
    import InfoCard from "./lib/InfoCard.svelte";
    import Footer from "./lib/Footer.svelte";
    import Spinner from "./lib/Spinner.svelte";
    import Error from "./lib/Error.svelte";
    import Events from "./lib/SideBar.svelte";

    import config from "./assets/data/config.json"

    const {websiteSource, resume, events, acknowledgments} = config
    const resumePromise = fetch(resume.link, resume.request).then(x => x.json())
    const eventsPromise = fetch(events.link, events.request).then(x => x.json())
    const all = Promise.all([resumePromise, eventsPromise]);

</script>
<div class="flex flex-col w-screen h-screen items-center">
  <div class="flex flex-col md:flex-row gap-4 m-4 mt-24">
    {#await all}
      <Spinner/>
    {:then [resume, events]}
      <main>
        <InfoCard {resume} {websiteSource}/>
      </main>
      <aside>
        <Events {events}/>
      </aside>
    {:catch error}
      <Error/>
    {/await}
  </div>
  <footer class="mt-auto w-full">
    <Footer {acknowledgments}/>
  </footer>
</div>