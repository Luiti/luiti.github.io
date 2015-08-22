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

new_content = (layout_content + orig_content).strip()
new_file = file("index.markdown", "w")
new_file.write(new_content)
new_file.close()
