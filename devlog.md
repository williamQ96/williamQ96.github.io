---
layout: default
title: Devlog
permalink: /devlog/
---

# Development Log

A chronological archive of experiments, failures, and breakthroughs.

<div class="devlog-list">
  {% assign logs = site.devlog | sort: 'date' | reverse %}
  {% for log in logs %}
    <div class="devlog-entry">
      <h3><a href="{{ log.url | relative_url }}">{{ log.title }}</a></h3>
      <p class="project-meta">
        {{ log.date | date: "%Y-%m-%d" }} | Project: {{ log.project }}
      </p>
      <p>{{ log.excerpt }}</p>
      <a href="{{ log.url | relative_url }}">Read Entry</a>
    </div>
  {% endfor %}
</div>
