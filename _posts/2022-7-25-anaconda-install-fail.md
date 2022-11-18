---
layout: mypost
title: 【全是坑】安装Anaconda后，发现文件缺少大量文件（解决方法）
categories: [Python, Anaconda, 踩过的坑]
---

# 1.Anaconda安装失败问题
首先，Anaconda安装是比较慢的，因为文件比较多。安装成功后的文件目录是这样的：
![pic1](https://img-blog.csdnimg.cn/4c452cbd3fa54ba799dd0b75a8d5930b.jpeg)
而安装失败的文件目录是这样的：
![pic2](https://img-blog.csdnimg.cn/69a000db47f3498ea5aabd6ca2554f6f.jpeg)

安装很快，只有几个文件，而且双击_conda.exe直接闪退。（正常安装需要20-30分钟）<br>
我又安装了一遍，发现一个错误：
````
Error creating child process!
CreataProcessW:存取被拒
````
百度bing一搜，发现都是coding发生的错误，是不是这个安装包的问题呢。再一搜索，好家伙，好多博主都说Anconda网站上的最新版安装失败。看来安装失败的原因可能是新版本拉垮了。

试了一晚上终于成功了。后悔啊，Python3.6.4用的好好的，为什么要手贱重装😅。

# 2.Anaconda下载安装
## 2.1 下载
（避开第一个坑）选择安装包时要选择好Anaconda的版本，切记不要直接下载安装最新版本🤡。很多人就是这个原因，我也是其中一员。
![pic3](https://img-blog.csdnimg.cn/74d1498c19224164a9234230887ff126.jpeg)
以图为证。
![pic4](https://img-blog.csdnimg.cn/47b88d0a29ab4cca9625f56f80a815c0.jpeg)
不要下载<br>
百度bing一搜，有一个Anaconda中文网：[在 Windows 上安装_Anaconda 中文网](https://anaconda.org.cn/anaconda/install/windows/)
![pic5](https://img-blog.csdnimg.cn/486a9e68dfad4c53a8f919a7641b0107.jpeg)

此网站上的安装案例使用的Anaconda版本为2020.02（Python 3.7.6) 

由于Anaconda的服务器在国外，下载速度感人。所以直接去清华大学软件镜像站中下载，此为网站链接：[Index of /anaconda/archive/ \| 清华大学开源软件镜像站 \| Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)

当然阿里巴巴等公司也提供了下载，此处不赘述。
![pic6](https://img-blog.csdnimg.cn/e76eac8cd6c644259ec735bea37d4ff9.png)
点击下载Anaconda3-2020.02-Windows-x86_64.exe文件。

## 2.2 安装
1. 先关闭杀毒软件。（感觉不是安装失败主要原因）

2. 使用geek等专业卸载软件删除安装失败的Anacond。

3. 定位到Anaconda安装包的下载文件夹，右键以管理员身份执行。

4. 选择 Just Me
![pic7](https://img-blog.csdnimg.cn/d4ccaced42ca432badcebb21cc88758f.png)
5. 选择 Register Anaconda3 as my default Python 3.7，不建议选择添加到PATH环境中，这样容易出现污染环境变量等各种问题。​
![pic8](https://img-blog.csdnimg.cn/e031e9f48c1841ff91a84a7a6a1f6418.png)
6. 之后就是一直Next。

7. 打开 开始 菜单 看到这几个快捷方式说明安装成功了！！！
![pic9](https://img-blog.csdnimg.cn/2f8413a60a5b4e90885bb5922504d0c1.png)

还提一嘴，不要用 Anaconda Navigator 下载软件包，否则你会怀疑人生。还是得老老实实用pip
​​
