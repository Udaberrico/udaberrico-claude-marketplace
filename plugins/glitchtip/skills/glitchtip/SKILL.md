---
name: glitchtip
description: |
  GlitchTip error triage workflow. Use when the user says "/glitchtip", "check errors",
  "triage issues", "what's broken", or wants to investigate production errors and exceptions.
  Fetches unresolved issues, summarizes them, and walks through root cause analysis with full stack traces.
---

# GlitchTip Error Triage

## Workflow

### Step 1: Fetch all unresolved issues

Call `glitchtip_issues` to get all unresolved issues from GlitchTip.

### Step 2: Summarize

Present a summary:
- Total number of unresolved issues
- Group by error type or pattern if possible
- Highlight issues with the highest event count (most frequent)
- Note any issues that appeared recently

Format as a concise table with columns: ID, Title, Event Count, First Seen, Last Seen.

### Step 3: Ask which issue to investigate

Ask the user which issue they want to dig into. If there's an obvious high-priority issue (very high event count or very recent), suggest it.

### Step 4: Fetch the latest event

Call `glitchtip_latest_event` with the selected `issueId` to get the full stack trace and event details.

### Step 5: Analyze and suggest a fix

- Parse the stack trace and identify the root cause
- Search the current project's codebase for the relevant file and line number
- Read the surrounding code to understand context
- Explain what's going wrong and suggest a concrete fix
- If the fix is straightforward, offer to implement it
