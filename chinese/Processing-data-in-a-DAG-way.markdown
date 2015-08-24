---
layout: default
title: 使用 DAG 来解耦 数据处理中的复杂逻辑
---

# 使用 DAG 来解耦 数据处理中的复杂逻辑

> {{ site.chinese_article.description }}


## 1. DAG 术语解读
DAG 的全称是 **[Directed acyclic graph][1]** ，中文名字是
**有向无环图**。先来一个维基百科上的示意图:

![Directed acyclic graph][2]

从上图我们可以知道 总共有 11 个非孤立的顶点(Vertex), 每个顶点都至少有一条边(Edge)，
每个边都是单方向的。并且从任意一个顶点出发后，经过若干顶点，都不能重新回到最初的
那个顶点。由此我们可以推理出以下信息:

1. 所有顶点都被标记上了序号。这意味着我们对具体指代事件做了一层抽象，
  不必具体去关心每个顶点里的内容是什么，而只需去关心它们的相互关系。

2. 边都是单向的。这意味着没有死循环了，也即是只要每个任务在规定的时间内可以
  完成，那么这整个图(Graph)的全部事件也是可以在规定时间内完成的。

总结一下，就 DAG 的直观意义来讲，任何一个只要上过小学数学的人都是完全可以在短时间内
明白的。我们在接下来会看到 DAG 的 **节点抽象** 和 **有序性** 是如何映射到我们的日常 Python 编程中的。

## 2. 数据处理中的复杂逻辑

在一种解耦复杂数据处理的革命性方案




[1]: https://en.wikipedia.org/wiki/Directed_acyclic_graph
[2]: https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Directed_acyclic_graph_3.svg/356px-Directed_acyclic_graph_3.svg.png
