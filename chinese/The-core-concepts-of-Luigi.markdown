---
layout: chinese_luiti
title: Luigi 的核心概念
---

# {{ page.title }}
> {{ site.chinese_article.description }}


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


[0]: https://github.com/spotify/luigi
[1]: https://github.com/spotify/luigi#more-background
