---
layout: default
title: Tarot LLM
description: An obscure tarot reading bot powered by LLMs and symbolism.
date: 2025-10-01
status: Active
tags: [LLM, Python, Discord Bot, NLP]
repo_url: https://github.com/williamQ96/tarot-llm
demo_url: #
---

# Tarot LLM

![Banner Image](https://via.placeholder.com/800x300)

**An AI-powered mystic that reads your fortune.**

## Summary
A Discord bot that generates Tarot readings using a fine-tuned LLM, interpreting card combinations with consistent mystical persona.

## Why
To explore **steerability** in LLMs—can we force a model to stay "in character" (mystical, enigmatic) while providing coherent interpretations of randomized inputs (card draws)?

## What & How
- **Tech Stack**: Python, Discord.py, HuggingFace Transformers (Llama-3-8B).
- **Architecture**:
    - **Card Drawer**: Randomly selects 3 cards (Past, Present, Future).
    - **Prompt Engineer**: Constructs a prompt with card meanings and persona instructions.
    - **Inference**: Generates the reading.
- **Challenges**: Preventing the model from breaking character or giving generic advice.

## Status
Active development. Working on adding visual generation (Stable Diffusion) for custom card art.

[Link to Code]({{ page.repo_url }})
