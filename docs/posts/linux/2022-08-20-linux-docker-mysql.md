---
layout: Post
title: docker-mysql
subtitle: docker-mysql
author: 浩呆
date: 2022-08-20
useHeaderImage: true
headerImage: https://miro.medium.com/v2/resize:fit:900/1*TTM5AleQfFJ-mItttJROdg.jpeg
headerMask: rgba(40, 57, 101, .4)
tags: 
  - docker
---
## 創建容器
```bash
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 haodai/mysql --default-authentication-plugin=mysql_native_password
```

**或**

```bash
docker run -itd --name mysql -p 3306:3306 -e MYSQL_USER=haodai -e MYSQL_PASSWORD=123456 -e MYSQL_ROOT_PASSWORD=123456 mahaodai/mysql --default-authentication-plugin=mysql_native_password
```

## 進入docker

```bash
docker exec -it mysql bash
```

```sql
CREATE USER 'haodai'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'haodai'@'%' WITH GRANT OPTION;
ALTER USER 'haodai' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;
```

```sql
mysql -h 172.17.0.2 -uhaodai -p
```