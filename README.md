# GlitchTip Plugin for Claude Code

A [Claude Code](https://docs.anthropic.com/en/docs/claude-code) plugin that integrates [GlitchTip](https://glitchtip.com) error monitoring. Based on [mcp-glitchtip](https://github.com/coffebar/mcp-glitchtip).

Fetch and analyze issues, stack traces, and error context directly from your GlitchTip instance within Claude Code.

## Installation

```
/install-plugin yourusername/claude-glitchtip
```

## Setup

Set the following environment variables in your shell (e.g. `~/.zshrc` or `~/.bashrc`):

```bash
export GLITCHTIP_TOKEN="your-api-token"
export GLITCHTIP_ORGANIZATION="your-org-slug"
export GLITCHTIP_BASE_URL="https://your-glitchtip-instance.com"
```

### Getting your API token

1. Log in to your GlitchTip instance
2. Navigate to **Profile > Auth Tokens** (`/profile/auth-tokens`)
3. Generate a new token

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `GLITCHTIP_TOKEN` | Yes | API token for authentication |
| `GLITCHTIP_ORGANIZATION` | Yes | Your organization slug |
| `GLITCHTIP_BASE_URL` | No | Your GlitchTip instance URL (defaults to `https://app.glitchtip.com`) |

## Available tools

| Tool | Description |
|---|---|
| `glitchtip_issues` | Fetch all issues (defaults to unresolved) |
| `glitchtip_latest_event` | Get the latest event for a specific issue with full error context (stack traces, breadcrumbs, user data) |

## Usage examples

- "Show me all unresolved GlitchTip errors"
- "What's the latest error in GlitchTip?"
- "Get the stack trace for GlitchTip issue 42"

## License

MIT
