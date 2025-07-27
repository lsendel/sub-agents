import { jest } from '@jest/globals';
import { loadConfig, saveConfig, addInstalledAgent, removeInstalledAgent, enableAgent, disableAgent, isAgentEnabled, getInstalledAgents } from '../../src/utils/config.js';
import * as fs from 'fs';
import * as paths from '../../src/utils/paths.js';

// Mock modules
jest.mock('fs');
jest.mock('../../src/utils/paths.js');

describe('Config Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up default mock for getConfigPath
    paths.getConfigPath = jest.fn().mockReturnValue('/mock/config.json');
  });

  describe('loadConfig', () => {
    test('should return default config when file does not exist', () => {
      jest.mocked(fs.existsSync).mockReturnValue(false);
      
      const config = loadConfig();
      
      expect(config).toEqual({
        version: '1.0.0',
        installedAgents: {},
        enabledAgents: [],
        disabledAgents: [],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      });
    });

    test('should parse and return config when file exists', () => {
      const mockConfig = {
        installedAgents: {
          'test-agent': {
            version: '1.0.0',
            scope: 'user'
          }
        },
        enabledAgents: ['test-agent'],
        disabledAgents: []
      };
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
      
      const config = loadConfig();
      
      expect(config).toEqual(mockConfig);
    });

    test('should return default config on JSON parse error', () => {
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue('invalid json');
      
      const config = loadConfig();
      
      expect(config).toEqual({
        version: '1.0.0',
        installedAgents: {},
        enabledAgents: [],
        disabledAgents: [],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      });
    });
  });

  describe('saveConfig', () => {
    test('should write config to file', () => {
      const mockConfig = {
        installedAgents: {
          'test-agent': {
            version: '1.0.0',
            scope: 'user'
          }
        },
        enabledAgents: ['test-agent'],
        disabledAgents: []
      };
      
      saveConfig(mockConfig);
      
      expect(jest.mocked(fs.writeFileSync)).toHaveBeenCalledWith(
        '/mock/config.json',
        JSON.stringify(mockConfig, null, 2)
      );
    });

    test('should handle save errors gracefully', () => {
      jest.mocked(fs.writeFileSync).mockImplementation(() => {
        throw new Error('Write error');
      });
      
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const result = saveConfig({});
      
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error saving config:'),
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('addInstalledAgent', () => {
    test('should add agent to config and auto-enable if setting is true', () => {
      const mockConfig = {
        version: '1.0.0',
        installedAgents: {},
        enabledAgents: [],
        disabledAgents: [],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      };
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
      jest.mocked(fs.writeFileSync).mockImplementation(() => {});
      
      const result = addInstalledAgent('test-agent', { version: '1.0.0' });
      
      expect(result).toBe(true);
      expect(jest.mocked(fs.writeFileSync)).toHaveBeenCalledWith(
        '/mock/config.json',
        expect.stringContaining('"test-agent"')
      );
    });
  });

  describe('enableAgent', () => {
    test('should enable agent and remove from disabled list', () => {
      const mockConfig = {
        version: '1.0.0',
        installedAgents: { 'test-agent': { version: '1.0.0' } },
        enabledAgents: [],
        disabledAgents: ['test-agent'],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      };
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
      jest.mocked(fs.writeFileSync).mockImplementation(() => {});
      
      const result = enableAgent('test-agent');
      
      expect(result).toBe(true);
    });
  });

  describe('disableAgent', () => {
    test('should disable agent and remove from enabled list', () => {
      const mockConfig = {
        version: '1.0.0',
        installedAgents: { 'test-agent': { version: '1.0.0' } },
        enabledAgents: ['test-agent'],
        disabledAgents: [],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      };
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
      jest.mocked(fs.writeFileSync).mockImplementation(() => {});
      
      const result = disableAgent('test-agent');
      
      expect(result).toBe(true);
    });
  });

  describe('isAgentEnabled', () => {
    test('should return false if agent is disabled', () => {
      const mockConfig = {
        version: '1.0.0',
        installedAgents: { 'test-agent': { version: '1.0.0' } },
        enabledAgents: [],
        disabledAgents: ['test-agent'],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      };
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
      
      const result = isAgentEnabled('test-agent', false);
      
      expect(result).toBe(false);
    });

    test('should return true if agent is enabled', () => {
      const mockConfig = {
        version: '1.0.0',
        installedAgents: { 'test-agent': { version: '1.0.0' } },
        enabledAgents: ['test-agent'],
        disabledAgents: [],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      };
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
      
      const result = isAgentEnabled('test-agent', false);
      
      expect(result).toBe(true);
    });
  });

  describe('getInstalledAgents', () => {
    test('should return installed agents', () => {
      const mockConfig = {
        version: '1.0.0',
        installedAgents: {
          'test-agent': { version: '1.0.0' },
          'another-agent': { version: '2.0.0' }
        },
        enabledAgents: ['test-agent'],
        disabledAgents: [],
        settings: {
          autoEnableOnInstall: true,
          preferProjectScope: false,
          autoUpdateCheck: true
        }
      };
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
      
      const agents = getInstalledAgents(false);
      
      expect(agents).toEqual({
        'test-agent': { version: '1.0.0' },
        'another-agent': { version: '2.0.0' }
      });
    });
  });
});