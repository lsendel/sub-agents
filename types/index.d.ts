// Type definitions for claude-agents

export interface Agent {
  name: string;
  description: string;
  version: string;
  author?: string;
  tags?: string[];
  requirements?: AgentRequirements;
  frontmatter?: AgentFrontmatter;
  content?: string;
  fullContent?: string;
  metadata?: AgentMetadata;
  hooks?: AgentHooks;
}

export interface AgentMetadata {
  name: string;
  description: string;
  version: string;
  author?: string;
  tags?: string[];
  requirements?: AgentRequirements;
  installedAt?: string;
  updatedAt?: string;
  scope?: 'user' | 'project';
}

export interface AgentFrontmatter {
  name: string;
  description: string;
  tools?: string;
  author?: string;
  version?: string;
  tags?: string[];
  hooks?: any;
  requirements?: any;
}

export interface AgentRequirements {
  tools?: string[];
  optionalTools?: string[];
  claudeVersion?: string;
}

export interface AgentHooks {
  postInstall?: string;
  preRemove?: string;
  [key: string]: any;
}

export interface InstalledAgent {
  version: string;
  scope: 'user' | 'project';
  installedAt: string;
  updatedAt?: string;
  enabled?: boolean;
}

export interface Config {
  installedAgents: Record<string, InstalledAgent>;
  enabledAgents: string[];
  disabledAgents: string[];
}

export interface CommandOptions {
  project?: boolean;
  all?: boolean;
  force?: boolean;
  preserveCustom?: boolean;
  installed?: boolean;
  available?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  errors?: string[];
  warnings?: string[];
}

export interface AgentDetails extends Agent {
  installed?: boolean;
  enabled?: boolean;
  scope?: 'user' | 'project';
  installedVersion?: string;
}

export interface InstallOptions {
  scope: 'user' | 'project';
  agents: string[];
  force?: boolean;
}

export interface UpdateResult {
  updated: string[];
  failed: Array<{ agent: string; reason: string }>;
  skipped: Array<{ agent: string; reason: string }>;
}