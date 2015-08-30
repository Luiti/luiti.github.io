---
layout: chinese_luiti
---

# 使用 Luiti 来构建数据仓库

> {{ site.chinese_article.description }}


<hr>

## 数据处理中遇到的软件工程挑战

数据处理也是软件工程，而软件工程的本质就是控制复杂度。

如果数据在百万规模以下（这种说法仅仅为泛指），且业务逻辑比较简单，那么就可以用一些原始粗暴的方式
去处理数据，比如 SQL, awk, Shell 脚本，和 Python 等，也都是合适的。

如果数据规模达到需要 Hadoop 体系里的 MapReduce, Hive 等工具去处理的时候，公司势必得需要
**大数据基础设施架构师** 来搭建和维护整套 Hadoop 基础架构环境，需要 **数据仓库工程师** 来做
数据仓库的业务数据分层和实现。这样之后，传统的 **数据分析师** 就可以去写些 Hive SQL，或者简单的
 MapReduce 程序来生产各种 BI 报表等。

然而，在构建一套分层和组件化的数据仓库时，是需要较强的软件工程机制来保障各个组件的可靠性的，
包括但不限于

1. 对数据源的实时或非实时的 ETL 清洗处理
2. 需要便捷地查看各个环节生产的数据
3. 任务调度应该拥有较强的容错性，并可被监控
4. 数据在各个环节的正确性
5. 元数据的管理
6. 各技术和业务系统的稳定性监控

，等等。

既然挑战这么多，那么是不是已经有现成软件方案了呢？

1. 最好是经济型的，不需要向厂商支付高额的软件费用。
2. 最好是提供一些概念上理解起来非常简单的模版，但填充的内容还是原来自己熟悉的一套东西。

<hr>

## Luiti 预备基础知识
1. 了解 Python 中面向对象和程序包的基本概念及其使用。
2. 了解 MapReduce 概念，并在 Hadoop 或 MongoDB 中使用过。

<hr>

## Luiti 视频介绍

1. 如何整合数据仓库和软件架构。
2. Python 函数式的威力。
3. Luiti 在最易懂的文件和包的层次上去抽象。
4. Luiti 具体功能和结构介绍。

<!--
<script async class="speakerdeck-embed" data-id="897cea509e0f4fc4a8999f7d3f83b3db" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
-->
<div class="luiti_pdf_video row-fluid" style="min-width:1000px;margin-left:-80px;">
  <div class="span6" style="float:left;margin-right:20px;">
    <iframe src = "/public/viewerjs-0.5.8/ViewerJS/#/public/pdfs/Luiti - An Offline Task Management Framework.pdf" width='500' height='450' allowfullscreen webkitallowfullscreen></iframe>
    <div class="comment">
      PDF 显示过慢提示: 由于 <a href="http://speakerdeck.com/mvj3/luiti-an-offline-task-management-framework">speakerdeck.com</a> 被墙，因此用了 ViewerJS 来手工渲染，缺点是得把 5 MB 多的 PDF 下载完成后才能看到。嫌慢的同学可以直接点击右上角的按钮去直接下载 PDF 即可。
    </div>
  </div>
  <div class="span6">
    <iframe height=450 width=480 src="//player.youku.com/embed/XMTI5MjE1MTA4NA==" frameborder=0 allowfullscreen></iframe>
    <div class="comment" style="position:absolute;margin-left:520px;">
    演讲视频是由 <a href="http://bbs.pinggu.org/thread-3815359-1-1.html">Python沙龙深度交流会-第二十期CDA俱乐部活动</a> 录制的，特此感谢。
    </div>
  </div>
</div>

<div class="row-fluid" style="min-width:1000px;margin-left:-80px;">
  <div class="span6" style="float:left;margin-right:20px;">
  </div>
</div>


<style>
h2 {
  text-align: center;
}
.luiti_pdf_video .span6 {
  height: 550px;
}
.luiti_pdf_video .span6 .comment {
  width: 500px;
}

</style>
