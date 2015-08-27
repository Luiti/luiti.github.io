---
layout: chinese_luiti
title: 使用 DAG 来解耦 数据处理中的复杂逻辑
---

# {{ page.title }}
> {{ site.chinese_article.description }}


## 谁在遭遇大数据？

在一般互联网公司中，负责数据分析或 BI 报表等职责的人里最多的是
数据分析师。TA 们擅长的专业技能是用 SQL 去做各种复杂的数据统计分析，并会稍微掌握
一门脚本语言 (通常是 Python) 来做些 [ETL][4] 和 SQL 整合的工作。
TA 们的劣势在于没有较强的软件工程背景，加上工作内容很大一部分都是一次性的，
会导致 TA 们很少去注重代码的 **通用性** 和 **可维护性**。于是便越来越停留
在各种重复性工作上，生产数据的效率跟不上公司业务的快速发展。

另外还有一类人是没太多工作经验的数据仓库工程师，TA 们需要一套三两天就可以上手
的软件框架，来快速和稳定地生产数据，以提供报表数据给公司里的其他后端技术部门来使用。


## 难以维护的 Python 代码是怎样的？

让我们来看看现实中的一个场景，一个没有多少代码能力的人是很容易写出难以维护的 **面向过程** 代码的。
代码复用性很差，基本得靠粘贴复制。比如以下的：

```python
def run():
    """ Compute data Line by line in old style. """
    val_1 = Node(value=1).compute()
    val_2 = Node(value=2).compute()
    val_3 = Node(value=3, other_node=val_2).compute()
    val_4 = Node(value=4, other_node=[val_1, val_3]).compute()
    return val_4

if __name__ == '__main__':
    run()
```

上面我做了一些省略，把一些具体细节都替换为抽象的 Node().compute() 了，大家可以脑补为，
比如编程语言本身上的繁琐，业务代码，第三方库的 API 使用代码 杂乱在一起，我想大家在刚开始写
C 或 Java 代码时最有感触了。

这样还不够，因为通常需求是会改变的，那么部分代码被迫得跟着改变， 写到最后，代码已经
完全面目全非了。如果其他人要接手代码，基本是推到重来，沟通的时候通常只能说这么一句，
“首先把输入输出告诉我，再是具体的白板算法逻辑”。

在开始利用 Python 里的函数式特性来重构这段代码前，我们先来理解图论里的一个简单概念。

## DAG 术语解读
DAG (读作 /ˈdæɡ/) 的全称是 **[Directed acyclic graph][1]** ，中文名字是 **有向无环图**。先来一个
维基百科上的示意图:

![Directed acyclic graph][2]

从上图我们可以知道 总共有 11 个非孤立的顶点(Vertex), 每个顶点都至少有一条边(Edge)，
每个边都是单方向的。并且从任意一个顶点出发后，经过若干顶点，都不能重新回到最初的
那个顶点。由此我们可以推理出以下信息:

1. 所有顶点都被标记上了序号。这意味着我们对具体指代事件做了一层抽象，
  不必具体去关心每个顶点里的内容是什么，而只需去关心它们的 **相互关系** 。

2. 边都是单向的。这意味着没有死循环了，也即是只要每个任务在一定的时间内可以
  完成，那么这整个图(Graph)的全部事件也是可以 **在一定时间内完成** 的。

总结一下，就 DAG 的直观意义来讲，任何一个只要上过小学数学的人都是完全可以在短时间内
明白的。我们在接下来会看到 DAG 的 **节点抽象** 和 **有序性** 是如何映射到我们的日常 Python 编程中的。

## Python 的函数式特性 - 装饰器

在流行的面向对象编程语言里，比如 Java, Python, Ruby 等，你封装了一个包含若干数据和行为的 Class ，
然后基于该 Class 实例化出一个 instance ，在之后过程中，你是需要对该 instance 里的数据，通常叫做 属性
或 变量，来进行一些访问，修改，或删除操作。基于这套需求的模式，在 Python 里有这样的解决方案：

```python
class C(object):
    def __init__(self):
        self._x = None

    def getx(self):
        return self._x

    def setx(self, value):
        self._x = value

    def delx(self):
        del self._x

    x = property(getx, setx, delx, "I'm the 'x' property.")

# https://docs.python.org/2/library/functions.html#property
```

即是在定义的 C Class 里有一个 _x (以下划线开头命名的变量通常约定为隐私内部变量，不提供对外访问），
它要被 getx, setx, delx 三个函数来操作，在最后又被赋值给一个 C 的属性叫做 x ，在 Python 里的术语叫做
property 。让我们来简单试用一下：

```python
>>> c = C()
>>> c.x = 42
>>> c.x
42
>>> c.x == c._x
True
>>> del c.x
>>> c.x
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "c.py", line 6, in getx
    return self._x
AttributeError: 'C' object has no attribute '_x'
```

现在我们回头去看看我们最初是如何定义 x 这个 property 的，它接受了 getx, setx, delx 这三个
函数（这里我们忽略后面一个附加的字符串参数）。这是什么意思呢，与其他一些常见编程语言不同，在 Python
里是可以直接把函数当作一个任意的对象（就像数字和字符串等一样）来使用的，比如作为参数传给其他函数，
这样就意味着可以修改其他函数的行为了。这是个非常了不起的功能，可以用来更好的组织代码，并使之清晰且精简。

当然聪明的你一定在想这样写其实还是有点繁琐的，Python 提供了一个更精简的写法，

```python
class Parrot(object):
    def __init__(self):
        self._voltage = 100000

    @property
    def voltage(self):
        """Get the current voltage."""
        return self._voltage

# https://docs.python.org/2/library/functions.html#property
```

即是把我们上面的 property 函数前加了 @ 符号，这个术语叫做装饰器（Decorator），然后把它放在我们想要修改
该函数定义的上方。我们现在可以理解为一个 property 是一个属性，一个静态的数据， 但是这个属性数据却是由一个
函数来动态生成的。

可以说，装饰器的用途在 Python 的世界里俯拾皆是，比如打印日志，性能测试，权限控制等。相关资料可以搜索 "Python 装饰器"。

## cached_property - 带缓存功能的 property

稍微有点经验的同学马上会发现 property 的一个特点，也可以说是不足之处，那就是多次调用会导致多次重复执行
该属性的同名函数。如果计算量大，特别是在数据处理里，会是非常大的消耗，如果在调用函数里赋值给一个临时变量
去用作缓存，那就和函数一个性质了，也失去了原来装饰器的想要的"第一次访问计算，第二次及以后都访问缓存”的效果了。
另外重复计算可能会带来不同结果，因为函数涉及到的变量可能会中途发生改变的。

下面列出 cached_property 的一个实现方案：

```python
class cached_property(object):
    """
    A property that is only computed once per instance and then replaces itself
    with an ordinary attribute. Deleting the attribute resets the property.
    Source: https://github.com/bottlepy/bottle/commit/fa7733e075da0d790d809aa3d2f53071897e6f76
    """  # noqa

    def __init__(self, func):
        self.__doc__ = getattr(func, '__doc__')
        self.func = func

    def __get__(self, obj, cls):
        if obj is None:
            return self
        value = obj.__dict__[self.func.__name__] = self.func(obj)
        return value

# https://github.com/pydanny/cached-property/blob/master/cached_property.py
```

大致可以了解到 `cached_property` 是一个包含两个函数的 Class 对象，一个是用于初始化以保存
func 行为的 `__init__ ` 函数，另一个是用于访问的 `__get__` 函数。观察 `__get__`
函数发现，缓存是存放在 `obj.__dict__` 这个字典里的，这个 `__dict__` 是继承了
object 基类都会有的一个字典属性（相关资料可以查看 Python 2 的 [Data model][3]）。
具体技术细节说实话我也没太看懂，但这只是 Python API 的事，本质是你替换为 `@cached_property` 就可以得到
一个缓存版的 `@property` 了。

`@property` 是 Python 语言内置的，可以直接使用。而 `@cached_property` 是第三方库提供的，不过 luiti 已经把它集成进来了，直接 import 进来即可使用。

```python
from luiti import cached_property
```

## 用 `@cached_property` 来重构代码

不难发现，其实我们在整理代码和思路的时候，本身会把代码理解成一段段过程，过程和过程之间有执行顺序和依赖关系。所以上面的代码逻辑会变成如下这样一个 DAG ：

```text
  Node 1     Node 2
    |          |
    |          |
    |          |
    |        Node 3
    |         /
    |       /
    |     /
    |   /
  Node 4
```


如果改写成 `@cached_property` 的形式就变成：

```python
class DAG(object):
    """ Computing in @cached_property style. """

    @cached_property
    def val_1(self):
        return Node(value=1).compute()

    @cached_property
    def val_2(self):
        return Node(value=2).compute()

    @cached_property
    def val_3(self):
        return Node(value=3, other_node=self.val_2).compute()

    @cached_property
    def val_4(self):
        return Node(value=4, other_node=[self.val_1, self.val_3]).compute()

    def run(self):
        return self.val_4
```

我们发现这个四个变量全变成了 **扁平式** 的写法。每个 `@cached_property`
都绑定了同名属性和函数，而其依赖逻辑全在函数里。这带来的好处是，我们以数据结构的
思维去处理依赖逻辑了，我们也可以在每个函数的 Docstring 去写当前函数返回的数据结构的文档。

现在在很大程度上已经拆分开代码了。同理，我们也可以把当前 DAG class
再拆分成更细的模块，或者和其他模块进行交互操作。这已经是软件工程上很大的一个进步了。

让我们继续来享受来自 面向对象语言里提供的 模版机制 的好处：

```python
class DAGSubclass(DAG):
    """
    Two ways to overwrite property in subclass.
    """

    @cached_property
    def val_1(self):
        return 10

    val_3 = 30
```

如上面看到的，我们既可以给 `val_1` 赋值另外一个 `@cached_property`
的函数过程，也可以直接给 `val_3` 赋值一个静态的整数数据。

写 SQL 的一大痛苦就是虽然发现了各种统计需求上的技术模式相似性，
却无法利用灵活的模块化功能去更加高效的生产和管理 SQL 代码。而 Python 这个
`@property` 机制正是满足了这一需求。


## 结束语
总结一下，利用 Python 的 Class 和 `@cached_property` 去组织我们的代码，
就既可以达到强制自己去按数据流动的思维去拆解代码，同时又获到了模块化和可维护性的好处 。

个人认为 `@cached_property` 是解耦复杂数据处理的
**革命性方案**。在接下来的文章中，我将继续为大家讲解如何自然地延伸出 Luigi 和
Luiti 两个更高层次的软件抽象。


[1]: https://en.wikipedia.org/wiki/Directed_acyclic_graph
[2]: https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Directed_acyclic_graph_3.svg/356px-Directed_acyclic_graph_3.svg.png
[3]: https://docs.python.org/2/reference/datamodel.html
[4]: https://en.wikipedia.org/wiki/Extract,_transform,_load
