---
layout: chinese_luiti
title: 使用 Luiti 作为构建数据仓库的软件框架
---

# {{ page.title }}
> {{ site.chinese_article.description }}



## Luiti 在数据仓库开发程序中的位置

先上一个常规软件开发中的层次图：


<p align="center">
  <img src="/images/luiti_context_abstract_machine.png" alt="Luiti Context Abstract Machine" height="360px" width="480px">
</p>


从代码组织的上下文来讲，大概分为 function，object，class，package 四个从局部到整体的抽象层次。

1. function 是最基本的程序单元复用的方式，也是程序递归的本质。
2. object 在 function 上面增加了按概念实体思考的图像化方式，强调概念之间的相互关系。
3. class 是用来面对众多事物时的树形分类方式，object 也是 class 的实例化形式。
4. package 从本质上把程序的出发点从逻辑关系切换到需求服务，也即是人类沟通的方式，
   让软件的模块和构建范式得以共享。

[Luigi][1] 是一个 module ，除了在 class 层面上实现的约定外，其功用在于被调用。
而 Luiti 则是一个 framework，从文件目录和命名等外部组织方式上做了强制约束（
虽然内部属性可以被灵活扩展），业务代码必须被放置在固定的位置以备调用。在这一约定下，
一个报表项目，数据分层，业务分块，等都可以被封装到一个相对当时静态的 package 里去。
数据的稳定性在于这个 package 的软件质量和健壮性。从而我们可以建立起一套灵活的流程来保证公司数据良好生产的职能。

再看截图的右边是一系列函数与数据相互映射的机器，它们各自拥有不同的抽象程度，区分如下：

1. `@property` 是每次调用均会重新计算的，即是没有缓存的。
2. `@cached_property` 在第一次计算后，下次访问就会命中缓存的，特点是重启 Python 进程后就丢失了。
3. `luigi.Task` 的输出文件地址是必须要被手工定义的，同一 Task 的同一参数计算后，
  （通常）会缓存结果数据到持久化的磁盘设备上，下次启动 Python 去执行该代码，是可以重新利用这段缓存磁盘数据的。
4. `luiti.TaskBase` 相对 `luigi.Task` 来说更加易用一点，不强制配置路径，
  因为 luiti 默认会根据任务名称和日期自动推荐一个文件输出地址的。

因此，Luiti 让你更专注于 **业务的逻辑**，而不用太去具体关心数据的存放位置和缓存等非必要的技术细节。
在 Luiti [可视化][2] 里也可以看到， 正是这种约定配置的机制，我们可以很方便的把 **处理数据的代码** 本身也当作
**元数据** 来管理起来，在网页里直接导航数据仓库里的数据地址。

注明: 如果不理解 `@property` 或者 `@cached_property` 具体作用，请移步
[《使用 DAG 来解耦 数据处理中的复杂逻辑》][0] 。


## 数据仓库的设计与实现



## Luiti 代码例子


## Luiti 命令行


## Luiti 的扩展性




[0]: /chinese/Processing-data-in-a-DAG-way.html
[1]: https://github.com/spotify/luigi
[2]: /chinese/Use-Validata-to-protect-the-correctness-of-the-data-flow.html
