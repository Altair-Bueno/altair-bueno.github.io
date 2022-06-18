<script lang="ts">
    import InfoCard from "./lib/InfoCard.svelte";
    import Footer from "./lib/Footer.svelte";

    import resume from "./assets/data/resume.json"
    import source from "./assets/data/source.json"
    import acknowledgments from "./assets/data/acknowledgments.json"
</script>
<main class="flex flex-col w-full h-screen">
  <article class="grid place-content-center mt-24">
    <InfoCard {resume} {source}/>
  </article>
  <footer class="mt-auto w-full">
    <Footer {acknowledgments}/>
  </footer>
</main>