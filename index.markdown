---
layout: default
title: Home
---


<div id="luiti_luigi_logos">
  <span>
    <img src="https://raw.githubusercontent.com/Luiti/luiti.github.io/master/images/luiti/luiti_rectangle_logo.png" alt="Luiti" height="99px" width="132px">
  </span>
  <span class="text">=</span>
  <span>
    <img src="https://raw.githubusercontent.com/spotify/luigi/master/doc/luigi.png" alt="Luigi" height="90px" width="120px">
  </span>
  <span class="text"> + Time.</span>
</div>

As [Luigi](https://github.com/spotify/luigi)'s homepage said, it's "a
Python module that helps you build complex pipelines of batch jobs. It
handles dependency resolution, workflow management, visualization etc.
It also comes with Hadoop support built in."

Luiti is built on top of Luigi, separates all your tasks into **multiple
packages**, and forces **one task per one Python file**. Luiti task classes
can be managed by the `luiti` command, supported operations are ls, new,
generate, info, clean, run, and webui.

Luiti is born to build **a layered database warehouse**, corresponding to
the different packages we just mentioned. A data warehouse is consisted
of synced data sources, fact tables, dimension tables, regular or
temporary business reports.

## Luiti let you 专注业务，而不是代码组织

直接把代码变成可视化。截图。

![luiti_context_abstract_machine](/images/luiti_context_abstract_machine.png)

<style>
div#luiti_luigi_logos span {
  float: left;
  font-size: 60px;
  font-weight: bold;
  margin-top: 30px;
}
div#luiti_luigi_logos span.text {
  margin-left: 20px;
  margin-right: 20px;
}

div.content.container p {
}


hr {
  color: #f00;
  background-color: #f00;
  height: 5px;
  float: right;
}

</style>
