---
layout: mypost
title: HttpCanary对WeChat抓包
categories: [抓包, HttpCanary]
---
## HttpCanary的好处
1. 直接在手机上抓包，快捷方便。
2. 可以针对某一应用抓包，减少数据量。
3. 可以重写数据，并对服务器发送已重写的数据。(懂的都懂)
4. 有许多网络工具。

## 1.准备
- HttpCanary软件
- 已经Root的手机(或者安卓模拟器、安卓虚拟机)

## 2.HttpCanary的配置
下载以后安装。
此时会提示安装ca证书，并且安装失败，跳过证书安装以后，打开MT管理器，进入/data/data/com.guoshi.httpcanary.premium/cache/后，将httpCanary.pem文件复制，将复制文件重命名为httpCanary.jks。<br>
此时返回HttpCanary会发现显示证书已经安装，但实际上此时无法抓取https数据。
在设置-HttpCanary根证书中选择添加根证书至系统，赋予HttpCanary root权限后，即可正常使用。

## 3.HttpCanary抓包
&emsp;点击左上方的三条横线(菜单)，再点击目标应用(Target Apps),点进去后，点击右上方的“+”，搜索添加WeChat。
![pic1](IMG_20220821_131001.jpg)
![pic2](IMG_20220821_131109.jpg)
![pic3](IMG_20220821_131213.jpg)
回到软件主介面，点击右下角的小飞机开始抓包。<br>

