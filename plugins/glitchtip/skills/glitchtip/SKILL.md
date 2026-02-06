---
name: glitchtip
description: |
  GlitchTip error triage workflow. Use when the user says "/glitchtip", "check errors",
  "triage issues", "what's broken", or wants to investigate production errors and exceptions.
  Fetches unresolved issues, summarizes them, and walks through root cause analysis with full stack traces.
---

# GlitchTip Error Triage

## Workflow

### Step 1: Determine the project

Call `glitchtip_list_projects` to get all projects. If the current codebase can be matched to a project (check `composer.json`, `.env` for a Sentry/GlitchTip DSN, or folder name), use that project's ID automatically. Otherwise, ask the user which project to investigate.

### Step 2: Fetch issues for the project

Call `glitchtip_list_issues` with the selected `projectId` to get unresolved issues for that project.

### Step 3: Summarize

Present a summary:
- Total number of unresolved issues
- Group by error type or pattern if possible
- Highlight issues with the highest event count (most frequent)
- Note any issues that appeared recently

Format as a concise table with columns: ID, Title, Event Count, First Seen, Last Seen.

### Step 4: Ask which issue to investigate

Ask the user which issue they want to dig into. If there's an obvious high-priority issue (very high event count or very recent), suggest it.

### Step 5: Fetch the latest event

Call `glitchtip_get_event` with the selected `issueId` to get the full stack trace and event details.

### Step 6: Analyze and suggest a fix

- Parse the stack trace and identify the root cause
- Search the current project's codebase for the relevant file and line number
- Read the surrounding code to understand context
- Explain what's going wrong and suggest a concrete fix
- If the fix is straightforward, offer to implement it

### Step 7: Offer to resolve or ignore

After a fix has been applied (or if the user decides the issue is not actionable), ask if they want to:
- **Resolve** the issue (`glitchtip_resolve_issue`)
- **Ignore** the issue (`glitchtip_ignore_issue`)
- **Skip** and move to the next issue
