---
layout: default
title: Home
---

# Welcome

I am **William Qiu**, a researcher and engineer exploring the intersection of **Machine Learning**, **Game Development**, and **Interactive Storytelling**.

This site is a living lab notebook—documenting my projects, experiments, and what I learn along the way.

## Featured Projects

{% assign projects = site.projects | sort: 'date' | reverse %}
{% for project in projects limit:3 %}
<div class="project-card">
  <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
  <p>{{ project.description }}</p>
  <p class="project-meta">
    <strong>Status:</strong> {{ project.status }} <br>
    <strong>Tags:</strong> {{ project.tags | join: ', ' }}
  </p>
  <a href="{{ project.url | relative_url }}">Read More &rarr;</a>
</div>
{% endfor %}

[View All Projects]({{ '/projects/' | relative_url }})
