# GlitchTip Plugin

You have access to GlitchTip error monitoring through two MCP tools:

- **`glitchtip_issues`** — Fetch all unresolved issues (no parameters)
- **`glitchtip_latest_event`** — Get the latest event for a specific issue (requires `issueId`)

## When to use GlitchTip

When the user mentions errors, bugs, exceptions, crashes, or production issues — proactively call `glitchtip_issues` to check if there are relevant unresolved errors. Don't wait to be asked explicitly.

## How to work with GlitchTip data

- **Event count** indicates how frequently an error occurs. High counts mean widespread impact.
- **First seen / last seen** timestamps help determine if an issue is new or recurring.
- **Always fetch the latest event** before suggesting a fix. The stack trace and event context are essential for accurate diagnosis — issue titles alone are not enough.

## Connecting errors to the codebase

After fetching a stack trace, search the current project's codebase for the files and line numbers referenced in the trace. Read the relevant code to understand context before suggesting fixes.
