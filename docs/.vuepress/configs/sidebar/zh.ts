import type { SidebarConfig } from "vuepress-theme-gungnir"

export const zh: SidebarConfig = {
  "/docs/": [
    {
      text: "基礎",
      children: [
        "/docs/basic/intro.md",
        "/docs/basic/installation.md",
        "/docs/basic/config.md",
        "/docs/basic/search.md",
        "/docs/basic/content.md"
      ]
    },
    {
      text: "進階",
      children: [
        "/docs/advanced/comment.md",
        "/docs/advanced/analytics.md",
        "/docs/advanced/reading-time.md",
        "/docs/advanced/rss.md",
        "/docs/advanced/hitokoto.md",
        "/docs/advanced/icons.md"
      ]
    },
    {
      text: "Markdown 拓展語法",
      children: [
        "/docs/md-enhance/math.md",
        "/docs/md-enhance/chart.md",
        "/docs/md-enhance/mermaid.md",
        "/docs/md-enhance/others.md"
      ]
    },
    {
      text: "插件",
      children: [
        "/docs/plugins/intro.md",
        "/docs/plugins/giscus.md",
        "/docs/plugins/chart.md",
        "/docs/plugins/mermaid.md",
        "/docs/plugins/katex.md",
        "/docs/plugins/reading-time.md",
        "/docs/plugins/baidu-tongji.md",
        "/docs/plugins/md-plus.md",
        "/docs/plugins/rss.md"
      ]
    }
  ],
  "/web/js/": [
    {
      text: "基礎",
      children: [
        "/web/js/basic/intro.md",
        "/web/js/basic/about.md",
      ]
    }
  ],
  "/web/html/": [
    {
      text: "基礎",
      children: [
        "/web/html/basic/intro.md",
      ]
    },
    {
      text: "標籤",
      children: [
        "/web/html/tag/tag_text.md",
      ]
    }
  ],
  "/web/css/": [
    {
      text: "基礎",
      children: [
        "/web/css/basic/intro.md",
        "/web/css/basic/about.md",
      ]
    }
  ],
}
