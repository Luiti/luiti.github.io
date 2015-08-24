---
layout: default
title: Home
---

{{ site.chinese_article.description }}

{{ site.chinese_article.articles_list | jsonify }}

<script>
  $(document).ready(function() {
    var sidebar = $(".sidebar .sidebar-nav");

    // Remove root links
    sidebar.html("");

    var sidebar_nav_item_template = _.template(""
      + "<a class='sidebar-nav-item' href='<%= link %>'><%= name %></a"
    );

    sidebar.html(
    );

  });
</script>
