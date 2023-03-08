---
layout: Post
title: 安装和配置 docker-compose
subtitle: 安装和配置 docker-compose
author: 浩呆
date: 2023-03-07
useHeaderImage: true
headerImage: https://static.coderbridge.com/img/techbridge/images/kdchang/docker101/docker-compose-logo.png
headerMask: rgba(40, 57, 101, .4)
tags: 
  - docker
---
### 1. 從官方 Repo 取得最新的 docker compose

```bash
curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

```docker
version: "3.9" # docker compose 解析規則版本
    
services: # 定義專案組成，由 web,mysql 兩個服務組成。這兩個名稱是自訂的
  web:
    image: web
    volumes:
      - /home/ubuntu/docker/dist:/usr/share/nginx/html
    ports:
      - "80:80"
			- "443:443"
    restart: always
    
  mysql:
    depends_on: # 服務間的依賴性
      - web
    image: mahaodai/mysql
    volumes:
      - /home/ubuntu/docker/db_data:/var/lib/mysql
    restart: always
    environment: # 參數可定義在這邊
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: web
      MYSQL_USER: haodai
      MYSQL_PASSWORD: 123456
volumes: # 別忘記建立 volume，因為你在 db 和 wordpress 間有定義相關的 volumes
  db_data: {}
  wordpress_data: {}
```

1. docker-compose build建構由 docker compose 設定檔所定義的容器們，不過 build 完成後不會主動執行。
- -pull：總是從遠端拉最新版本
- -force-rm：建構前移除當前基於此設定檔的所有容器
- -no-cache：不使用快取
1. docker-compose start啟動 docker-compose 專案下的容器服務，沒有建構的動作
2. docker-compose up建構後啟動 docker-compose 專案下的所有容器服務。你可以額外下服務名稱，來啟動部分綁訂在 docker-compose 內的服務。要注意的是：docker-compose up 預設是會將容器命令即時顯示在 CLI 中 ( 又稱前台顯示 )。
    - d：將顯示模式改為後台方式
    - -force-create：強迫建立基於此設定檔的所有容器
    - -build：強迫建立容器所需要的映像檔
3. docker-compose stop猶如指令的直白描述，停止此 docker compose 專案所有容器的運行
4. docker-compose rm刪除由此 docker compose 專案所建立的所有容器
5. docker-compose logs取得 docker-compose 所形成服務的 log 記錄
    - -follow：持續輸出，而非僅一次
    - -timestamps：顯示每筆輸出的時間資訊
6. docker-compose down與 docker-compose up 的作用相反，執行時會一併的清除由 docker-compose up 所建立起的映像檔和網路設定