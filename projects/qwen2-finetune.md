---
layout: default
title: Qwen2-7B Finetune
description: Finetuning Qwen2 for constrained JSON output.
date: 2024-02-01
status: Completed
tags: [LLM, Fine-tuning, NLP]
repo_url: https://github.com/williamQ96/qwen2-finetune
---

# Qwen2 JSON Specialist

**Turning a generalist model into a structured data machine.**

## Summary
Finetuned Qwen2-7B on a synthetic dataset of complex JSON schema enforcement tasks.

## Why
Reliable JSON extraction is crucial for agentic workflows.

## Results
- **Accuracy**: 98% validity on complex nested JSON generation (vs 85% base model).
- **Method**: LoRA, 4-bit quantization.

[Link to Code]({{ page.repo_url }})
