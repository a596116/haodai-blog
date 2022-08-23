---
layout: Post
title: 安裝 Docker
subtitle: 安裝 Docker
author: HaoDai
date: 2022-08-20
useHeaderImage: true
headerImage: /img/in-post/linux.webp
headerMask: rgba(40, 57, 101, .4)
tags: 
  - linux
---
## **安裝 Docker**

安裝一些必備軟件包，讓 apt 通過 HTTPS 使用軟件包

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

將官方 Docker 版本庫的 GPG 密鑰添加到系統中

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

將 Docker 版本庫添加到APT源

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

用新添加的 Docker 軟件包來進行升級更新

```bash
sudo apt update
```

確保要從 Docker 版本庫，而不是默認的 Ubuntu 版本庫進行安裝

```bash
apt-cache policy docker-ce
```

最後，安裝 Docker

```bash
sudo apt install docker-ce
```

檢查 Docker 是否正在運行

```bash
sudo systemctl status docker
```

如果不想用 sudo 來執行 docker 命令，那麼我們只需要把對應的用戶添加到 docker 組中即可

```bash
sudo usermod -aG docker ${USER}
```

## 創建Docker

編寫Dockerfile