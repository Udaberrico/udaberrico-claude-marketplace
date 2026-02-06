import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GlitchTipClient } from "./client.js";

const server = new McpServer({
  name: "glitchtip",
  version: "1.0.0",
});

const client = new GlitchTipClient();

server.tool(
  "glitchtip_list_projects",
  "List all projects in the GlitchTip organization",
  async () => {
    const projects = await client.listProjects();
    return {
      content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    };
  }
);

server.tool(
  "glitchtip_list_issues",
  "List issues from GlitchTip. Returns unresolved issues by default.",
  {
    projectId: z
      .number()
      .optional()
      .describe("Filter issues by project ID"),
    query: z
      .string()
      .optional()
      .describe("Search query to filter issues"),
  },
  async ({ projectId, query }) => {
    const issues = await client.listIssues(projectId, query);
    return {
      content: [{ type: "text", text: JSON.stringify(issues, null, 2) }],
    };
  }
);

server.tool(
  "glitchtip_get_event",
  "Get the latest event for an issue, including the full stack trace",
  {
    issueId: z.string().describe("The issue ID to get the latest event for"),
  },
  async ({ issueId }) => {
    const event = await client.getLatestEvent(issueId);
    return {
      content: [{ type: "text", text: JSON.stringify(event, null, 2) }],
    };
  }
);

server.tool(
  "glitchtip_resolve_issue",
  "Mark a GlitchTip issue as resolved. This is a destructive action — confirm with the user before calling.",
  {
    issueId: z.string().describe("The issue ID to resolve"),
  },
  async ({ issueId }) => {
    const result = await client.updateIssueStatus(issueId, "resolved");
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

server.tool(
  "glitchtip_ignore_issue",
  "Mark a GlitchTip issue as ignored. This is a destructive action — confirm with the user before calling.",
  {
    issueId: z.string().describe("The issue ID to ignore"),
  },
  async ({ issueId }) => {
    const result = await client.updateIssueStatus(issueId, "ignored");
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
