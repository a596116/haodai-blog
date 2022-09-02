---
layout: Post
title: 不能不會的Mysql
subtitle: 不能不會的Mysql
author: 浩呆
date: 2022-08-20
useHeaderImage: true
headerImage: https://miro.medium.com/max/900/1*TTM5AleQfFJ-mItttJROdg.jpeg
headerMask: rgba(40, 57, 101, .4)
tags: 
  - learn
---
# Mysql

**mysql安裝完成之後，在/var/log/mysqld.log文件中給root生成了一個默認密碼，這時候第一次登錄mysql數據庫時需要修改這個生成的默認密碼**

```bash
systemctl start mysqld.service 啓動
systemctl stop mysqld.service 停止
systemctl restart mysqld.service 重啓

#mysql配置文件
etc/my.cnf
```

## **數據庫管理命令**

### **1、登入數據庫相關**

**登錄數據庫**

```sql
#登錄數據庫
mysql -h localhost -u root -p dbName

#本地
mysql -u root -p
>輸入密碼

#查看數據庫信息
select version();   #查看MySQL當前的版本
show databases;     #查看有哪些數據庫
use testdb;         #切換數據庫
show tables;        #查看表
show engines;       #查看存儲引擎
```

### **2、用戶相關**

```sql
select user,host,password from mysql.user; #查詢mysql數據庫用戶

CREATE USER 'test@%' IDENTIFIED BY "123456";                #創建用戶
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';#創建用戶

#某個用戶從某台機器訪問本台mysql服務器
GRANT ALL ON dbname.tablename to user1@192.168.67.1;        #用戶授權
#mysql8授權：
GRANT SELECT, INSERT ON db.* TO 'username'@'%';             #用戶授權
GRANT ALL PRIVILEGES ON db.* TO 'username'@'localhost';     #用戶授權

show grants for user_name@localhost;                #查看用戶權限

ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';     #修改用戶密碼

#上面新建用戶，修改用戶密碼，給用戶授權後使用
flush privileges;                                   #刷新權限
```

### **3、數據庫配置相關**

```sql
#創建數據庫
#utf8_bin 區分大小寫，utf8_general_ci 不區分大小寫
CREATE DATABASE IF NOT EXISTS test DEFAULT CHARSET utf8 COLLATE utf8_bin; 

#查看 MySQL 加載配置文件的順序
#後面的配置會覆蓋前面相同的配置項
mysqld --help --verbose | grep -A 1 'Default options'

#查看MySQL的一些配置
#比如查看MySQL的數據庫文件存放在那個目錄就可以用下面的命令
show variables where Variable_name ='datadir'; 

#關閉更新時的安全模式
SET SQL_SAFE_UPDATES=0;

#關閉自動提交
SET AUTOCOMMIT=0; # 只對當前會話生效

#設置自增從 10000 開始
ALTER TABLE tableName AUTO_INCREMENT=10000; 

#關閉外鍵 約束
SELECT @@FOREIGN_KEY_CHECKS; 
SET FOREIGN_KEY_CHECKS=1; // 開啓外鍵約束 
SET FOREIGN_KEY_CHECKS=0; // 關閉外鍵約束 

#查看大小寫是否敏感
#mysql中控制數據庫名和表名的大小寫敏感由參數lower_case_table_names控制，為0時表示區分大小寫，為1時，表示將名字轉化為小寫後存儲，不區分大小寫並且以_ci（大小寫不敏感）、_cs（大小寫敏感）或_bin 大小寫敏感
SHOW VARIABLES LIKE '%case%'; 

# 查看安裝的plugin
show plugins;
```

### **4、日誌相關**

```sql
#查看參數值
show variables like "%log%"; 

#查看錯誤日誌的存放位置
show variables like '%log_error%';

#刷新binlog
# 在mysql中flush logs操作會生成一個新的binlog文件 
flush logs;

#查看最後一個bin日誌
show master status; 

#清空所有日誌
reset master;
```

### **5、數據庫空間查看**

```sql
#查看數據庫佔用空間
SELECT 
    table_schema,
    SUM(data_length + index_length) / 1024 / 1024 AS total_mb,
    SUM(data_length) / 1024 / 1024 AS data_mb,
    SUM(index_length) / 1024 / 1024 AS index_mb,
    COUNT(*) AS tables,
    CURDATE() AS today
FROM
    information_schema.tables
GROUP BY table_schema
ORDER BY 2 DESC; 

#查看某個數據庫表中的情況
SELECT 
    table_name,
    (data_length / 1024 / 1024) AS data_mb,
    (index_length / 1024 / 1024) AS index_mb,
    ((data_length + index_length) / 1024 / 1024) AS all_mb,
    table_rows
FROM
    information_schema.tables
WHERE
    table_schema = 'db_name'; 

#查看某個庫的具體情況
show table status from db_name;

#查看數據庫中表碎片的情況
SELECT TABLE_SCHEMA
      ,TABLE_NAME 
      ,ENGINE
      ,ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS SIZE_MB
      ,ROUND(DATA_FREE/1024/1024,2) AS FREE_SIZ_MB
FROM information_schema.TABLES 
WHERE DATA_FREE >=100*1024*1024
ORDER BY FREE_SIZ_MB DESC;
```

---

## **數據庫操作SQL語句**

### **1、表操作**

```sql
#查看創建表的sql語句
show create table t1; 

#表刪除
truncate table1;        #刪除一張表裡所有的數據
drop table table1;      #刪除一張表

#表複製
create table bs_test2 like bs_test1 # 複製表結構 
INSERT INTO bs_test1 SELECT * FROM bs_test2; #複製表中的數據 

#給表添加註釋
ALTER TABLE 表名 COMMENT '注釋的內容'
#查看某個表的注釋
SELECT table_name,table_comment FROM information_schema.tables where table_name='表名' 

#查詢出 數據庫 中所有的 表信息
select table_name from information_schema.tables where table_schema='數據庫名' and table_type='base table'; select * from information_schema.tables where table_schema='數據庫名' and table_type='base table'; 

#查看一張表 或 一條sql語句的執行情況
(DESC 或 EXPLAIN) DESC SELECT * FROM bs_member DESC bs_member

#創建 json 列，創建虛擬列 user_name，address
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `info` json NOT NULL,
  `user_name` varchar(128) GENERATED ALWAYS AS (json_extract(`info`,'$.name')) VIRTUAL,
  `address` varchar(128) GENERATED ALWAYS AS (json_extract(`info`,'$.address')) STORED,
  PRIMARY KEY (`id`),
  KEY `user_name_index` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8
```

### **2、表查詢**

```sql
#排序
SELECT * FROM `tableName` ORDER BY colName desc, colName asc 
#將字符型的 數字（ID_）轉成數字來排序 +0 或 *1
SELECT * FROM `tableName` order by ID_+0 asc; 

#分組
SELECT `colName `,count(*) as total FROM `tableName` GROUP BY colName 

#查詢 最後 10 條數據（id 自增）
select * from wy_user order by id desc limit 10;

#按某一列的值的長度查找，UTF8 編碼中文長度為 3
SELECT * FROM `bs_member` WHERE city like '%台北%' and length(city) > 7

#查詢重復記錄
SELECT
    id,email
FROM
    wy_user2
WHERE
    id IN (
        SELECT
            id
        FROM
            wy_user2
        GROUP BY
            email
        HAVING
            count(email) > 1
    )
    
    
#刪除重復記錄，並保留id最小的記錄
delete from wy_user2 where id not in (select minid from (select min(id) as minid from wy_user2 group by email) b);
```

### **3、索引相關**

```sql
#添加主鍵索引
#它 是一種特殊的唯一索引，不允許有空值
ALTER TABLE `table_name` ADD PRIMARY KEY ( `column` ) 

#添加唯一索引
#與"普通索引"類似，不同的就是：索引列的值必須唯一，但允許有空值。
ALTER TABLE `table_name` ADD UNIQUE ( `column` ) 

#添加普通索引
ALTER TABLE `table_name` ADD INDEX index_name ( `column` ) 
ALTER TABLE `table_name` ADD INDEX index_name ( `column1`, `column2`, `column3` ) 

#添加全文索引
#僅可用於 MyISAM 表，針對較大的數據，生成全文索引很耗時好空間 (適用於，大塊數據，如文章內容)
ALTER TABLE `table_name` ADD FULLTEXT ( `column`) 

#查看表的索引信息
show index from table1

#刪除索引
DROP INDEX index_name ON table_name 

#查詢時禁止使用主鍵索引
select * from tableName ignore index(PRI)

#查詢時禁止使用某些索引
select * from tableName ignore index(PRI, indexName) 

#查詢時強制使用主鍵索引
select * from tableName force index(PRI)

#查詢時強制使用某些索引
select * from tableName force index(PRI, indexName)
```

### **4、數據備份與導入**

```sql
#數據庫備份
/usr/local/mysql/bin/mysqldump -u root -p lemon > lemon.sql /usr/local/mysql/bin/mysqldump -u root -p dbName tableName --where="..." > table.sql 

#將 CSV 文件導入 Mysql 中
LOAD DATA LOCAL INFILE '/home/db-friend/aff11.csv' into table user1 FIELDS TERMINATED BY ',' lines terminated by '\n' ignore 1 lines (pwsid,email,country,sex,birthday,state,zip,ip);
```

---

## **MySQL教程**

### **mysql官方文檔**

[https://dev.mysql.com/doc/refman/8.0/en/](https://dev.mysql.com/doc/refman/8.0/en/)

### **[mysql優化](http://rcode.rbtree.cn/mysql%E4%BC%98%E5%8C%96_2.html)**

### **[mysql安裝菜鳥教程](https://www.runoob.com/mysql/mysql-install.html)**

[windows安裝文件下載](https://dev.mysql.com/downloads/windows/installer/)

### **mybatis官方文檔**

[https://mybatis.org/mybatis-3/zh/](https://mybatis.org/mybatis-3/zh/)