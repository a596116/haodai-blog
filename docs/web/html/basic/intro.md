---
title: 基本介紹
date: 2022-08-22
giscus: false
---

## HTML簡介

**HTML是一種網頁使用的語言，是一種描述超文件的註記語言SGML(Standard Generalized Markup Language)所制訂出的一種網頁語言，基本上現行的瀏覽器都可以讀取HTML，使用HTML可以編輯設計出網頁，也可以在網頁中加入所有HTML語言可支援的方式，例如表格、表單、圖片、文字、連結、程式等等。**

## HTML與XML的區別

而XML是由W3C所發展出的一種網頁語言規格，是SGML的精簡版本，特別用來設計網頁文件，XML可以讓使用者自己定義所需要的標籤，並且任意啟動定義、轉換、驗證等工作，同時可以在網頁和應用程式間讀取資料和傳遞資料。

所以HTML與XML的差別在於HTML無法自訂標籤，但是基本上全世界的瀏覽器都可以看到他寫出來的網頁，而XML則是一種可以自由轉換資訊以及定義標籤的方式，可以讓其他網頁自己去轉換分享者的標籤，並轉為自己的標籤，進而直接讀取跟引用。


## HTML架構圖

<CodeGroup>
<CodeGroupItem title="HTML5基本架構圖" active>

![HTML5基本架構圖](http://jinjin.mepopedia.com/~jinjin/webdesign-notes/img/html-01.png)

</CodeGroupItem>

<CodeGroupItem title="HTML5進階架構圖">

![HTML5進階架構圖](http://jinjin.mepopedia.com/~jinjin/webdesign-notes/img/html-03.png)

</CodeGroupItem>
</CodeGroup>

## 認識HTML標籤

<table>
  <tbody>
    <tr>
      <th>種類</th>
      <th align="center">說明</th>
    </tr>
    <tr>
      <td>標籤 tag</td>
      <td>用 &lt; >括住特定名稱的文字範圍，標籤有兩種類型，分別為「獨立標籤」與「成對標籤」。</td>
    </tr>
    <tr>
      <td>獨立標籤</td>
      <td>例如 &lt; hr > 隔線，&lt; br > 分行， &lt; img … > 圖片, 獨立標籤通常是網頁上一個特定的元素，不作用到其他内容範圍。</td>
    </tr>
    <tr>
      <td>成對標籤</td>
      <td>
      <ul>
          <li>例如 &lt; p > &lt; /p >、 &lt; a … > &lt; /a > 大多數的標籤是以成對標籤的方式存在</li>
          <li>前面&lt; p >、&lt; a >、&lt; em >為開始標籤,後面對應的&lt; /p >、&lt; /a >、&lt; /em >為結束標籤</li>
          <li>開始標籤加上斜線/即為結束標籤, 開始標籤與結束標籤之間的内容，就是標籤標註作用的範圍</li>
          <li>p, a, em 代表標籤名稱, 不同名稱有不同用途。</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>成對標籤的原則</td>
      <td>
        <ul>
          <li>順序原則 - 先有開始標籤，才會有結束標籤</li>
          <li>對應原則 - 有開始標籤就要有結束標籤，成對出現，數目相同</li>
          <li>巢狀原則 - 如果標籤範圍裡面有其他的標籤，被包住的標籤在範圍裡面必須符合順序原則和對應原則</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>常用的標籤</td>
      <td>
        <ul>
          <li>段落：p</li>
          <li>標題：h1、h2、h3、h4、h5、h6</li>
          <li>強調：strong、b、i</li>
          <li>表格：table、tr、td</li>
          <li>影像：img &lt; img src="..."></li>
          <li>超連結：a 連結目標：_blank,_top...</li>
          <li>檔案內連結、電子郵件連結</li>
          <li>特殊文字：© ©　空格  　強制分行 &lt; br / ></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>