import type { SidebarConfig } from "vuepress-theme-gungnir"

export const zh: SidebarConfig = {
  "/zh/docs/": [
    {
      text: "基礎",
      children: [
        "/zh/docs/basic/intro.md",
        "/zh/docs/basic/installation.md",
        "/zh/docs/basic/config.md",
        "/zh/docs/basic/search.md",
        "/zh/docs/basic/content.md"
      ]
    },
    {
      text: "進階",
      children: [
        "/zh/docs/advanced/comment.md",
        "/zh/docs/advanced/analytics.md",
        "/zh/docs/advanced/reading-time.md",
        "/zh/docs/advanced/rss.md",
        "/zh/docs/advanced/hitokoto.md",
        "/zh/docs/advanced/icons.md"
      ]
    },
    {
      text: "Markdown 拓展語法",
      children: [
        "/zh/docs/md-enhance/math.md",
        "/zh/docs/md-enhance/chart.md",
        "/zh/docs/md-enhance/mermaid.md",
        "/zh/docs/md-enhance/others.md"
      ]
    },
    {
      text: "插件",
      children: [
        "/zh/docs/plugins/intro.md",
        "/zh/docs/plugins/giscus.md",
        "/zh/docs/plugins/chart.md",
        "/zh/docs/plugins/mermaid.md",
        "/zh/docs/plugins/katex.md",
        "/zh/docs/plugins/reading-time.md",
        "/zh/docs/plugins/baidu-tongji.md",
        "/zh/docs/plugins/md-plus.md",
        "/zh/docs/plugins/rss.md"
      ]
    }
  ],
  "/posts/web/js/": [
    {
      text: "基礎",
      children: [
        "/posts/web/js/basic/intro.md",
        "/posts/web/js/basic/about.md",
      ]
    }
  ],
  "/posts/web/html/": [
    {
      text: "基礎",
      children: [
        "/posts/web/html/basic/intro.md",
      ]
    },
    {
      text: "標籤",
      children: [
        "/posts/web/html/tag/tag_text.md",
      ]
    }
  ],
  "/posts/web/css/": [
    {
      text: "基礎",
      children: [
        "/posts/web/css/basic/intro.md",
        "/posts/web/css/basic/about.md",
      ]
    }
  ],
}
