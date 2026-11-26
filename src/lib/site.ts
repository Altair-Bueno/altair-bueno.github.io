export const GITHUB_USER = "Altair-Bueno";

export const site = {
  name: "Altair Bueno",
  description: "Altair Bueno — embedded Linux engineer from Málaga. Firmware, Rust and C, secure by design.",
  url: "https://altair-bueno.github.io/",
  avatar: `https://avatars.githubusercontent.com/u/67512202?v=4`,
  source: `https://github.com/${GITHUB_USER}/altair-bueno.github.io`,
  profileRepo: `${GITHUB_USER}/${GITHUB_USER}`,
} as const;

export const acknowledgments = [
  {
    icon: "Mail",
    author: { name: "Those Icons", link: "https://www.flaticon.com/authors/those-icons" },
  },
  {
    icon: "Resume",
    author: { name: "nawicon", link: "https://www.flaticon.com/authors/nawicon" },
  },
] as const;
