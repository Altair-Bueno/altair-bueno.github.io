<script lang="ts">
  import type { Resume, WebsiteSource } from "../types";
  import _icons from "../assets/data/icons.json";
  const icons = _icons as Record<string, string>;
  import Squircle from "./Squircle.svelte";
  import InfoCardIcon from "./InfoCardIcon.svelte";

  export let resume: Resume;
  export let websiteSource: WebsiteSource;

  $: title = resume?.title;
  $: links = Object.entries(resume?.links ? resume?.links : {});
  $: entries = (links ? links : []) as [string, string][];
  $: description = resume?.content?.description;
  $: keypoints = resume?.content?.keypoints;
</script>

<Squircle>
  <article>
    <h1 class="text-4xl font-extrabold mb-3">{title}</h1>
    <!--    Description-->
    <p>{description}</p>
    {#if keypoints}
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
            <InfoCardIcon
              target="_blank"
              href={link}
              src={icons[name]}
              alt={name}
              class="dark:invert"
            />
          </li>
        {/each}
        {#if websiteSource}
          <li class="ml-auto">
            <InfoCardIcon
              target="_blank"
              href={websiteSource.link}
              src={websiteSource.icon}
              alt="Source code"
            />
          </li>
        {/if}
      </ul>
    </div>
  </article>
</Squircle>
