---
layout: mypost
title: Tasker每日自动健康打卡
categories: [Tasker, 打卡]
---
# 需求
1. **就是懒**！！！
2. 每天打卡有时限

# 准备
对个人要求：
- 有一定的理解能力，不怕折腾
- <ins>***学会使用搜索引擎，不要成为伸手党，不要一目十行***</ins>

对设备，软件的要求：
- 手机(已root)
- Tasker软件(有一定的基础)
- Termux高级终端
- 抓包软件(电脑: fiddle,手机: HttpCanary)
- 能够上Github的网络

# 为什么用Tasker
&emsp; 说到安卓自动化，就不能不提到Tasker。自Android在2007问世已来，仅仅过了2年时间这款软件便横空出世。逐渐成长为Google Play上最知名的安卓自动化工具软件，成为许多人无法离开Android的一个因素。但除了Tasker，安卓自动化工具还有auto.js、MacroDroid、FooView等。对比下来，Tasker虽然复杂一点，但可玩性最高，便于分享，软件生态优秀。而且对于Root用户来说，Tasker执行任务更加稳定。

# 为什么不用腾讯云函数
&emsp; 还不是因为穷。现在腾讯又改了收费方案，新用户前3个月才有免费额度，3个月后每月自动扣除12.8元，不管额度用多少，吃相难看。
# 1.下载源码
[Github](https://www.github.com)上搜索自己学校用的打卡软件名字，如图
![pic1](2022-08-21123415.png)
我搜索的是奕辅导。
[奕辅导健康打卡脚本](https://github.com/zimin9/YiFuDaoPuncher)
![pic2](2022-08-21125142.png)
源码文件目录
````
./YiFuDaoPuncher-main
├── .idea
├── utils
├── README.md
├── default_data.py
├── main.py
├── punch_in_data_generator.py
└—— YiFuDao_Puncher.py
````
&emsp; 第一个是用Python写的，刚好我电脑有Python解释器，可以下载下来运行一下。
观察<code>README.md</code>可知，运行脚本需要获取账号的access_token和打卡数据，而打卡数据的获取也需要access_token。只好先去抓包了。<br>
&emsp;奕辅导是微信小程序，所以要对微信抓包。
# 2.获取access_token
打开 HttpCanary，对 WeChat进行抓包。
从下载得到的源码中，我们可以得知抓包软件的网址域名，按照域名来查看抓到的数据
![pic3](IMG_20220821_133725.jpg)
<p style="text-align:center">access_token如图所示</p>
可以把access_token直接填入<code>default_data.py</code>中。

# 3.获取punch_in_data
&emsp;接下来对<code>default_data.py</code>和<code>README.md</code>分析得知，要获取正确的打卡信息，还必须填好punch_in_data。<br>
&emsp;打卡信息使用punch_in_data_generator.py 脚本进行抓取。步骤如下：<br>

> 1. 先在手机上正常打卡，让服务器得到今天的数据。
> 2. 再使用 python 运行 <code>punch_in_data_generator.py</code> 脚本
> 3. 将生成的 punch_in_data.json 文件中的数据全部复制到 <code>default_data.py</code> 中对应的 punch_in_data 变量

&emsp;填完之后，运行一下<code>main.py</code>。出现以下字样，说明脚本配置成功。
![pic4](2022-08-21161052.png)
# 4.自动化第一步——在手机上配置Python
&emsp;Termux是安卓手机上的一款软件，相当于在安卓上搭建了一个小型的Linux平台，所以在Linux上能干的事情很多在手机上也都办得到，比如本文就是介绍与Python相关的内容。
为什么用Termux呢，因为他本身是一个小型的Linux，安装个Python不在话下，并且可以使用最新版的Python。而QPython,PyDroid虽然自带Python环境，但是Python版本过低，有些写好的程序运行不了，定制化很差。<br>

&emsp;Termux 可以在Github和F-Droid及Google Play下载安装。
目前[Termux官网](https://termux.com)建议使用F-Droid进行安装，不再支持通过Google Play进行安装。所以此处也不提供Google Play的下载渠道。,<br>
&emsp;点击下载：[Github](https://github.com/termux/termux-app/releases)&emsp;[F-Droid](https://f-droid.org/en/packages/com.termux/)<br>

&emsp;安装完毕后，开始复制粘贴命令行了。:zany_face:
1. 更新包
````
apt update
apt upgrade
````
2. 获取权限
````
termux-setup-storage  #获取存储权限
termux-sudo           #获取root权限
````
3. 安装Python
````
pkg install python
````
4. 可能要安装的库。如：Requests库 (Python)
````
pip install requests
如果python运行时出现缺少模块的错误时，用pip安装缺少的库。
````
使用Termux还要学习两个命令 <code>ls</code> 和 <code>cd</code>。<br>
&emsp;<code>ls</code>命令的作用是列出当前目录中所有的文件和文件夹。<br>
&emsp;<code>cd</code>命令的作用是切换到某个文件夹。

&emsp;将已经修改的源码复制到手机上，使用Termux运行一次。如果运行结果与电脑上一致，说明Python环境已经配置完成。  

# 5.自动化第二步——在手机上配置Tasker
&emsp;好了，现在万事俱备，就差把 Termux 和 Tasker 相联系起来了。<br>
&emsp;关于这方面，我们可以手动创建一个全局变量，就像Windows的环境变量一样。不过和Windows的环境变量的表达上有所差异。
````
变量:%Env
export PATH=$PATH:/data/data/com.termux/files/usr/bin
````
然后每次运行shell命令时，第一行加入该变量。如图
![pic5](Screenshot_2022-08-21-13-42-56-073_net.dinglisch.android.taskerm.jpg)
***特别注意***：指令这一栏中，从上到下，<ins>一共有三个指令。</ins>每一次换行都意味着新建一条指令。<br>
**第一条指令**是配置环境。<code>%Env</code>是我们的环境变量，也是Python的运行环境。  
**第二条指令**是切换到要执行的源码的文件夹。就是<code>cd /data/data/com.termux/files/home/YiFuDaoPuncher-main</code>  
**第三条指令**是运行源码。就是<code>python main.py</code>
![pic6](Screenshot_2022-08-19-08-03-38-007_net.dinglisch.android.taskerm.jpg)
保存，退出。
这样便大功告成了，又想起了Python一行代码解决问题。  
每天8点准时打卡成功！
![pic7](Screenshot_2022-08-19-08-03-14-744_net.dinglisch.android.taskerm.jpg)
![pic8](IMG_20220821_133632.jpg)
