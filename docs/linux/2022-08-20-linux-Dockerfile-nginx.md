---
layout: Post
title: Dockerfile-nginx
subtitle: Dockerfile-nginx
author: HaoDai
date: 2022-08-20
useHeaderImage: true
headerImage: /img/in-post/linux.webp
headerMask: rgba(40, 57, 101, .4)
tags: 
  - linux
---
## Dockerfile

```bash
FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## nginx.conf

```bash
server {
    listen 80;

    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript app>
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /usr/share/nginx/html;
    server_name mahaodai.tw;
#    include /etc/nginx/mime.types;

    #vue-router配置
    location / {
        try_files $uri $uri/ @router;
        index index.html;
    }
    location @router {
        rewrite ^.*$ /index.html last;
    }

}
server {
    listen 443 ssl;

    server_name  mahaodai.tw;
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

## Build

```bash
docker build -t web . --no-cache
```

## Run

```bash
docker run -itd --name web -p 80:80 -p 443:443 -v /home/haodai/dist:/usr/share/nginx/html web
```