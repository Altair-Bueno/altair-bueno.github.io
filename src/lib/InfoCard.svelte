<script lang="ts">
    import type {Resume} from "../types/resume";
    import type {Source} from "../types/source";
    import icons from "../assets/data/icons.json"

    export let resume: Resume
    export let source: Source

    $: title = resume?.title
    $: links = Object.entries(resume?.links ? resume?.links : {})
    $: entries = links ? links : []
    $: description = resume?.content?.description
    $: keypoints = resume?.content?.keypoints
</script>
<div class="bg-zinc-800 text-gray-50 text-xl rounded-2xl p-5 block m-1">
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
            <img src="{icons[name]}" alt="{name}" class="w-7"/>
          </a>
        </li>
      {/each}
      {#if (source)}
        <li class="ml-auto">
          <a href="{source.link}">
            <img class="w-7"
                 src="{source.icon}"
                 alt="Source code">
          </a>
        </li>
      {/if}
    </ul>
  </div>
</div>