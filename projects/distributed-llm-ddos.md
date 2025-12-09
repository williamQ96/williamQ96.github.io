---
layout: default
title: Distributed LLM DDoS Sim
description: Simulating DDoS attacks on distributed inference systems.
date: 2025-08-15
status: Completed
tags: [Distributed Systems, Security, LLM, Research]
repo_url: https://github.com/williamQ96/distributed-llm-ddos
---

# Distributed LLM DDoS Simulation

**Stress-testing the fragility of decentralized AI grids.**

## Summary
A simulation framework to analyze how distributed inference clusters behave under adversarial load (DDoS).

## Why
As we move towards decentralized AI (e.g., Petals), resilience against malicious node usage or request flooding is critical.

## What & How
- **Tech Stack**: Rust, Python, Ray.
- **Results**: Identified a bottleneck in the request routing layer that could be exploited to stall the entire cluster with minimal throughput.

## Status
Completed. Paper submitted.

[Link to Code]({{ page.repo_url }})
