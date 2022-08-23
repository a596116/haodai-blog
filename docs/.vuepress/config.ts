import { viteBundler } from "@vuepress/bundler-vite"
import { webpackBundler } from "@vuepress/bundler-webpack"
import { docsearchPlugin } from "@vuepress/plugin-docsearch"
import { defineUserConfig } from "vuepress"
import { gungnirTheme, i18n } from "vuepress-theme-gungnir"
import { navbar, sidebar } from "./configs"

const isProd = process.env.NODE_ENV === "production"

export default defineUserConfig({
  base: "/",

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo.png`
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `/img/logo.png`
      }
    ],
    // ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    // ["meta", { name: "application-name", content: "Gungnir Theme" }],
    // ["meta", { name: "apple-mobile-web-app-title", content: "Gungnir Theme" }],
    // [
    //     "meta",
    //     { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    // ],
    // [
    //     "link",
    //     { rel: "apple-touch-icon", href: `/img/logo/apple-touch-icon.png` }
    // ],
    ["meta", { name: "theme-color", content: "#377bb5" }],
    ["meta", { name: "msapplication-TileColor", content: "#377bb5" }]
  ],

  // site-level locales config
  locales: {
    "/": {
      lang: "zh-TW",
      title: "浩呆博客",
      description: "積極向上的前端新手",
    },
    // "/en/": {
    //     lang: "en-US",
    //     title: "HaoDai Blog",
    //     description: "HaoDai Blog"
    // }
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === "webpack" ? webpackBundler() : viteBundler(),

  // configure default theme
  theme: gungnirTheme({
    repo: "HaoDai",
    docsDir: "docs",
    editLink: false,
    blogNumPerPage: 10,
    colorMode: "dark",
    hitokoto: 'false',
    locales: {
      "/": {
        navbar: navbar.zh,
        sidebar: sidebar.en,
        ...i18n.zh,
        navbarTitle: "HaoDai",
      },
      // "/en/": {
      //     navbar: navbar.en,
      //     sidebar: sidebar.en,
      //     navbarTitle: "HaoDai",
      // }
    },

    personalInfo: {
      name: "HaoDai",
      avatar: "/img/logo.png",
      description: "Haodai's blog",
      sns: {
        github: "a596116",
        email: "a596116@gmail.com",
        instagram: {
          icon: "bi-instagram",
          link: "https://www.instagram.com/ima_0621/"
        }
      }
    },

    homeHeaderImages: [
      {
        path: "/img/home-bg/1.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
      {
        path: "/img/home-bg/2.jpg",
        mask: "rgb(251, 170, 152, .2)"
      },
      {
        path: "/img/home-bg/3.jpg",
        mask: "rgba(68, 74, 83, .1)"
      },
      {
        path: "/img/home-bg/4.jpg",
        mask: "rgba(19, 75, 50, .2)"
      }
    ],

    // other pages
    pages: {
      tags: {
        title: "標籤",
        subtitle: "所有標籤頁",
        bgImage: {
          path: "/img/pages/tags.jpg",
          mask: "rgba(211, 136, 37, .1)"
        }
      },
      links: {
        subtitle:
          "收藏網頁",
        bgImage: {
          path: "/img/pages/links.jpg",
          mask: "rgba(64, 118, 190, 0.2)"
        }
      }
    },

    themePlugins: {
      // github 評論
      giscus: {
        repo: "a596116/blog",  // 必须，string，格式：user_name/repo_name
        repoId: "R_kgDOH3APbA",  // 必须，string，在 Giscus 官网上生成
        category: "General",  // 必须，string
        categoryId: "DIC_kwDOH3APbM4CQ9zQ",  // 必须，string，在 Giscus 官网上生成
      },
      katex: true,
      mermaid: true,
      chartjs: true,
      ga: "G-G3NHHHG8SQ",
      pwa: true,
      search: false
    },
    footer: `
                &copy; <a href="https://github.com/a596116" target="_blank">HaoDai</a> 2022
                `
  }),

  markdown: {
    headers: {
      level: [2, 3, 4, 5]
    }
  },

  plugins: [
    docsearchPlugin({
      appId: "9HDDA12RPH",
      apiKey: "e06283817c6bae01e6f397a0fa644567",
      indexName: "blog",
      locales: {
        "/": {
          placeholder: "搜尋",
          translations: {
            button: {
              buttonText: "搜尋",
              buttonAriaLabel: "搜尋"
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查詢條件",
                resetButtonAriaLabel: "清除查詢條件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消"
              },
              startScreen: {
                recentSearchesTitle: "搜索歷史",
                noRecentSearchesText: "搜索歷史",
                saveRecentSearchButtonTitle: "保存至搜索歷史",
                removeRecentSearchButtonTitle: "從搜索歷史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "從收藏中移除"
              },
              errorScreen: {
                titleText: "無法獲取结果",
                helpText: "你可能需要檢查你網路連接",
              },
              footer: {
                selectText: "選擇",
                navigateText: "切換",
                closeText: "關閉",
                searchByText: "搜索提供者"
              },
              noResultsScreen: {
                noResultsText: "無法找到相關结果",
                suggestedQueryText: "你可以嘗試查詢",
                reportMissingResultsText: "你認為該查詢應該有结果？",
                reportMissingResultsLinkText: "點擊反饋"
              }
            }
          }
        }
      }
    })
  ]
})
