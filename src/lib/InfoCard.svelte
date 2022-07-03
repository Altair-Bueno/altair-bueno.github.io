<script lang="ts">
    import type {Resume} from "../types/resume";
    import type {WebsiteSource} from "../types/source";
    import icons from "../assets/data/icons.json"
    import Squircle from "./Squircle.svelte";

    export let resume: Resume
    export let websiteSource: WebsiteSource

    $: title = resume?.title
    $: links = Object.entries(resume?.links ? resume?.links : {})
    $: entries = links ? links : []
    $: description = resume?.content?.description
    $: keypoints = resume?.content?.keypoints
</script>
<Squircle>
  <article>
    <h1 class="text-4xl font-extrabold mb-3">{title}</h1>
    <!--    Description-->
    <p>{description}</p>
    {#if (keypoints)}
      <ul class="list-disc list-inside mt-2">
        {#each keypoints as keypoint (keypoint)}
          <li>{keypoint}</li>
        {/each}
      </ul>
    {/if}
    <!--    LinkedIn, GitHub, Resume...-->
    <div class="mt-4">
      <ul class="flex flex-row gap-5">
        {#each entries as [name, link] (name)}
          <li>
            <a target="_blank" href="{link}">
              <img src="{icons[name]}" alt="{name}" class="w-7 dark:invert"/>
            </a>
          </li>
        {/each}
        {#if (websiteSource)}
          <li class="ml-auto">
            <a href="{websiteSource.link}" target="_blank">
              <img class="w-7"
                   src="{websiteSource.icon}"
                   alt="Source code">
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </article>
</Squircle>
