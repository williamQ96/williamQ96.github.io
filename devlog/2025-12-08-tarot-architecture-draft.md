---
layout: default
title: Tarot LLM Architecture Draft
date: 2025-12-08
project: Tarot LLM
tags: [Architecture, Planning]
---

# Drafting the Mystic's Brain

Today I started mapping out the architecture for the Tarot LLM. The core challenge is state management. The bot needs to remember the user's question while drawing cards, but the "interpretation" phase needs to feel like a stream-of-consciousness revelation.

## The Pipeline
1. **User Intent**: "Will I get the job?"
2. **Card Draw**: [The Fool, Ten of Swords, Ace of Cups]
3. **Prompt Construction**: Inject card meanings + Mystical Persona + Question.

I initially thought about using RAG to pull card meanings, but fine-tuning might be better for the *voice*.

## Failures
Tried to use a standard GPT-4 system prompt. It was too polite. "Here is your reading." No! I need "The mists clear..."

Next step: Curate a dataset of mystic/fortune-teller dialogue.
