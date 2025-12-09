---
layout: default
title: Tuning Rewards for ProtoLingua
date: 2025-12-09
project: ProtoLingua RL
tags: [RL, Tuning]
---

# The Alignment Problem (Tiny Version)

My agents are cheating.

In the Gridworld environment, I rewarded them for "meeting" at a specific coordinate. Instead of signaling (e.g., oscillating left/right) to communicate the target, they just both ran to the center every time.

## The Fix
I introduced a penalty for moving to the wrong sector unless "called" by the other agent.

```python
if agent_A.is_in_correct_sector and not agent_B.signaled:
    reward -= 1.0 # Don't guess!
```

Now they *have* to talk. Watching the loss curve creates a lot of anxiety. It determines if they learn language or just give up and stand still.
