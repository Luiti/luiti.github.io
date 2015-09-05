---
layout: chinese_luiti
title: Luigi 的核心概念
---

# {{ page.title }}
> {{ site.chinese_article.description }}

说明: 以下文档基本翻译自 Luigi 官方 Github  的 [README][0] ，以及 [官方文档主页][11] 。当前文档更新时间为 20150905 ，更多请访问 [https://github.com/spotify/luigi][0] 。
<hr>

## Luigi 是什么？

按照 [官方介绍][0] 的定义是，Luigi 是一个用来帮助你构建基于复杂管道的批处理任务。
它的功能包括 依赖处理，工作流管理，可视化，等等。它同时也内建支持 Hadoop 。

<p class="hidden">
Luigi is a Python module that helps you build complex pipelines of batch jobs. It handles dependency resolution, workflow management, visualization etc. It also comes with Hadoop support built in.
</p>


## Luigi 的 [更多背景][1]

Luigi 的目的是在于把长时间运行的批处理任务通过管道机制关联起来。通常你会串接很多
任务，自动化它们，然后也肯定会发生各种错误。这些任务可以是任何内容，但是通常是一些
像 Hadoop 任务这样长时间运行的，导入或导出数据到数据库，跑一些机器学习算法，或者
其他东西。

<p class="hidden">
The purpose of Luigi is to address all the plumbing typically associated with long-running batch processes. You want to chain many tasks, automate them, and failures will happen. These tasks can be anything, but are typically long running things like Hadoop jobs, dumping data to/from databases, running machine learning algorithms, or anything else.
</p>

业界同时也存在其他专注于数据处理的某些底层侧面的的软件包，比如 Hive，Pig，或者
Cascading 。Luigi 不是一个用来替换这些的框架，而是辅助你把许多任务粘合到一起，
这些任务可以是一个 Hive 查询，一个用 Java 写的 Hadoop 任务，一个用 Scala 或者
Python 片段代码写的 Spark 任务，从数据库里导出一个表，或者其他。用 Luigi 很容易
去构建长时间运行的任务管道，其数量可达上千个，运行时间超过天和周去完成。Luigi
已经处理好了大量的工作流管理，这样你可以专注在任务自身和它们的依赖关系上。

<p class="hidden">
There are other software packages that focus on lower level aspects of data processing, like Hive, Pig, or Cascading. Luigi is not a framework to replace these. Instead it helps you stitch many tasks together, where each task can be a Hive query, a Hadoop job in Java, a Spark job in Scala or Python a Python snippet, dumping a table from a database, or anything else. It's easy to build up long-running pipelines that comprise thousands of tasks and take days or weeks to complete. Luigi takes care of a lot of the workflow management so that you can focus on the tasks themselves and their dependencies.
</p>

你可以用你想要的方式去构建各种任务，但是 Luigi 也自带了包含很多你常用的任务模版
的工具箱。它包括支持在 Hadoop 里运行 Python 编写的 MapReduce 任务，以及还有 Hive
和 Pig 等。它也自带支持 HDFS 和 本地文件的文件系统抽象，用来确保文件系统操作是
原子的。这是很重要的，因为这意味着你的数据管道不会因为其中一个状态只包括了部分数据
而导致崩溃。

<p class="hidden">
You can build pretty much any task you want, but Luigi also comes with a toolbox of several common task templates that you use. It includes support for running Python mapreduce jobs in Hadoop, as well as Hive, and Pig, jobs. It also comes with file system abstractions for HDFS, and local files that ensures all file system operations are atomic. This is important because it means your data pipeline will not crash in a state containing partial data.
</p>


## Luigi 的 [任务依赖图例子][2]

只是想为了给你大概了解 Luigi 到底是做什么的，这里选取了一张我们生产环境里跑的任务的截图。
通过使用 Luigi 的可视化，我们得到了一个漂亮的可视化概览，展现了当前工作流里的整个任务
依赖图。每个节点都表示要被运行的任务。绿色任务表示已经完成了，相对应的是黄色任务表示还未
运行。大部分任务都是 Hadoop 任务，但是有些也是跑在本地的，并且也构建了数据文件。

<p class="hidden">
Just to give you an idea of what Luigi does, this is a screen shot from something we are running in production. Using Luigi's visualizer, we get a nice visual overview of the dependency graph of the workflow. Each node represents a task which has to be run. Green tasks are already completed whereas yellow tasks are yet to be run. Most of these tasks are Hadoop jobs, but there are also some things that run locally and build up data files.
</p>

![user rec][3]


## Luigi 的 [诞生背景][3]

我们在 [Spotify][4] 内部使用 Luigi 来每天跑数以千计的任务，它们被组织在复杂的依赖图里。
大部分任务都是 Hadoop 任务。Luigi 提供了一种架构，支撑着像 推荐，排行榜，A/B 测试分析
外部报表，和内部仪表盘等各种任务。Luigi 起源于需要为批处理提供一个强有力的抽象，从而帮助
程序员专注于最重要的点上面，而把剩下的（就是模版）都交给框架去处理。

<p class="hidden">
We use Luigi internally at `Spotify <https://www.spotify.com/us/>`_ to run
thousands of tasks every day, organized in complex dependency graphs.
Most of these tasks are Hadoop jobs. Luigi provides an infrastructure
that powers all kinds of stuff including recommendations, toplists, A/B
test analysis, external reports, internal dashboards, etc. Luigi grew
out of the realization that powerful abstractions for batch processing
can help programmers focus on the most important bits and leave the rest
(the boilerplate) to the framework.
</p>

从概念上讲，Luigi 类似于 [GNU Make][5]，比如你有一些任务，而这些任务又依赖其他任务。
这个也和 [Oozie][6] 和 [Azkaban][7] 有些相像。一个显著的不同在于，Luigi 不是只为了
Hadoop 而构建的，它也很容易扩展到其他类型的任务。

<p class="hidden">
Conceptually, Luigi is similar to `GNU
Make <http://www.gnu.org/software/make/>`_ where you have certain tasks
and these tasks in turn may have dependencies on other tasks. There are
also some similarities to `Oozie <http://oozie.apache.org/>`_
and `Azkaban <http://data.linkedin.com/opensource/azkaban>`_. One major
difference is that Luigi is not just built specifically for Hadoop, and
it's easy to extend it with other kinds of tasks.
</p>

在 Luigi 里任何东西都是 Python 。它没有采用 XML 配置或者类似的外部数据文件，
而是直接在 Python 里指定依赖图。这样就非常简单去构建起复杂的任务依赖图，
比如涉及到时间代数或者递归引用到当前任务的其他版本（这个正是 Luiti 存在的目的，
译者注）。不管怎样，工作流触发的东西不只是 Python 里的，还包括比如 [Pig][8] 脚本，
或者 [scp][9] 之类。


<p class="hidden">
Everything in Luigi is in Python. Instead of XML configuration or
similar external data files, the dependency graph is specified *within
Python*. This makes it easy to build up complex dependency graphs of
tasks, where the dependencies can involve date algebra or recursive
references to other versions of the same task. However, the workflow can
trigger things not in Python, such as running
`Pig scripts <http://luigi.readthedocs.org/en/latest/api/luigi.contrib.pig.html>`_
or `scp'ing files <http://luigi.readthedocs.org/en/latest/api/luigi.contrib.ssh.html>`_.
</p>


## 谁在[使用 Luigi][10] ？

以下这些公司写了关于 Luigi 相关的博客或演讲稿：

* [Spotify (NYC Data Science)](http://www.slideshare.net/erikbern/luigi-presentation-nyc-data-science)
* [Foursquare](http://www.slideshare.net/OpenAnayticsMeetup/luigi-presentation-17-23199897)
* [Mortar Data](http://help.mortardata.com/technologies/luigi)
* [Stripe](http://www.slideshare.net/PyData/python-as-part-of-a-production-machine-learning-stack-by-michael-manapat-pydata-sv-2014)
* [Asana](https://eng.asana.com/2014/11/stable-accessible-data-infrastructure-startup/)
* [Buffer](https://overflow.bufferapp.com/2014/10/31/buffers-new-data-architecture/)
* [SeatGeek](http://chairnerd.seatgeek.com/building-out-the-seatgeek-data-pipeline/)
* [Treasure Data](http://blog.treasuredata.com/blog/2015/02/25/managing-the-data-pipeline-with-git-luigi/)
* [Growth Intelligence](http://www.slideshare.net/growthintel/a-beginners-guide-to-building-data-pipelines-with-luigi)


## 一个 Luigi 的示例 --- 艺术家排行榜

请访问 Luigi 官方文档 [http://luigi.readthedocs.org/en/latest/example\_top\_artists.html][12] ，里面包括了如下四个部分：

1. 使用 Luigi 模式来编写 Python 代码
2. 在本地运行这份代码
3. 改成 Hadoop 的写法
4. 使用 Luigid 后台调度器。


## 到最后还是没有看懂什么是 Luigi ？

如果想要真正地用好 Luigi ，你还是大概得知道它是怎么回事的。简单的说就是以下五个部分：

1. 文件系统抽象，即是数据的抽象。写操作是原子性的，原理是先写到临时文件目录，成功了再改写成正确的路径（记住这是瞬间完成的）。
2. Task 类，即是执行逻辑的抽象。可以传入不同的参数，可能没有数据输入，但是输出一定存在，Luigi 就是依靠这个机制来避免不会重复运行的。
3. Luigid 后台进程调度器。所有事情全都是由它驱动执行，包括分析任务依赖，执行顺序，分配 worker，保证唯一性等。外部唯一需要做的就是提交 Python 代码和参数给它即可。
4. Luigid worker。由 luigid 进程来管理。
5. Luigid 可视化。直接在网页展现 Luigid 后台进行的内部运行状态。



[0]: https://github.com/spotify/luigi
[1]: https://github.com/spotify/luigi#more-background
[2]: https://github.com/spotify/luigi#dependency-graph-example
[3]: https://raw.githubusercontent.com/spotify/luigi/master/doc/user_recs.png
[4]: https://www.spotify.com/us/
[5]: http://www.gnu.org/software/make/
[6]: http://oozie.apache.org/
[7]: http://data.linkedin.com/opensource/azkaban
[8]: http://luigi.readthedocs.org/en/latest/api/luigi.contrib.pig.html
[9]: http://luigi.readthedocs.org/en/latest/api/luigi.contrib.ssh.html
[10]: https://github.com/spotify/luigi#who-uses-luigi
[11]: http://luigi.readthedocs.org/en/latest/
[12]: http://luigi.readthedocs.org/en/latest/example_top_artists.html
