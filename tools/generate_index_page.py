#!/usr/bin/env python
# -*-coding:utf-8-*-

from os.path import expanduser
home = expanduser("~")

orig_content = file(home + "/github/luiti/luiti/README.markdown").read()
layout_content = """
---
layout: default
title: Home
---


"""

appended = """
<script src="{{ "/javascripts/fix_luiti_index_document.js" | prepend: site.baseurl }}" type="text/javascript"></script>
"""

new_content = (layout_content + orig_content + appended).strip()
new_file = file("document_guide.markdown", "w")
new_file.write(new_content)
new_file.close()
