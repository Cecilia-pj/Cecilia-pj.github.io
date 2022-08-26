---
layout: mypost
title: Tasker每日自动健康打卡
categories: [Tasker]
---
## 需求
1. **懒**！！！
2. 每天打卡有时限

## 准备
- 成年大学生
- Tasker软件
- Termux高级终端
- 抓包软件(电脑: fiddle,手机: HttpCanary)
- 手机(???)
- 能够上Github的网络
- <ins>***脑子***</ins>

## 为什么用Tasker
&emsp; 说到安卓自动化，就不能不提到Tasker。自Android在2007问世已来，仅仅2年时间这款软件便横空出世。成为Google Play上最知名的安卓自动化软件。但除了Tasker，安卓自动化工具还有auto.js、MacroDroid、FooView等。对比下来，Tasker虽然复杂一点，但可玩性最高，便于分享，软件生态优秀。而且对于Root用户来说Tasker执行任务更加稳定。

## 为什么不用腾讯云函数
&emsp; 还不是因为穷。现在腾讯又改了收费方案，新用户前3个月才有免费额度，3个月后自动扣除12.8元，不管额度用多少，吃相难看。
## 1.下载源码
[Github](https://www.github.com)上搜索自己学校用的打卡软件名字，如图
![pic1](2022-08-21123415.png)
我搜索的是奕辅导。
[奕辅导健康打卡脚本](https://github.com/zimin9/YiFuDaoPuncher)
![pic2](2022-08-21125142.png)
文件目录
````
|.idea
|utils
├ ─ README.md
├ ─ default_data.py
├ ─ main.py
├ ─ punch_in_data_generator.py
└ ─ YiFuDao_Puncher.py

````
&emsp; 第一个是用Python写的，刚好我电脑有Python解释器，可以下载下来运行一下。
打开<code>README.md</code>可知，运行脚本需要获取账号的access_token。只好先去抓包了。
## 2.获取access_token
打开 HttpCanary，对 WeChat进行抓包。
从下载得到的源码中，我们可以得知抓包软件的网址域名，按照域名来查看抓到的数据
![pic3](IMG_20220821_133725.jpg)
<p style="text-align:center">access_token如图所示</p>
可以把access_token直接填入<code>default_data.py</code>中。

## 3.获取punch_in_data
&emsp;然后对<code>default_data.py</code>和<code>README.md</code>分析得知，要获取正确的打卡信息，还必须填好punch_in_data。<br>
&emsp;打卡信息使用punch_in_data_generator.py 脚本进行抓取。步骤如下：<br>

> 1. 先在手机上正常打卡，让服务器得到今天的数据。
> 2. 再使用 python 运行 <code>punch_in_data_generator.py</code> 脚本
> 3. 将生成的 punch_in_data.json 文件中的数据全部复制到 <code>default_data.py</code> 中对应的 punch_in_data 变量

&emsp;填完之后，运行一下<code>main.py</code>。出现以下字样，说明脚本配置成功。
![pic4](2022-08-21161052.png)
## 4.自动化第一步——在手机上配置Python
&emsp;Termux是安卓手机上的一款软件，相当于在安卓上搭建了一个Linux平台，所以在Linux上能干的事情很多在手机上也都办得到，比如本文就是介绍与Python相关的内容。
为什么用Termux呢，因为他本身是一个小型的Linux，安装个Python不在话下。QPython,PyDroid虽然自带Python环境，但是Python版本过低，有些写好的程序运行不了。

更新中
