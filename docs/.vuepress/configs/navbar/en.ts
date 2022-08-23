import type { NavbarConfig } from "vuepress-theme-gungnir"
import { version } from "../meta"

export const en: NavbarConfig = [
  {
    text: "Home",
    link: "/",
    icon: "fa-fort-awesome"
  },
  {
    text: "Tags",
    link: "/tags/",
    icon: "fa-tag"
  },
  {
    text: "Links",
    link: "/links/",
    icon: "fa-satellite-dish"
  },
  {
    text: "Docs",
    link: "/en/docs/basic/intro.md",
    icon: "ri-book-2-fill"
  },
  // {
  //   text: "VuePress",
  //   link: "https://v2.vuepress.vuejs.org/",
  //   icon: "ri-vuejs-line"
  // },
  {
    text: `v1.0.0`,
    icon: "co-git",
    children: [
      {
        text: "GitHub",
        link: "https://github.com/a596116/blog",
        icon: "ri-github-line"
      },
      {
        text: "Changelog",
        link: "https://github.com/a596116/blog/pulls",
        icon: "oi-git-compare"
      },
    ]
  }
]
