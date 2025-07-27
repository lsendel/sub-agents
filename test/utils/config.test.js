import { jest } from '@jest/globals';
import fs from 'fs';
import { loadConfig, saveConfig, initConfig } from '../../src/utils/config.js';

// Mock fs module
jest.mock('fs');

describe('Config Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadConfig', () => {
    test('should return empty config when file does not exist', () => {
      fs.existsSync.mockReturnValue(false);
      
      const config = loadConfig();
      
      expect(config).toEqual({
        installedAgents: {},
        enabledAgents: [],
        disabledAgents: []
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
      
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));
      
      const config = loadConfig();
      
      expect(config).toEqual(mockConfig);
    });

    test('should return empty config on JSON parse error', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue('invalid json');
      
      const config = loadConfig();
      
      expect(config).toEqual({
        installedAgents: {},
        enabledAgents: [],
        disabledAgents: []
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
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(mockConfig, null, 2)
      );
    });

    test('should handle save errors gracefully', () => {
      fs.writeFileSync.mockImplementation(() => {
        throw new Error('Write error');
      });
      
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      saveConfig({});
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error saving config:'),
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('initConfig', () => {
    test('should create config file if it does not exist', () => {
      fs.existsSync.mockReturnValue(false);
      
      initConfig();
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify({
          installedAgents: {},
          enabledAgents: [],
          disabledAgents: []
        }, null, 2)
      );
    });

    test('should not create config file if it already exists', () => {
      fs.existsSync.mockReturnValue(true);
      
      initConfig();
      
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });
});