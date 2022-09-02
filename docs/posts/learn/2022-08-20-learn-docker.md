---
layout: Post
title: 踏入Docker的世界
subtitle: 踏入Docker的世界
author: 浩呆
date: 2022-08-20
useHeaderImage: true
headerImage: https://snippetinfo.net/sysdata/attach/media.1286/061acd0b24a68ac5469030310d7f2e72.png
headerMask: rgba(40, 57, 101, .4)
tags: 
  - learn
---
# Docker

日常用的最多的是命令是

```bash
docker exec -it ${CONTAINER NAME/ID} /bin/bash                 #進入容器內
```

## **docker基础命令**

```bash
docker pull ${CONTAINER NAME}                    #拉取鏡像
docker images                                    #查看本地所有鏡像
docker ps                                        #查看所有正在運行的容器，加-q返回id
docker ps -a                                     #查看所有容器，加-q返回id
docker rmi ${IMAGE NAME/ID}                      #刪除鏡像
docker rm ${CONTAINER NAME/ID}                   #刪除容器
docker save ${IMAGE NAME} > ${FILE NAME}.tar     #將鏡像保存成文件
docker load < ${FILE NAME}.tar                   #從文件加載鏡像
docker start ${CONTAINER NAME/ID}                #運行一個以前運行過的容器
docker stop ${CONTAINER NAME/ID}                 #停止一個正在運行的容器
docker logs ${CONTAINER NAME/ID}                 #顯示運行容器的日誌
docker run...                                    #運行一個容器
    --name ${container name}                          #設置容器名稱
    -p ${host port}:${container port}                 #映射主機和容器內的端口
    -e ${env name}=${env value}                       #添加環境變量
    -d                                                #後台運行
    -v ${host folder path}:${container folder path}   #將主機目錄掛在到容器內
```

## **docker高級命令**

```bash
# Advance use 
docker ps -f "status=exited"                                   #顯示所有退出的容器
docker ps -a -q                                                #顯示所有容器id
docker ps -f "status=exited" -q                                #顯示所有退出容器的id
docker restart $(docker ps -q)                                 #重啓所有正在運行的容器
docker stop $(docker ps -a -q)                                 #停止所有容器
docker rm $(docker ps -a -q)                                   #刪除所有容器
docker rm $(docker ps -f "status=exited" -q)                   #刪除所有退出的容器
docker rm $(docker stop $(docker ps -a -q))                    #停止並刪除所有容器
docker start $(docker ps -a -q)                                #啓動所有容器
docker rmi $(docker images -a -q)                              #刪除所有鏡像
docker exec -it ${CONTAINER NAME/ID} /bin/bash                 #進入容器內
docker exec -it ${CONTAINER NAME/ID} ping ${CONTAINER NAME/ID} #一個容器ping另外一個容器
docker top ${CONTAINER NAME/ID}                                #顯示一個容器的top信息
docker stats                                                   #顯示容器統計信息(正在運行)
    docker stats -a                                            #顯示所有容器的統計信息(包括沒有運行的)
    docker stats -a --no-stream                                #顯示所有容器的統計信息(包括沒有運行的) ，只顯示一次
    docker stats --no-stream | sort -k8 -h                     #統計容器信息並以使用流量作為倒序
docker system 
      docker system df           #顯示硬盤佔用
      docker system events       #顯示容器的實時事件
      docker system info         #顯示系統信息
      docker system prune        #清理文件
```

## **docker教程**

[菜鳥docker教程](https://www.runoob.com/docker/docker-tutorial.html)

[docker官方文檔](https://docs.docker.com/)

## **一、環境配置的難題**

軟件開發最大的麻煩事之一，就是環境配置。用戶計算機的環境都不相同，你怎麼知道自家的軟件，能在那些機器跑起來？

用戶必須保證兩件事：操作系統的設置，各種庫和組件的安裝。只有它們都正確，軟件才能運行。舉例來說，安裝一個 Python 應用，計算機必須有 Python 引擎，還必須有各種依賴，可能還要配置環境變量。

如果某些老舊的模塊與當前環境不兼容，那就麻煩了。開發者常常會說："它在我的機器可以跑了"（It works on my machine），言下之意就是，其他機器很可能跑不了。

環境配置如此麻煩，換一台機器，就要重來一次，曠日費時。很多人想到，能不能從根本上解決問題，軟件可以帶環境安裝？也就是說，安裝的時候，把原始環境一模一樣地複製過來。

## **二、虛擬機**

虛擬機（virtual machine）就是帶環境安裝的一種解決方案。它可以在一種操作系統裡面運行另一種操作系統，比如在 Windows 系統裡面運行 Linux 系統。應用程序對此毫無感知，因為虛擬機看上去跟真實系統一模一樣，而對於底層系統來說，虛擬機就是一個普通文件，不需要了就刪掉，對其他部分毫無影響。

雖然用戶可以通過虛擬機還原軟件的原始環境。但是，這個方案有幾個缺點。

### **（1）資源佔用多**

虛擬機會獨佔一部分內存和硬盤空間。它運行的時候，其他程序就不能使用這些資源了。哪怕虛擬機裡面的應用程序，真正使用的內存只有 1MB，虛擬機依然需要幾百 MB 的內存才能運行。

### **（2）冗余步驟多**

虛擬機是完整的操作系統，一些系統級別的操作步驟，往往無法跳過，比如用戶登錄。

### **（3）啓動慢**

啓動操作系統需要多久，啓動虛擬機就需要多久。可能要等幾分鐘，應用程序才能真正運行。

## **三、Linux 容器**

由於虛擬機存在這些缺點，Linux 發展出了另一種虛擬化技術：Linux 容器（Linux Containers，縮寫為 LXC）。

**Linux 容器不是模擬一個完整的操作系統，而是對進程進行隔離。**或者說，在正常進程的外面套了一個[保](https://opensource.com/article/18/1/history-low-level-container-runtimes)護層。對於容器裡面的進程來說，它接觸到的各種資源都是虛擬的，從而實現與底層系統的隔離。

由於容器是進程級別的，相比虛擬機有很多優勢。

### **（1）啓動快**

容器裡面的應用，直接就是底層系統的一個進程，而不是虛擬機內部的進程。所以，啓動容器相當於啓動本機的一個進程，而不是啓動一個操作系統，速度就快很多。

### **（2）資源佔用少**

容器只佔用需要的資源，不佔用那些沒有用到的資源；虛擬機由於是完整的操作系統，不可避免要佔用所有資源。另外，多個容器可以共享資源，虛擬機都是獨享資源。

### **（3）體積小**

容器只要包含用到的組件即可，而虛擬機是整個操作系統的打包，所以容器文件比虛擬機文件要小很多。

總之，容器有點像輕量級的虛擬機，能夠提供虛擬化的環境，但是成本開銷小得多。

## **四、Docker 是什麼？**

**Docker 屬於 Linux 容器的一種封裝，提供簡單易用的容器使用接口。**它是目前最流行的 Linux 容器解決方案。

Docker 將應用程序與該程序的依賴，打包在一個文件裡面。運行這個文件，就會生成一個虛擬容器。程序在這個虛擬容器里運行，就好像在真實的物理機上運行一樣。有了 Docker，就不用擔心環境問題。

總體來說，Docker 的接口相當簡單，用戶可以方便地創建和使用容器，把自己的應用放入容器。容器還可以進行版本管理、複製、分享、修改，就像管理普通的代碼一樣。

## **五、Docker 的用途**

Docker 的主要用途，目前有三大類。

**（1）提供一次性的環境。**比如，本地測試他人的軟件、持續集成的時候提供單元測試和構建的環境。

**（2）提供彈性的雲服務。**因為 Docker 容器可以隨開隨關，很適合動態擴容和縮容。

**（3）組建微服務架構。**通過多個容器，一台機器可以跑多個服務，因此在本機就可以模擬出微服務架構。

## **六、Docker 的安裝**

Docker 是一個開源的商業產品，有兩個版本：社區版（Community Edition，縮寫為 CE）和企業版（Enterprise Edition，縮寫為 EE）。企業版包含了一些收費服務，個人開發者一般用不到。下面的介紹都針對社區版。

Docker CE 的安裝請參考官方文檔。

• [Mac](https://docs.docker.com/docker-for-mac/install/)

• [Windows](https://docs.docker.com/docker-for-windows/install/)

• [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

• [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)

• [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)

• [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)

• [其他 Linux 發行版](https://docs.docker.com/install/linux/docker-ce/binaries/)

安裝完成後，運行下面的命令，驗證是否安裝成功。

```bash
docker version
# 或者
docker info
```

Docker 需要用戶具有 sudo 權限，為了避免每次命令都輸入`sudo`，可以把用戶加入 Docker 用戶組（[官方文檔](https://docs.docker.com/engine/install/linux-postinstall/)）。

```bash
sudo usermod -aG docker $USER
```

Docker 是服務器----客戶端架構。命令行運行`docker`命令的時候，需要本機有 Docker 服務。如果這項服務沒有啓動，可以用下面的命令啓動（[官方文檔](https://docs.docker.com/config/daemon/systemd/)）。

```bash
# service 命令的用法
sudo service docker start

# systemctl 命令的用法
sudo systemctl start docker
```

## **六、image 文件**

**Docker 把應用程序及其依賴，打包在 image 文件裡面。**只有通過這個文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根據 image 文件生成容器的實例。同一個 image 文件，可以生成多個同時運行的容器實例。

image 是二進制文件。實際開發中，一個 image 文件往往通過繼承另一個 image 文件，加上一些個性化設置而生成。舉例來說，你可以在 Ubuntu 的 image 基礎上，往裡面加入 Apache 服務器，形成你的 image。

```bash
# 列出本機的所有 image 文件。
docker image ls

# 刪除 image 文件
docker image rm [imageName]
```

image 文件是通用的，一台機器的 image 文件拷貝到另一台機器，照樣可以使用。一般來說，為了節省時間，我們應該盡量使用別人製作好的 image 文件，而不是自己製作。即使要定制，也應該基於別人的 image 文件進行加工，而不是從零開始製作。

為了方便共享，image 文件製作完成後，可以上傳到網上的倉庫。Docker 的官方倉庫 [Docker Hub](https://hub.docker.com/) 是最重要、最常用的 image 倉庫。此外，出售自己製作的 image 文件也是可以的。

## **七、實例：hello world**

下面，我們通過最簡單的 image 文件"[hello world"](https://hub.docker.com/r/library/hello-world/)，感受一下 Docker。

需要說明的是，國內連接 Docker 的官方倉庫很慢，還會斷線，需要將默認倉庫改成國內的鏡像網站。

首先，運行下面的命令，將 image 文件從倉庫抓取到本地。

```bash
docker image pull library/hello-world
```

上面代碼中，`docker image pull`是抓取 image 文件的命令。`library/hello-world`是 image 文件在倉庫裡面的位置，其中`library`是 image 文件所在的組，`hello-world`是 image 文件的名字。

由於 Docker 官方提供的 image 文件，都放在`library`組裡面，所以它的是默認組，可以省略。因此，上面的命令可以寫成下面這樣。

```bash
docker image pull hello-world
```

抓取成功以後，就可以在本機看到這個 image 文件了。

```bash
docker image ls
```

現在，運行這個 image 文件。

```bash
docker container run hello-world
```

`docker container run`命令會從 image 文件，生成一個正在運行的容器實例。

注意，`docker container run`命令具有自動抓取 image 文件的功能。如果發現本地沒有指定的 image 文件，就會從倉庫自動抓取。因此，前面的`docker image pull`命令並不是必需的步驟。

如果運行成功，你會在屏幕上讀到下面的輸出。

```bash
docker container run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

... ...
```

輸出這段提示以後，`hello world`就會停止運行，容器自動終止。

有些容器不會自動終止，因為提供的是服務。比如，安裝運行 Ubuntu 的 image，就可以在命令行體驗 Ubuntu 系統。

```bash
docker container run -it ubuntu bash
```

對於那些不會自動終止的容器，必須使用`docker container kill`命令手動終止。

```bash
docker container kill [containID]
```

## **八、容器文件**

**image 文件生成的容器實例，本身也是一個文件，稱為容器文件。**也就是說，一旦容器生成，就會同時存在兩個文件： image 文件和容器文件。而且關閉容器並不會刪除容器文件，只是容器停止運行而已。

```bash
# 列出本機正在運行的容器
$ docker container ls

# 列出本機所有容器，包括終止運行的容器
$ docker container ls --all
```

上面命令的輸出結果之中，包括容器的 ID。很多地方都需要提供這個 ID，比如上一節終止容器運行的`docker container kill`命令。

終止運行的容器文件，依然會佔據硬盤空間，可以使用`docker container rm`命令刪除

```bash
docker container rm [containerID]
```

運行上面的命令之後，再使用`docker container ls --all`命令，就會發現被刪除的容器文件已經消失了。

## **九、其他有用的命令**

docker 的主要用法就是上面這些，此外還有幾個命令，也非常有用。

### **（1）docker container start**

前面的`docker container run`命令是新建容器，每運行一次，就會新建一個容器。同樣的命令運行兩次，就會生成兩個一模一樣的容器文件。如果希望重復使用容器，就要使用`docker container start`命令，它用來啓動已經生成、已經停止運行的容器文件。

```bash
docker container start [containerID]
```

### **（2）docker container stop**

前面的`docker container kill`命令終止容器運行，相當於向容器裡面的主進程發出 SIGKILL 信號。而`docker container stop`命令也是用來終止容器運行，相當於向容器裡面的主進程發出 SIGTERM 信號，然後過一段時間再發出 SIGKILL 信號。

```bash
docker container stop [containerID]
```

這兩個信號的差別是，應用程序收到 SIGTERM 信號以後，可以自行進行收尾清理工作，但也可以不理會這個信號。如果收到 SIGKILL 信號，就會強行立即終止，那些正在進行中的操作會全部丟失。

### **（3）docker container logs**

`docker container logs`命令用來查看 docker 容器的輸出，即容器裡面 Shell 的標準輸出。如果`docker run`命令運行容器的時候，沒有使用`-it`參數，就要用這個命令查看輸出。

```bash
docker container logs [containerID]
```

### **（4）docker container exec**

`docker container exec`命令用於進入一個正在運行的 docker 容器。如果`docker run`命令運行容器的時候，沒有使用`-it`參數，就要用這個命令進入容器。一旦進入了容器，就可以在容器的 Shell 執行命令了。

```bash
docker container exec -it [containerID] /bin/bash
```

### **（5）docker container cp**

`docker container cp`命令用於從正在運行的 Docker 容器裡面，將文件拷貝到本機。下面是拷貝到當前目錄的寫法。

```bash
docker container cp [containID]:[/path/to/file] .
```