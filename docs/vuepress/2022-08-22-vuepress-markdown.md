---
layout: Post
title: Markdown 語法示例
subtitle: Vuepress Markdown
author: HaoDai
date: 2022-08-22
useHeaderImage: false
headerImage: /img/in-post/vuepress.jpeg
headerMask: rgba(40, 57, 101, .2)
giscus: false
tags: 
  - vuepress
  - learn
---

# 快速上手markdown
<!-- more -->

## Heading (h2)

### h3

#### h4

##### h5

###### h6

::: details 代碼
``` markdown
## Heading (h2)
### h3
#### h4
##### h5
###### h6
```
:::

---

## 鏈結

### 内部鏈結

網站內部的鏈接，將會被轉換成 `<router-link>` 用於 SPA 導航。同時，站內的每一個文件夾下的 `README.md` 或者 `index.md` 文件都會被自動編譯為 `index.html`，對應的鏈接將被視為 `/`。

以如下的文件結構為例：

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

假設你現在在 `foo/one.md` 中：

``` md
[Home](/) <!-- 跳轉到根部的 README.md -->
[foo](/foo/) <!-- 跳轉到 foo 文件夾的 index.html -->
[foo heading](./#heading) <!-- 跳轉到 foo/index.html 的特定標題位置 -->
[bar - three](../bar/three.md) <!-- 具體文件可以使用 .md 結尾（推薦） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
```

### 鏈結的重定向

VuePress 支持重定向到乾淨鏈接。如果一個鏈接 `/foo` 找不到，VuePress 會自行尋找一個可用的 `/foo/` 或 `/foo.html`。反過來，當 `/foo/` 或 `/foo.html` 中的一個找不到時，VuePress 也會嘗試尋找另一個。

::: tip 注意
無論是否使用了 permalink 和 clean-urls 插件，你的相對路徑都應該依賴於當前的文件結構來定義。在上面的例子中，即使你將 `/foo/one.md` 的路徑設為了 `/foo/one/`，你依然應該通過 `./two.md` 來訪問 `/foo/two.md`。
:::

### 外部鏈結

外部的鏈接將會被自動地設置為  `target="_blank" rel="noopener noreferrer"`:

- [vuejs.org](https://vuejs.org)
- [VuePress on GitHub](https://github.com/vuejs/vuepress)

你可以自定義通過配置 [config.markdown.externalLinks](https://vuepress.vuejs.org/zh/config/#markdown-externallinks) 來自定義外部鏈接的特性。

---

## 行內程式碼

`const a = 1`

::: details 代碼
``` markdown
`const a = 1`
```
:::

---

## 徽章 <Badge text="tip" /> <Badge text="warning" type="warning" /> <Badge text="danger" type="danger" /> <Badge text="tip middle" vertical="middle" />


::: details 代碼
``` markdown
<Badge text="tip" /> 
<Badge text="warning" type="warning" /> 
<Badge text="danger" type="danger" /> 
<Badge text="tip middle" vertical="middle" />
```
:::

---

## 任務列表

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn

::: details 代碼
``` markdown
- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
```
:::

---

## 圖片 (點擊 放大/縮小)

![](https://vuepress.vuejs.org/architecture.png)

::: details 代碼
``` markdown
![space](https://vuepress.vuejs.org/architecture.png)
```
:::

### 行內圖片

Not Bad.![](https://res.smzdm.com/images/emotions/138.png)

---

## 分隔線

Below is a `<hr>`, I guess.

---

Above is a `<hr>`, I guess.

::: details 代碼
``` markdown
Below is a `<hr>`, I guess.
---
Above is a `<hr>`, I guess.
```
:::

---

## 列表

### 無序列表

+ list item

+ list item

  - list item
  - list item

    + list item

    + list item

::: details 代碼
``` markdown
+ list item

+ list item

  - list item
  - list item

    + list item

    + list item
```
:::

### 有序列表

1. list item

2. list item

3. list item

::: details 代碼
``` markdown
1. list item
2. list item
3. list item
```
:::

---

## 表格

### GitHub 風格的表格

``` md
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

::: details 代碼
``` markdown
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```
:::

### 長表格

| Sun With Face | Grinning Face | Smiling Face  | Grinning Face With Big Eyes | Smiling Face With Smiling Eyes | Full Moon Face  | Grinning Face With Smiling Eyes | Face With Monocle  | Cowboy Hat Face | Thinking Face  | Face Vomiting |
| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:|:-------------:| -----:|
| 🌞     | 😀 | ☺️ | 😃      | 😊 | 🌝 | 😄 | 🧐 | 🤠 | 🤔 | 🤮 |
| 🌞     | 😀 | ☺️ | 😃      | 😊 | 🌝 | 😄 | 🧐 | 🤠 | 🤔 | 🤮 |
| 🌞     | 😀 | ☺️ | 😃      | 😊 | 🌝 | 😄 | 🧐 | 🤠 | 🤔 | 🤮 |

---

## 塊狀引文

> 要麼是酒，要麼是女人，要麼是神，家族，王，夢想，子女，力量，人如果不沈醉於某些東西估計都撐不下去吧，所有人都是某些東西的奴隸，就連那傢伙... 
  
  *-- 凱尼?阿克曼 《進擊的巨人》*

::: details 代碼
``` markdown
> 要麼是酒，要麼是女人，要麼是神，家族，王，夢想，子女，力量，人如果不沈醉於某些東西估計都撐不下去吧，所有人都是某些東西的奴隸，就連那傢伙... 
```
:::

---

## 程式碼

### 代碼塊

``` js
// 第 3 版規範的最終設計
try {
  doSomething();
} catch (e) {
  if (e == "thing")
    console.log("a thing")
  else if (e == 42)
    console.log("42")
  else {
    console.log(e);
    throw e; // 重新 throw
  }
} finally {
  cleanup();
}
```

::: details 代碼
```` markdown
``` js
// 第 3 版規範的最終設計
try {
  doSomething();
} catch (e) {
  if (e == "thing")
    console.log("a thing")
  else if (e == 42)
    console.log("42")
  else {
    console.log(e);
    throw e; // 重新 throw
  }
} finally {
  cleanup();
}
```
````
:::

---

### 代碼群組

<CodeGroup>
<CodeGroupItem title="YARN" active>

```bash
yarn add -D vuepress-theme-gungnir@next
```

</CodeGroupItem>

<CodeGroupItem title="NPM">

```bash
npm install -D vuepress-theme-gungnir@next
```

</CodeGroupItem>
</CodeGroup>

::: details 代碼
```` markdown
<CodeGroup>
<CodeGroupItem title="YARN" active>

```bash
yarn add -D vuepress-theme-gungnir@next
```

</CodeGroupItem>

<CodeGroupItem title="NPM">

```bash
npm install -D vuepress-theme-gungnir@next
```

</CodeGroupItem>
</CodeGroup>
````
:::

---

### 代碼塊中的行高亮

``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

::: details 代碼
```` markdown
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````
:::

除了單行以外，你也可指定多行，行數區間，或是兩者都指定。

- 行數區間: 例如 `{5-8}`, `{3-10}`, `{10-17}`
- 多個單行: 例如 `{4,7,9}`
- 行數區間與多個單行: 例如 `{4,7-13,16,23-27,40}`

``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

::: details 代碼
```` markdown
``` js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
````
:::

---

### 行號

你可以通過配置來為每個代碼塊顯示行號：

``` js
// .vuepress/config.js -> markdown

module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

## 圖表

### Chart.js

```chart
{
  "type": "bar",
  "data": {
    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    "datasets": [{
      "label": "# of Votes",
      "data": [12, 19, 3, 5, 2, 3],
      "backgroundColor": [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      "borderColor": [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      "borderWidth": 1
    }]
  },
  "options": {
    "scales": {
      "y": {
        "ticks": {
          "beginAtZero": true,
          "callback": "function(value){ return value + 'k'; }"
        }
      }
    }
  }
}
```

::: details 代碼
```` markdown
```chart
{
  "type": "bar",
  "data": {
    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    "datasets": [{
      "label": "# of Votes",
      "data": [12, 19, 3, 5, 2, 3],
      "backgroundColor": [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      "borderColor": [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      "borderWidth": 1
    }]
  },
  "options": {
    "scales": {
      "y": {
        "ticks": {
          "beginAtZero": true,
          "callback": "function(value){ return value + 'k'; }"
        }
      }
    }
  }
}
```
````
:::

### Mermaid

```mermaidjs
sequenceDiagram
  Alice->John: Hello John, how are you?
  loop Every minute
    John-->Alice: Great!
  end
```

::: details 代碼
```` markdown
```mermaidjs
sequenceDiagram
  Alice->John: Hello John, how are you?
  loop Every minute
    John-->Alice: Great!
  end
```
````
:::

---

## Maths

Inline math: $E = mc^2$

Display math:

$$
i\hbar\frac{\partial \psi}{\partial t} = \frac{-\hbar^2}{2m} ( \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} ) \psi + V \psi.
$$

With tags:

$$
\begin{gather}
  A = \text{softmax}(\frac{QK^T}{\sqrt{d_k}}) \\
  F_{\text{out}} = A V
\end{gather}
$$

::: details 代碼
``` markdown
Inline math: $E = mc^2$

Display math:

$$
i\hbar\frac{\partial \psi}{\partial t} = \frac{-\hbar^2}{2m} ( \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} ) \psi + V \psi.
$$

With tags:

$$
\begin{gather}
  A = \text{softmax}(\frac{QK^T}{\sqrt{d_k}}) \\
  F_{\text{out}} = A V
\end{gather}
$$
```
:::

---

## Emoji

:tada: :100:

::: details 代碼
``` markdown
:tada: :100:
```
:::

你可以在[這個列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)找到所有可用的 Emoji。

---

## 自定義容器 <Badge text="默認主題"/>

**輸入**

```md
::: tip
這是一個提示
:::

::: warning
這是一個警告
:::

::: danger
這是一個危險警告
:::

::: details
這是一個詳情塊，在 IE / Edge 中不生效
:::
```

**輸出**

::: tip
這是一個提示
:::

::: warning
這是一個警告
:::

::: danger
這是一個危險警告
:::

::: details
這是一個詳情塊，在 IE / Edge 中不生效
:::

你也可以自定義塊中的標題：

````md
::: danger STOP
危險區域，禁止通行
:::

::: details 點擊查看代碼
```js
console.log('你好，VuePress！')
```
:::
````

::: danger STOP
危險區域，禁止通行
:::

::: details 點擊查看代碼
```js
console.log('你好，VuePress！')
```
:::

**參考:**

- [vuepress-plugin-container](https://vuepress.github.io/plugins/container/)



## 導入代碼段 <Badge text="beta" type="warning"/>

你可以通過下述的語法導入已經存在的文件中的代碼段：

``` md
<<< @/filepath
```

它也支持 [行高亮](#代碼塊中的行高亮)：

``` md
<<< @/filepath{highlightLines}
```

**輸入**

```
<<< @/blog/.vuepress/__tests__/snippet.js{2}
```

**输出**

<!--lint disable strong-marker-->

<<< @/blog/.vuepress/__tests__/snippet.js{2}

<!--lint enable strong-marker-->

::: tip 注意
由於代碼段的導入將在 webpack 編譯之前執行，因此你無法使用 webpack 中的路徑別名，此處的 `@` 默認值是 `process.cwd()`。
:::


為了只導入對應部分的代碼，你也可運用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding)。你可以在文件路徑後方的 `#` 緊接著提供一個自定義的區域名稱（預設為 `snippet` ）

**輸入**

``` md
<<< @/blog/.vuepress/__tests__/snippet-with-region.js#snippet{1}
```

**代碼文件**

<!--lint disable strong-marker-->

<<< @/blog/.vuepress/__tests__/snippet-with-region.js

<!--lint enable strong-marker-->

**輸出**

<!--lint disable strong-marker-->

<<< @/blog/.vuepress/__tests__/snippet-with-region.js#snippet{1}

<!--lint enable strong-marker-->

---

## 進階配置

VuePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 來渲染 Markdown，上述大多數的拓展也都是通過自定義的插件實現的。想要進一步的話，你可以通過 `.vuepress/config.js` 的 `markdown` 選項，來對當前的 `markdown-it` 實例做一些自定義的配置：

``` js
module.exports = {
  markdown: {
    // markdown-it-anchor 的選項
    anchor: { permalink: false },
    // markdown-it-toc 的選項
    toc: { includeLevel: [1, 2] },
    extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
