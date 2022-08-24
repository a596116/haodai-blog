---
title: 文本標籤
date: 2022-08-23
giscus: false
---

## 基本標籤
### p

`p`標籤標記了一個段落內容。

``` html
<p>一個段落內容</p>
```

:::tip
瀏覽器會自動地在段落的前後添加空行。 （`<p>` 是塊級元素）
:::
::: warning
使用空的段落標記`<p></p>`去插入一個空行是個壞習慣。 用`<br />`標籤代替它！（但是不要用`<br />`標籤去創建清單。 不要著急，您將在稍後的篇幅學習到 HTML 清單。 ）
:::

### pre

原樣顯示文字內容包括空白、換行等。

<pre>
        这是pre标签的显示效果
            这是换行后的内容，空白和换行都会保留
</pre>

```html
<pre>
        这是pre标签的显示效果
            这是换行后的内容，空白和换行都会保留
</pre>
```

### br

在`html`中回車是忽略的，使用`<br>`標籤可以實現換行效果。

第一行<br/>第二行

```html
第一行<br/>第二行
```

:::tip
在 XHTML、XML 以及未來的 HTML 版本中，不允許使用沒有結束標籤（閉合標籤）的 HTML 元素。
即使 `<br>` 在所有瀏覽器中的顯示都沒有問題，使用 `<br />` 也是更長遠的保障。
:::

### span
`<span>`標籤與`<div>`標籤都是沒有語義的， 常用於對某些文本特殊控制，但該文本又沒有適合的語義標籤。

<span>沒有語意的標籤</span>

```html
<span>沒有語意的標籤</span>
```

## 描述文本

### time

標籤定義日期或時間，或者兩者。

<time> 2022-08-23 </time>

```html
<time> 2022-08-23 </time>
```

### abbr

`<abbr>`標籤用於描述一個縮寫內容

<abbr title="Uniform Resource Locator">URL</abbr>

```html
<abbr title="Uniform Resource Locator">URL</abbr>
```

### sub

用於數位的下標內容

水的化學式為H<sub>2</sub>O

```html
水的化學式為H<sub>2</sub>O
```

### sup

用於數位的上標內容

請計算5<sup>2</sup>平方

```html
請計算5<sup>2</sup>平方
```

### del

`<del>`標籤表示刪除的內容， 一般與`<ins>`標籤配合使用描述更新與修正。

原價 <del>200元</del> 現價 <ins>100元</ins>

```html
原價 <del>200元</del> 現價 <ins>100元</ins>
```

### progress

用於表示完成任務的進度，當瀏覽器不支援時顯示內容。

<progress value="60" max="100">完成60%</progress>

```html
<progress value="60" max="100">完成60%</progress>
```

## 強調文本

### mark

用於突出顯示文本內容，類似我們生活中使用的馬克筆。

我是<mark>浩呆</mark>

```html
我是<mark>浩呆</mark>
```

### srtong

`<strong>`標籤和`<em>`一樣，用於強調文本，但是它們的強調程度不同。

<strong>浩呆</strong>努力學習<em>前端</em>

```html
<strong>浩呆</strong>努力學習<em>前端</em>
```

## 引用標籤

### cite

通常表示它所包含的文本對某個參考文獻的引用，或文章作者的名子。

我是<cite>浩呆</cite> 前端小白

```html
我是 <cite>浩呆</cite> 前端小白
```

### blockquote 

用來定義摘自另一個源的塊引用

下面是我的github
<blockquote cite="https://github.com/a596116">
	haodai
</blockquote>

### q

用於表示列內引用文本，在大部分瀏覽器中會加上引號。

我是<q>浩呆</q> 前端小白

```html
我是<q>浩呆</q> 前端小白
```

### address

用於設置聯繫地址等資訊，一般將`<address>`放在`<footer>`標籤中。

<address>感謝您提交建議到 a596116@gmail.com</address>

```html
<address>感謝您提交建議到 a596116@gmail.com</address>
```