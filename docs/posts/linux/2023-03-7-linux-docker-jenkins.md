---
layout: Post
title: 安装和配置 Docker Jenkins
subtitle: 安装和配置 Docker Jenkins
author: 浩呆
date: 2023-03-08
useHeaderImage: true
headerImage: https://www.jenkins.io/images/logo-title-opengraph.png
headerMask: rgba(40, 57, 101, .4)
tags: 
  - docker
---
# Jenkins
## *先安裝[Docker](https://haodai-blog.web.app/posts/linux/2022-08-20-linux-docker.html)和[docker-compose](https://haodai-blog.web.app/posts/linux/2023-03-7-linux-docker-compose.html)


# 1. 建構Docker Jenkins

### 1-1. 前置

```bash
# 查看docker 群組，填入1-2 user: jenkins:999
cat /etc/group | grep docker

# 創建Jenkins數據資料夾
sudo mkdir jenkins_home
sudo chown -R $USER:$GROUP jenkins_home
```

### 1-2. 創建 docker-compose.yml

- `user: jenkins:xxx` 改成1-1的docker群組xxx
- `ports: - "xxxx:8080"` 依照個人選擇對應的port
- `- /home/ubuntu/docker/jenkins_home:/var/jenkins_home` 本地存放jenkins資料夾位置

``` docker
version: "3.9"

services:
  jenkins:
    container_name: 'jenkins'
    image: jenkins/jenkins:lts
    restart: always
    # 這裡必須跟docker在同一個組
    user: jenkins:999
    ports:
      - "8080:8080"
      # 據情況，可以不填以下兩個
      - "50000:50000"
      - "10051:10051"
    volumes:
      # 數據持久化
      - /home/ubuntu/docker/jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
      - /etc/hosts:/etc/hosts
```
- 其他配置可以參考[docker-compose](https://haodai-blog.web.app/posts/linux/2023-03-7-linux-docker-compose.html)

### 1-3. Run docker compose


```bash
# up 建構後啟動、-d 後台執行
docker-compose up -d

# down 清除和暫停
docker-compose down
```

---

# 2. 設定Jenkins  瀏覽器打開 localhost:8080

### 2-1. 查看jenkins密碼

```bash
# 查看密碼
docker exec jenkins bash -c "cat /var/jenkins_home/secrets/initialAdminPassword"
```

### 2-2. 選擇安裝推薦外掛

### 2-3. 建立使用者

### 2-4. 管理Jenkins > 管理外掛程式 > Availble plugins
     安裝: Nodejs 、 GitLab 、 GitLab Authentication 、 Email Extension Template

### 2-5. 安裝nodejs

![Untitled](https://s2.loli.net/2023/03/07/Q18uMr3ns4CgqtF.png)

![Untitled](https://s2.loli.net/2023/03/07/S1UnxsPMYu7j5aJ.png)

![Untitled](https://s2.loli.net/2023/03/07/TjUPo1tOMSspk8L.png)

---

# 3. ****整合 Gitlab 和 Jenkins****

### 3-1. 產生Token

 在用戶主目錄里找到.ssh目錄，id_rsa是私鑰，id_rsa.pub是公鑰

```bash
ssh-keygen -t rsa -C "<email>"
```

### 3-2. GitLab 設定SSH Keys

![Untitled](https://s2.loli.net/2023/03/07/zYjZ2qRgeTGQamO.png)

![Untitled](https://s2.loli.net/2023/03/07/IVAGsqUFNHa2fQn.png)

### 3-3. 新增Jenkins作業

![Untitled](https://s2.loli.net/2023/03/07/nMlTLz5Wp9Kfu8d.png)

### 3-4. 參數化建構 (文字參數)
`container_name（容器名）`、`image_name（鏡像名）`、`port（要映射的端口）`

![Untitled](https://s2.loli.net/2023/03/07/bgnFY1IrJcWHh4v.png)

![Untitled](https://s2.loli.net/2023/03/07/CF7SrzLhVkJim42.png)

![Untitled](https://s2.loli.net/2023/03/07/Dedf4ciE12ZutgF.png)

![Untitled](https://s2.loli.net/2023/03/07/YnuT7Lz9i2UFqcj.png)

### 3-5. 新增gitlab倉庫

![Untitled](https://s2.loli.net/2023/03/07/PaSzOUgsLTew5Rv.png)

![Untitled](https://s2.loli.net/2023/03/07/u4X3HvFOx6mGicl.png)

### 3-6. 設定 webhook (會產生url和token)

![Untitled](https://s2.loli.net/2023/03/07/2NxqbdEQvcUgFkl.png)

![Untitled](https://s2.loli.net/2023/03/07/nSlRDxUXqB1J78j.png)

### 3-7. 建置環境

![Untitled](https://s2.loli.net/2023/03/07/J4DPTmpUaF8zs1i.png)

### 3-8. 建置步驟

![Untitled](https://s2.loli.net/2023/03/07/aPXuDJYTVWpISy1.png)

![Untitled](https://s2.loli.net/2023/03/07/FHWo9E1D5B4XOxt.png)

![Untitled](https://s2.loli.net/2023/03/07/s8lx3KyVIQWbw2L.png)

```bash
#!/bin/bash

# 定義變量
CONTAINER=${container_name}
PORT=${port}

# build docker image 每次構建不產生緩存
docker build --no-cache -t ${image_name} .

# 檢查是否有重名和端口佔用情況
checkDocker() {
  RUNNING=$(docker inspect --format="{{ .State.Running }}" $CONTAINER 2>/dev/null)
  if [ -z $RUNNING ]; then
    echo "$CONTAINER does not exist."
    return 1
  fi

  if [ "$RUNNING" == "false" ]; then
    matching=$(docker ps -a --filter="name=$CONTAINER" -q | xargs)
    if [ -n $matching ]; then
      docker rm $matching
    fi
    return 2
  else
    echo "$CONTAINER is running."
    matchingStarted=$(docker ps --filter="name=$CONTAINER" -q | xargs)
    if [ -n $matchingStarted ]; then
      docker stop $matchingStarted
      docker rm ${container_name}
    fi
  fi
}

checkDocker

# 運行容器
docker run -itd --name $CONTAINER -p $PORT:80 -p 443:443 ${image_name}
```

### 3-9. 設定GitLab的webhook

到專案下的setting-webhooks

![Untitled](https://s2.loli.net/2023/03/08/tliX4SChcvJuLDn.png)

### 設定完按Test測試

![Untitled](https://s2.loli.net/2023/03/07/Kg2lBiE7JvN8D1T.png)

# 4. 構建完後發送email通知

下載模版[Email Template](https://gist.github.com/lvdaqian)
儲存到Jenkins目錄中，路徑為`jenkins_home\email-templates\`
檔名 `email-template.jelly`
如果沒有`email-templates`，要自己新增資料夾

### 4-1. Jenkins 設定系統

![Untitled](https://s2.loli.net/2023/03/08/B1Oqoh8FCSYLRKt.png)

![Untitled](https://s2.loli.net/2023/03/08/p7c5uXx49wDZAfV.png)

### 4-2. Jenkins 項目設定-建置後動作

![Untitled](https://s2.loli.net/2023/03/08/AHYkQ6IWhZ4Cgzi.png)

![Untitled](https://s2.loli.net/2023/03/08/IGVfodU2yWuRzXD.png)

# 5. 設定Docker和nginx

### 5-1. 在專案下新建`Docker`
``` docker 
FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

# 作者
MAINTAINER haodai

# nginx配置
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 前端打包完dist，依照個改路徑
COPY ./dist  /usr/share/nginx/html/

# ssl認證，沒有就不用填
COPY ssl.crt /etc/nginx/
COPY ssl.key /etc/nginx

# nginx端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 5-2. 在專案下新建`nginx.conf`
``` bash
server {
    listen 80;

    # 轉到https
    return 301 https://$host$request_uri;

}
server {
    listen 443 ssl;

    # server_name  mahaodai.tw;
    root /usr/share/nginx/html;

    # 憑證與金鑰的路徑
    ssl_certificate /etc/nginx/ssl.crt;
    ssl_certificate_key /etc/nginx/ssl.key;

    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript app>
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    #vue-router配置
    location / {
        try_files $uri $uri/ @router;
        index index.html;
    }
    location @router {
        rewrite ^.*$ /index.html last;
    }

}
```

### 5-3. 在專案下新建`.dockerignore`
``` 
# Dependency directory
# https://www.npmjs.org/doc/misc/npm-faq.html#should-i-check-my-node_modules-folder-into-git
node_modules
.DS_Store

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release
.dockerignore
Dockerfile
*docker-compose*

# Logs
logs
*.log

# Runtime data
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*
pids
*.pid
*.seed
.git
.hg
.svn
```