---
layout: Post
title: 安裝MySQL
subtitle: 安裝MySQL
author: 浩呆
date: 2022-08-20
useHeaderImage: true
headerImage: /img/in-post/linux.webp
headerMask: rgba(40, 57, 101, .4)
tags: 
  - linux
---
## **第 1 步：安裝MySQL**

```bash
sudo apt update && sudo apt install mysql-server
```

**檢查 MySQL 服務是否正在運行**

```bash
sudo service mysql status

mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2021-09-08 07:16:49 UTC; 18s ago
   Main PID: 32713 (mysqld)
     Status: "Server is operational"
      Tasks: 38 (limit: 4705)
     Memory: 356.6M
     CGroup: /system.slice/mysql.service
             └─32713 /usr/sbin/mysqld
Sep 08 07:16:48 ubuntu-20 systemd[1]: Starting MySQL Community Server...
Sep 08 07:16:49 ubuntu-20 systemd[1]: Started MySQL Community Server.
```

## **第 2 步：設定安全性（Security）**

```bash
sudo mysql_secure_installation
```

- 系統會詢問您是否要設定驗證密碼插件（VALIDATE PASSWORD PLUGIN）。除非想要強制執行嚴格的密碼規則，不然這並不是真正需要的。
如果不想設置驗證密碼插件（VALIDATE PASSWORD PLUGIN），請在此處直接按 ENTER。

```bash
Securing the MySQL server deployment.
Connecting to MySQL using a blank password.
VALIDATE PASSWORD PLUGIN can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD plugin?
Press y|Y for Yes, any other key for No:
```

- 如果沒有在第 1 步中創建 root 密碼，現在必須在這邊建立一個。

```bash
Please set the password for root here.

New password: 

Re-enter new password:
```

如果不能設定密碼的話：

1. sudo killall -9 mysql_secure_installation
2. 啟動 mysql 用戶端：`sudo mysql`
3. 執行以下 SQL 查詢：

```sql

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SetRootPasswordHere';
exit
```

- 按 y 和 ENTER 刪除匿名用戶。

```bash
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) :
```

- 按 y 和 ENTER 禁止遠端 root 登錄。這將防止機器人和駭客嘗試猜測 root 密碼。

```bash
Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) :
```

- 按 y 和 ENTER 刪除測試資料庫（Database）。

```bash
By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.

Remove test database and access to it? (Press y|Y for Yes, any other key for No) :
```

- 按 y 和 ENTER 重新載入權限表（Privilege Tables）。

```bash
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) :
```

## **第 3 步：**
**以上步驟完成後，即可測試 MySQL 是否正常運作。以下登錄 MySQL Server 並運行 version 命令。**

```bash
sudo mysqladmin -p -u root version
```

輸入前面建立的 MySQL root 密碼，應該會看到以下內容：

```bash
mysqladmin  Ver 8.0.26-0ubuntu0.20.04.2 for Linux on x86_64 ((Ubuntu))
Copyright (c) 2000, 2021, Oracle and/or its affiliates.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Server version          8.0.26-0ubuntu0.20.04.2
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /var/run/mysqld/mysqld.sock
Uptime:                 6 min 23 sec
Threads: 2  Questions: 11  Slow queries: 0  Opens: 130  Flush tables: 3  Open tables: 49  Queries per second avg: 0
.028
```

**允許遠端連入端口，預設3306**

```bash
sudo ufw allow mysql
```

---

**建立可被遠端登入的使用者**

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```