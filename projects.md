---
layout: default
title: Projects
permalink: /projects/
---

# Projects

Here is a collection of my work, ranging from academic research to game jams and creative coding experiments.

<div class="project-list">
  {% assign projects = site.projects | sort: 'date' | reverse %}
  {% for project in projects %}
    <div class="project-card">
      <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
      <p>
        <span style="color: var(--accent-color)">Status: {{ project.status }}</span> | 
        Developed: {{ project.date | date: "%Y" }}
      </p>
      <p>{{ project.description }}</p>
      <p><small>Tags: {{ project.tags | join: ', ' }}</small></p>
      <a href="{{ project.url | relative_url }}" class="button small">View Details</a>
    </div>
  {% endfor %}
</div>
