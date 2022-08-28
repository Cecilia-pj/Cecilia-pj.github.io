---
layout: mypost
title: Tasker获取网页数据
categories: [Tasker]
---
## 起因
&emsp;我想要让手机每天都去一个网页并获取其中的一小段数据，虽然对于Python来说很简单。但是用Python不好进行通知，因为我想直接使用Android的系统通知，而不是使用第三方邮箱、WeChat进行通知，因为它们都可能存在漏接或迟接。所以Tasker应该是一个好的选择。

## 使用HTTP Request来获取数据
&emsp;由于Tasker已经把HTTP Get、HTTP Head和HTTP Post弃用。所以我们使用HTTP Request来代替它们进行网页数据的操作。

0. 安卓手机安装 Tasker
1. 添加配置文件。点击 + 添加配置文件（取名“获取网页数据”）
2. 获取数据。点击 + 添加操作 → 网络 → HTTP Request
>方法：一般都是Get  
>URL：要获取数据的网址  
>头部：一般是浏览器代理和Content-Type,直接点放大镜选一下就行了。  
>将输出保存：先用MT管理器新建一个.html文件，再点放大镜选它就行了。  

如图。我们已经将网页数据都保存到1.html了。
![pic1](1661657842187.jpg)
3. 读取文件。点击 + 添加操作 → 文件 →  读取文件  
>文件：刚才保存的.html文件  
>变量：新建一个名称简单的局部变量

如图。将1.html所有的数据读取并存入到%html。
![pic2](Screenshot_2022-08-28-12-16-25-758_net.dinglisch.android.taskerm.jpg)
4. 截取数据。
[官网文档](https://tasker.joaoapps.com/userguide/en/variables.html)有关于html数据的读取方式。但是是英文的。翻译一下它。
![pic3](2022-08-28122814.png)<br>
从 5.12 版开始，Tasker 可以直接读取这些值。您可以使用点或方括号表示法，如下所示（考虑上面的文本有一个名为 %html 的变量）。
- %html.div 或 %html[div] 将返回第一个 div 的内容
- %html.div() 或 %html[div]\(\) 将返回一个逗号分隔的 div 内容列表
- %html[img=:=src] 将返回第一个 img 的 src 属性 image.jpg。您可以使用 =:= 表示法来检索任何元素的属性，如图所示。

笔记：
- 如果你想使用类似 [attr=value] 的属性匹配 CSS 查询，请使用大括号而不是方括号，例如 {attr=value}。例如，要查询属性 sr=1 的 div，您应该使用类似 %html[div{sr=1}] 的内容。
- 如果你想使用像 div:nth-child(2) 这样使用括号的 CSS 查询，使用 «» 代替括号，例如 div:nth-child«2»
- HTML/XML 读取不支持在同一个表达式中嵌套读取，因此 %html.query1.query2 之类的内容将不起作用。使用类似 query1>query2 的 CSS 查询来获取内部字段。

&emsp;从以上信息中，我们知道了html数据的提取。  
&emsp;但是光看是没有用的，来实践一下。打开baidu。
![pic4](2022-08-28141918.png)
打个比方，我要获取“更多”这个文本。  
鼠标右键打开浏览器的检查功能。可以看到“更多”处于<code>div class="mnav s-top-more-btn"</code>之下。
![pic5](2022-08-28163149.png)
所以使用<code>%html[div{class=mnav s-top-more-btn}]</code>来表示其下携带的数据。  
&emsp;想要更加精确的读取“更多”需要进行嵌套读取，<code>div class="mnav s-top-more-btn"</code>下一个标签是<code>a</code>。所以使用<code>%html[div{class=mnav s-top-more-btn}>a]</code>来表示a所携带的数据。也就是“更多”。  
&emsp;假如我想提取“更多”的网址。应使用<code>%html[div{class=mnav s-top-more-btn}>a=:=href]</code>来表示。  
&emsp;假如我想提取“地图”文本。这时应使用<code>%html[div{id=s-top-left}>a:nth-child«3»]</code>来表示。

## 总结
&emsp;要提取数据先要打开浏览器，鼠标右键打开浏览器的检查功能。查看各个标签的相对位置。
- 标签并列的话要使用nth-child«»。«»中的数字代表其排列顺序
- 标签嵌套的话要使用>。
- 当标签含有多种属性的话要使用=:=
- 要匹配标签的话要使用div{attr=value} ,attr和value从html文件中找

## 参考链接
[Tasker官网文档:Variables](https://tasker.joaoapps.com/userguide/en/variables.html)<br>
[Tasker官网文档:HTTP Request](https://tasker.joaoapps.com/userguide/en/help/ah_http_request.html)
