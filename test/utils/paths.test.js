import { jest } from '@jest/globals';
import * as path from 'path';
import * as os from 'os';
import {
  CLAUDE_USER_DIR,
  CLAUDE_USER_AGENTS_DIR,
  getAgentsDir,
  getCommandsDir,
  getConfigPath,
  getUserAgentsDir,
  getProjectAgentsDir,
  ensureDir
} from '../../src/utils/paths.js';

describe('Paths Utility', () => {
  const originalCwd = process.cwd();
  const mockHomeDir = '/mock/home';
  const mockProjectDir = '/mock/project';

  beforeEach(() => {
    jest.spyOn(os, 'homedir').mockReturnValue(mockHomeDir);
    jest.spyOn(process, 'cwd').mockReturnValue(mockProjectDir);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Constants', () => {
    test('CLAUDE_USER_DIR should be in home directory', () => {
      expect(CLAUDE_USER_DIR).toBe(path.join(mockHomeDir, '.claude'));
    });

    test('CLAUDE_USER_AGENTS_DIR should be in .claude/agents', () => {
      expect(CLAUDE_USER_AGENTS_DIR).toBe(path.join(mockHomeDir, '.claude', 'agents'));
    });
  });

  describe('getAgentsDir', () => {
    test('should return user agents directory by default', () => {
      expect(getAgentsDir()).toBe(path.join(mockHomeDir, '.claude', 'agents'));
    });

    test('should return project agents directory when isProject is true', () => {
      expect(getAgentsDir(true)).toBe(path.join(mockProjectDir, '.claude', 'agents'));
    });
  });

  describe('getCommandsDir', () => {
    test('should return user commands directory by default', () => {
      expect(getCommandsDir()).toBe(path.join(mockHomeDir, '.claude', 'commands'));
    });

    test('should return project commands directory when isProject is true', () => {
      expect(getCommandsDir(true)).toBe(path.join(mockProjectDir, '.claude', 'commands'));
    });
  });

  describe('getConfigPath', () => {
    test('should return user config path by default', () => {
      expect(getConfigPath()).toBe(path.join(mockHomeDir, '.claude-agents.json'));
    });

    test('should return project config path when isProject is true', () => {
      expect(getConfigPath(true)).toBe(path.join(mockProjectDir, '.claude-agents.json'));
    });
  });

  describe('getUserAgentsDir', () => {
    test('should return user agents directory', () => {
      expect(getUserAgentsDir()).toBe(path.join(mockHomeDir, '.claude', 'agents'));
    });
  });

  describe('getProjectAgentsDir', () => {
    test('should return project agents directory', () => {
      expect(getProjectAgentsDir()).toBe(path.join(mockProjectDir, '.claude', 'agents'));
    });
  });
});