<template>
  <div class="links-wrapper">
    <div class="skill-group">
      <div class="skill-item" v-for="item in skills">
        <div class="content">
          <div class="a">
            <img :src="item.img" />
            <span class="sitename"> {{ item.name }} </span>
            <div class="desc">{{ item.info }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const skills = [
  {
    name: "HTML",
    img: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    info: "熟悉 HTML 各項標籤及功能"
  },
  {
    name: "JavaScript",
    img: "https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png",
    info: "熟悉 JavaScript 基礎及 ES6 標準，AJAX / JSON 串接 RESTful API"
  },
  {
    name: "CSS",
    img: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    info: "熟悉 網頁版面切版、RWD響應式網頁設計、Sass 預處理器"
  },
  {
    name: "Typescript",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
    info: "熟悉 Typescript 基本規範，各類型聲明"
  },
  {
    name: "Vue.js",
    img: "https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png",
    info: "熟悉使用 Vue3 ， 自行開發組件 ，配合TS開發網站"
  },
  {
    name: "Node.js",
    img: "https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png",
    info: "使用 NestJS 開發後端串接 RestfulAPI"
  },
  {
    name: "Python",
    img: "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png",
    info: "會使用 YOLO 做機器學習，用 Django 開發 LineBot各類功能"
  },
  {
    name: "Java",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968282.png",
    info: "熟悉使用 Java 基礎語法"
  },
  {
    name: "Git",
    img: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
    info: "熟悉使用 Git 版控，GitHub Pages 部署靜態網頁"
  },
  {
    name: "Docker",
    img: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    info: "熟悉 Docker 基本語法，了解底層原理，製作 Docker image"
  },
  {
    name: "SQL",
    img: "https://cdn-icons-png.flaticon.com/512/337/337953.png",
    info: "熟悉 Select、Update、Delete、Insert，資料分析及資料切割，關聯式資料庫查詢"
  },
  {
    name: "Linux",
    img: "https://cdn-icons-png.flaticon.com/512/6124/6124995.png",
    info: "熟練使用 Linux 進行開發及部屬網站"
  }
];
</script>

<style lang="scss" scoped>
$MQLarge: 1200px !default;
$MQIpad: 1023px !default;
$MQNarrow: 959px !default;
$MQMobile: 719px !default;
$MQMobileNarrow: 419px !default;
.skill-group {
  width: 100%;
  list-style: none;
  margin-top: 10px;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 33.33%);
  .skill-item {
    margin: 4px;

    .content {
      border: 1px solid var(--c-border);
      border-radius: 10px;
      padding: 13px 30px 13px 20px;
      overflow: hidden;

      .a {
        text-decoration: none;

        img {
          padding: 2px;
          max-width: 100%;
          float: right;
          margin-top: 5px;
          margin-right: -15px;
          width: 65px;
          height: 65px;
        }

        span.sitename {
          color: var(--c-text-accent);
          padding: 8px 0 13px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
        }

        .desc {
          color: var(--c-text-sub);
          font-size: 13px;
          padding: 10px 0;
          border-top: 1px dashed #ddd;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 15px;
        }
      }
    }
  }
}
@media (max-width: $MQLarge) {
  .skill-section {
    width: 75%;
  }
}

@media (max-width: $MQIpad) {
  .skill-section {
    width: 85%;
  }

  .skill-group {
    grid-template-columns: repeat(2, 49.5%);
  }
}

@media (max-width: $MQMobileNarrow) {
  .skill-section {
    width: 100%;

    h2 {
      margin-left: 17px;
    }
  }

  .skill-group {
    grid-template-columns: repeat(1, 100%);
  }

  .skill-item {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
