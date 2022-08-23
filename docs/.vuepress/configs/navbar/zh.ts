import type { NavbarConfig } from "vuepress-theme-gungnir"
import { version } from "../meta"

export const zh: NavbarConfig = [
  {
    text: "首页",
    link: "/",
    icon: "hi-solid-home"
  },
  {
    text: "標籤",
    link: "/tags/",
    icon: "fa-tag"
  },
  {
    text: "鏈結",
    link: "/links/",
    icon: "fa-satellite-dish"
  },
  // {
  //   text: "文檔",
  //   link: "/docs/basic/intro.md",
  //   icon: "ri-book-2-fill"
  // },
  {
    text: '前端學習',
    icon: "ri-book-2-fill",
    children: [
      {
        text: "HTML",
        link: "/web/html/basic/intro.md",
        icon: "co-html5"
      },
      {
        text: "JavaScript",
        link: "/web/js/basic/intro.md",
        icon: "fa-js-square"
      },
      {
        text: "CSS",
        link: "/web/css/basic/intro.md",
        icon: "io-logo-css3"
      },
    ]
  },
  // {
  //   text: `v1.0.0`,
  //   icon: "co-git",
  //   children: [
  //     {
  //       text: "GitHub",
  //       link: "https://github.com/a596116/blog",
  //       icon: "ri-github-line"
  //     },
  //     {
  //       text: "更新日志",
  //       link: "https://github.com/a596116/blog/pulls",
  //       icon: "oi-git-compare"
  //     },
  //   ]
  // }
]
