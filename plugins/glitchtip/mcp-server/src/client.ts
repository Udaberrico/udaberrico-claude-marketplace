const DEFAULT_BASE_URL = "https://app.glitchtip.com";

export class GlitchTipClient {
  private baseUrl: string;
  private token: string;
  private organization: string;

  constructor() {
    this.baseUrl = (
      process.env.GLITCHTIP_BASE_URL || DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
    this.token = process.env.GLITCHTIP_TOKEN || "";
    this.organization = process.env.GLITCHTIP_ORGANIZATION || "";

    if (!this.token) {
      throw new Error("GLITCHTIP_TOKEN environment variable is required");
    }
    if (!this.organization) {
      throw new Error(
        "GLITCHTIP_ORGANIZATION environment variable is required"
      );
    }
  }

  private async request(path: string, options?: RequestInit): Promise<unknown> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `GlitchTip API error ${response.status}: ${response.statusText} - ${body}`
      );
    }

    return response.json();
  }

  async listProjects(): Promise<unknown> {
    return this.request(
      `/api/0/organizations/${this.organization}/projects/`
    );
  }

  async listIssues(projectId?: number, query?: string): Promise<unknown> {
    const params = new URLSearchParams();
    if (projectId !== undefined) {
      params.set("project", String(projectId));
    }
    if (query) {
      params.set("query", query);
    }
    const qs = params.toString();
    const path = `/api/0/organizations/${this.organization}/issues/${qs ? `?${qs}` : ""}`;
    return this.request(path);
  }

  async getLatestEvent(issueId: string): Promise<unknown> {
    return this.request(`/api/0/issues/${issueId}/events/latest/`);
  }

  async updateIssueStatus(
    issueId: string,
    status: "resolved" | "ignored"
  ): Promise<unknown> {
    const body =
      status === "ignored"
        ? { status: "ignored" }
        : { status: "resolved" };

    return this.request(`/api/0/issues/${issueId}/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }
}
