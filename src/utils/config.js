import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { getConfigPath } from "./paths.js";

const DEFAULT_CONFIG = {
  version: "1.0.0",
  installedAgents: {},
  enabledAgents: [],
  disabledAgents: [],
  settings: {
    autoEnableOnInstall: true,
    preferProjectScope: false,
    autoUpdateCheck: true,
  },
};

export function loadConfig(isProject = false) {
  const configPath = getConfigPath(isProject);

  if (!existsSync(configPath)) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error loading config:", error);
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(config, isProject = false) {
  const configPath = getConfigPath(isProject);

  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving config:", error);
    return false;
  }
}

export function addInstalledAgent(agentName, metadata, isProject = false) {
  const config = loadConfig(isProject);

  config.installedAgents[agentName] = {
    version: metadata.version,
    installedAt: new Date().toISOString(),
    scope: isProject ? "project" : "user",
    ...metadata,
  };

  // Auto-enable if setting is true
  if (
    config.settings.autoEnableOnInstall &&
    !config.disabledAgents.includes(agentName)
  ) {
    if (!config.enabledAgents.includes(agentName)) {
      config.enabledAgents.push(agentName);
    }
  }

  return saveConfig(config, isProject);
}

export function removeInstalledAgent(agentName, isProject = false) {
  const config = loadConfig(isProject);

  delete config.installedAgents[agentName];
  config.enabledAgents = config.enabledAgents.filter(
    (name) => name !== agentName,
  );
  config.disabledAgents = config.disabledAgents.filter(
    (name) => name !== agentName,
  );

  return saveConfig(config, isProject);
}

export function enableAgent(agentName, isProject = false) {
  const config = loadConfig(isProject);

  // Remove from disabled list
  config.disabledAgents = config.disabledAgents.filter(
    (name) => name !== agentName,
  );

  // Add to enabled list if not already there
  if (!config.enabledAgents.includes(agentName)) {
    config.enabledAgents.push(agentName);
  }

  return saveConfig(config, isProject);
}

export function disableAgent(agentName, isProject = false) {
  const config = loadConfig(isProject);

  // Remove from enabled list
  config.enabledAgents = config.enabledAgents.filter(
    (name) => name !== agentName,
  );

  // Add to disabled list if not already there
  if (!config.disabledAgents.includes(agentName)) {
    config.disabledAgents.push(agentName);
  }

  return saveConfig(config, isProject);
}

export function isAgentEnabled(agentName, checkBothScopes = true) {
  const userConfig = loadConfig(false);
  const projectConfig = checkBothScopes ? loadConfig(true) : null;

  // Check if explicitly disabled
  if (userConfig.disabledAgents.includes(agentName)) return false;
  if (projectConfig && projectConfig.disabledAgents.includes(agentName))
    return false;

  // Check if enabled
  const enabledInUser = userConfig.enabledAgents.includes(agentName);
  const enabledInProject =
    projectConfig && projectConfig.enabledAgents.includes(agentName);

  return enabledInUser || enabledInProject;
}

export function getInstalledAgents(checkBothScopes = true) {
  const userConfig = loadConfig(false);
  const projectConfig = checkBothScopes ? loadConfig(true) : null;

  const agents = { ...userConfig.installedAgents };

  if (projectConfig) {
    Object.assign(agents, projectConfig.installedAgents);
  }

  return agents;
}

// Process configuration functions
const PROCESSES_CONFIG_FILE = ".claude-processes.json";
const DEFAULT_PROCESSES_CONFIG = {
  version: "1.0.0",
  processes: {},
  lastSync: null,
};

export function getProcessesConfigPath(isProject = false) {
  const baseDir = isProject ? process.cwd() : homedir();
  return join(baseDir, PROCESSES_CONFIG_FILE);
}

export function getProcessesConfig(isProject = false) {
  const configPath = getProcessesConfigPath(isProject);

  if (!existsSync(configPath)) {
    return { ...DEFAULT_PROCESSES_CONFIG };
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error loading processes config:", error);
    return { ...DEFAULT_PROCESSES_CONFIG };
  }
}

export function updateProcessesConfig(config, isProject = false) {
  const configPath = getProcessesConfigPath(isProject);

  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving processes config:", error);
    return false;
  }
}

export function initializeProcessesConfig(isProject = false) {
  const configPath = getProcessesConfigPath(isProject);

  if (!existsSync(configPath)) {
    updateProcessesConfig(DEFAULT_PROCESSES_CONFIG, isProject);
  }
}

// Standards configuration functions
const STANDARDS_CONFIG_FILE = ".claude-standards.json";
const DEFAULT_STANDARDS_CONFIG = {
  version: "1.0.0",
  standards: {},
  lastSync: null,
};

export function getStandardsConfigPath(isProject = false) {
  const baseDir = isProject ? process.cwd() : homedir();
  return join(baseDir, STANDARDS_CONFIG_FILE);
}

export function getConfig(isProject = false) {
  return loadConfig(isProject);
}

export function updateConfig(config, isProject = false) {
  saveConfig(config, isProject);
}

export function getStandardsConfig(isProject = false) {
  const configPath = getStandardsConfigPath(isProject);

  if (!existsSync(configPath)) {
    return { ...DEFAULT_STANDARDS_CONFIG };
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error loading standards config:", error);
    return { ...DEFAULT_STANDARDS_CONFIG };
  }
}

export function updateStandardsConfig(config, isProject = false) {
  const configPath = getStandardsConfigPath(isProject);

  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving standards config:", error);
    return false;
  }
}

export function initializeStandardsConfig(isProject = false) {
  const configPath = getStandardsConfigPath(isProject);

  if (!existsSync(configPath)) {
    updateStandardsConfig(DEFAULT_STANDARDS_CONFIG, isProject);
  }
}
