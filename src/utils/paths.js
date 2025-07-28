import { homedir } from "os";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

export const CLAUDE_USER_DIR = join(homedir(), ".claude");
export const CLAUDE_USER_AGENTS_DIR = join(CLAUDE_USER_DIR, "agents");
export const CLAUDE_USER_PROCESSES_DIR = join(CLAUDE_USER_DIR, "processes");
export const CLAUDE_USER_STANDARDS_DIR = join(CLAUDE_USER_DIR, "standards");
// Commands directory no longer used - agents use description-based delegation
// export const CLAUDE_USER_COMMANDS_DIR = join(CLAUDE_USER_DIR, 'commands');

export const CLAUDE_PROJECT_DIR = join(process.cwd(), ".claude");
export const CLAUDE_PROJECT_AGENTS_DIR = join(CLAUDE_PROJECT_DIR, "agents");
export const CLAUDE_PROJECT_PROCESSES_DIR = join(
  CLAUDE_PROJECT_DIR,
  "processes",
);
export const CLAUDE_PROJECT_STANDARDS_DIR = join(
  CLAUDE_PROJECT_DIR,
  "standards",
);
// Commands directory no longer used - agents use description-based delegation
// export const CLAUDE_PROJECT_COMMANDS_DIR = join(CLAUDE_PROJECT_DIR, 'commands');

export const AGENTS_CONFIG_FILE = ".claude-agents.json";

export function getAgentsDir(isProject = false) {
  return isProject ? CLAUDE_PROJECT_AGENTS_DIR : CLAUDE_USER_AGENTS_DIR;
}

export function getProcessesDir(isProject = false) {
  return isProject ? CLAUDE_PROJECT_PROCESSES_DIR : CLAUDE_USER_PROCESSES_DIR;
}

export function getStandardsDir(isProject = false) {
  return isProject ? CLAUDE_PROJECT_STANDARDS_DIR : CLAUDE_USER_STANDARDS_DIR;
}

// Commands directory no longer used - agents use description-based delegation
// export function getCommandsDir(isProject = false) {
//   return isProject ? CLAUDE_PROJECT_COMMANDS_DIR : CLAUDE_USER_COMMANDS_DIR;
// }

export function getConfigPath(isProject = false) {
  const baseDir = isProject ? process.cwd() : homedir();
  return join(baseDir, AGENTS_CONFIG_FILE);
}

export function ensureDirectories() {
  const dirs = [
    CLAUDE_USER_DIR,
    CLAUDE_USER_AGENTS_DIR,
    CLAUDE_USER_PROCESSES_DIR,
    CLAUDE_USER_STANDARDS_DIR,
  ];

  dirs.forEach((dir) => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });
}

export function ensureProjectDirectories() {
  const dirs = [
    CLAUDE_PROJECT_DIR,
    CLAUDE_PROJECT_AGENTS_DIR,
    CLAUDE_PROJECT_PROCESSES_DIR,
    CLAUDE_PROJECT_STANDARDS_DIR,
  ];

  dirs.forEach((dir) => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });
}

export function getUserAgentsDir() {
  return CLAUDE_USER_AGENTS_DIR;
}

export function getProjectAgentsDir() {
  return CLAUDE_PROJECT_AGENTS_DIR;
}

export function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}
