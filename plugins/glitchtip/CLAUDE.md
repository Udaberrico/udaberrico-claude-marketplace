# GlitchTip Plugin

You have access to GlitchTip error monitoring through five MCP tools:

- **`glitchtip_list_projects`** — List all projects in the organization (no parameters)
- **`glitchtip_list_issues`** — List issues, optionally filtered by `projectId` and/or `query` (unresolved by default)
- **`glitchtip_get_event`** — Get the latest event for a specific issue including full stack trace (requires `issueId`)
- **`glitchtip_resolve_issue`** — Mark an issue as resolved (requires `issueId`)
- **`glitchtip_ignore_issue`** — Mark an issue as ignored (requires `issueId`)

## When to use GlitchTip

When the user mentions errors, bugs, exceptions, crashes, or production issues — proactively call `glitchtip_list_issues` to check if there are relevant unresolved errors. Don't wait to be asked explicitly.

## Project selection

When the context is unclear, call `glitchtip_list_projects` first to see which projects exist, then ask the user which one to look at. If you can infer the project from the current codebase (e.g. from `composer.json` name, a Sentry/GlitchTip DSN in `.env`, or the folder name), use that to filter issues by `projectId`.

## How to work with GlitchTip data

- **Event count** indicates how frequently an error occurs. High counts mean widespread impact.
- **First seen / last seen** timestamps help determine if an issue is new or recurring.
- **Always fetch the latest event** before suggesting a fix. The stack trace and event context are essential for accurate diagnosis — issue titles alone are not enough.

## Connecting errors to the codebase

After fetching a stack trace, search the current project's codebase for the files and line numbers referenced in the trace. Read the relevant code to understand context before suggesting fixes.

## Destructive actions

**`glitchtip_resolve_issue`** and **`glitchtip_ignore_issue`** change issue state in GlitchTip. Always confirm with the user before calling these tools.
