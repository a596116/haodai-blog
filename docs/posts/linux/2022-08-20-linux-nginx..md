---
layout: Post
title: 安装和配置 Nginx
subtitle: 安装和配置 Nginx
author: 浩呆
date: 2022-08-20
useHeaderImage: true
headerImage: https://fromideatocreation.com/wp-content/uploads/2022/05/1_SlKVDwLV1aunwZIriepTYg.png
headerMask: rgba(40, 57, 101, .4)
tags: 
  - linux
---
# Nginx

[如何在 Ubuntu 20.04 中安装和配置 Nginx - 卡拉云 (kalacloud.com)](https://kalacloud.com/blog/how-to-install-nginx-on-ubuntu-20-04/)

## **第 1 步：安裝 Nginx**

```bash
sudo apt update
sudo apt install nginx
```

## **第 2 步：調整防火牆**

```bash
sudo ufw app list
```

看到 Nginx 提供了三個配置文件：

- **Nginx Full**
    
    開端口80 正常，未加密的網絡流量
    
    端口443 TLS / SSL加密的流量
    
- **Nginx HTTP**
    
    僅打開端口80 正常，未加密
    
- **Nginx HTTPS**
    
    僅打開端口443 TLS / SSL加密
    
    ```bash
    # 添加Nginx HTTP到防火牆
    sudo ufw allow 'Nginx HTTP'
    
    # 用以下命令來查看更改結果
    sudo ufw status
    ```
    
    ## **第3步：檢查 Web 服務器**
    
    ```bash
    systemctl status nginx
    ```
    
    ## **第 4 步：管理 Nginx**
    
    ### **服务启动**
    
    ```bash
    nginx
    # 當然我們可以只用-c選項制定配置文件，不指定的話就是使用默認的配置
    nginx -c [path]
    # 直接運行nginx的二進制文件，沒有報錯則表明服務已經啓動了。可以使用ps命令查看進程
    ```
    
    ### **服務停止**
    
    ```bash
    # 立即停止
    nginx -s stop 
    # 或者
    # 平滑停止
    nginx -s quit
    # 或者
    kill TERM | INT | QUIT PID
    # 或者（不建議這麼停止服務）
    kill -9 PID
    ```
    
    ### **服務重啓**
    
    ```bash
    # 平滑重啓服務
    nginx -s reload
    # 或者
    kill HUP PID
    ```
    
    ## **第5步：設置服務器塊（Server block）**
    
    ```bash
    sudo mkdir -p /home/haodai/www
    sudo chown -R $USER:$USER /home/haodai/www
    sudo chmod -R 755 /home/haodai/www
    ```
    
    ### 修改Nginx默認配置文件
    
    ```bash
    sudo nano /etc/nginx/sites-available/dafault
    
    server {
            listen 80;
            listen [::]:80;
            root /home/haodai/www;
            index index.html index.htm index.nginx-debian.html;
            server_name ;
            location / {
                    try_files $uri $uri/ =404;
            }
    }
    ```
    
    ### 為避免可能由於添加其他服務器名稱而引起的哈希存儲區內存問題，有必要調整`/etc/nginx/nginx.conf`文件中的單個值
    
    找到`server_names_hash_bucket_size`指令并删除`#`符号：
    
    ```bash
    ...
    http {
        ...
        server_names_hash_bucket_size 64;
        ...
    }
    ...
    ```
    
    ## 第 6 步 学习 Nginx 文件及目录结构
    
    ### 内容
    
    - `/var/www/html` 默認的 Web 頁面。默認打開可以看到 Nginx 頁面。
    - `/var/www/html` 實際的 Web 內容。默認請看下只有 Nginx 自己的原生頁面。我們可以通過更改 Nginx 配置來更改文件。
    
    ### 服务器配置
    
    - `/etc/nginx` Nginx 配置目錄。所有 Nginx 的配置文件都在這裡。
    - `/etc/nginx/nginx.conf` Nginx 的配置文件。大多數全局配置可以通過這個文件來修改。
    - `/etc/nginx/sites-available/sites-enabled` 用來存儲服務器下每個站點服務器塊的目錄。 默認情況下 Nginx 不會直接使用目錄下的配置文件，需要我們更改配置來告訴 Nginx 來去讀。
    - `/etc/nginx/sites-enabled/sites-available` 這裡是存儲已經啓用站點服務器塊的目錄。
    - `/etc/nginx/snippets` 這個目錄包含一些 Nginx 的配置文件。可打開詳細查看這些配置文件到文檔進行學習。
    
    ### 服务器日志
    
    - `/var/log/nginx/access.log` 這裡是 Nginx 到日誌文件，對 Web 服務器的每個請求都會記錄在這個日誌中。
    - `/var/log/nginx/error.log` 記錄 Nginx 運行過程中發生的錯誤日誌。