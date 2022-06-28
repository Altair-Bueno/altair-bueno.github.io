<script lang="ts">
    import type {Resume} from "../types/resume";
    import type {WebsiteSource} from "../types/source";
    import icons from "../assets/data/icons.json"

    export let resume: Resume
    export let websiteSource: WebsiteSource

    $: title = resume?.title
    $: links = Object.entries(resume?.links ? resume?.links : {})
    $: entries = links ? links : []
    $: description = resume?.content?.description
    $: keypoints = resume?.content?.keypoints
</script>
<div class="bg-teal-100 dark:bg-zinc-800 dark:text-gray-50 text-xl rounded-2xl p-5 block m-1">
  <!--    Description-->
  <div class="mb-8">
    <h1 class="text-4xl font-extrabold mb-3">{title}</h1>
    <p class="mb-3">{description}</p>
    {#if (keypoints)}
      <ul class="list-disc pl-10">
        {#each keypoints as keypoint}
          <li>{keypoint}</li>
        {/each}
      </ul>
    {/if}
  </div>
  <!--    LinkedIn, GitHub, Resume...-->
  <div>
    <ul class="flex flex-row gap-5">
      {#each entries as [name, link]}
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
</div>