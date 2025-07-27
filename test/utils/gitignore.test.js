import { jest } from '@jest/globals';
import { parseGitignore, shouldIgnore, getProjectIgnorePatterns, createIgnoreFilter } from '../../src/utils/gitignore.js';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('Gitignore Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseGitignore', () => {
    test('should parse gitignore file correctly', () => {
      const mockContent = `
# Comments should be ignored
node_modules/
*.log
!important.log
/dist
*.test.js
`;
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(mockContent);
      
      const patterns = parseGitignore('/path/to/.gitignore');
      
      expect(patterns).toContain('node_modules/**');
      expect(patterns).toContain('*.log');
      expect(patterns).toContain('!important.log');
      expect(patterns).toContain('/dist');
      expect(patterns).toContain('*.test.js');
      expect(patterns).not.toContain('# Comments should be ignored');
    });

    test('should return empty array if file does not exist', () => {
      jest.mocked(fs.existsSync).mockReturnValue(false);
      
      const patterns = parseGitignore('/path/to/.gitignore');
      
      expect(patterns).toEqual([]);
    });

    test('should handle read errors gracefully', () => {
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error('Read error');
      });
      
      const patterns = parseGitignore('/path/to/.gitignore');
      
      expect(patterns).toEqual([]);
    });

    test('should convert directory patterns correctly', () => {
      const mockContent = `
dist/
build/
.cache/
`;
      
      jest.mocked(fs.existsSync).mockReturnValue(true);
      jest.mocked(fs.readFileSync).mockReturnValue(mockContent);
      
      const patterns = parseGitignore('/path/to/.gitignore');
      
      expect(patterns).toContain('dist/**');
      expect(patterns).toContain('build/**');
      expect(patterns).toContain('.cache/**');
    });
  });

  describe('shouldIgnore', () => {
    test('should match files against patterns correctly', () => {
      const patterns = ['node_modules/**', '*.log', '!important.log', '/dist/**', '*.test.js'];
      
      expect(shouldIgnore('node_modules/package.json', patterns)).toBe(true);
      expect(shouldIgnore('src/node_modules/file.js', patterns)).toBe(true);
      expect(shouldIgnore('error.log', patterns)).toBe(true);
      expect(shouldIgnore('important.log', patterns)).toBe(false); // negated
      expect(shouldIgnore('dist/bundle.js', patterns)).toBe(true);
      expect(shouldIgnore('component.test.js', patterns)).toBe(true);
      expect(shouldIgnore('regular.js', patterns)).toBe(false);
    });

    test('should handle relative paths correctly', () => {
      const patterns = ['src/**/*.test.js', 'build/**'];
      const basePath = '/project';
      
      expect(shouldIgnore('/project/src/components/Button.test.js', patterns, basePath)).toBe(true);
      expect(shouldIgnore('/project/src/components/Button.js', patterns, basePath)).toBe(false);
      expect(shouldIgnore('/project/build/output.js', patterns, basePath)).toBe(true);
    });

    test('should return false for empty patterns', () => {
      expect(shouldIgnore('any-file.js', [])).toBe(false);
    });

    test('should handle absolute paths in patterns', () => {
      const patterns = ['/config/**', 'test/**'];
      const basePath = '/project';
      
      expect(shouldIgnore('/project/config/settings.json', patterns, basePath)).toBe(true);
      expect(shouldIgnore('/project/src/config/settings.json', patterns, basePath)).toBe(false);
    });
  });

  describe('getProjectIgnorePatterns', () => {
    test('should combine .gitignore and .claude-ignore patterns', () => {
      const gitignoreContent = `
node_modules/
*.log
`;
      const claudeIgnoreContent = `
*.test.js
temp/
`;
      
      jest.mocked(fs.existsSync).mockImplementation((filePath) => {
        return filePath.toString().includes('.gitignore') || filePath.toString().includes('.claude-ignore');
      });
      
      jest.mocked(fs.readFileSync).mockImplementation((filePath) => {
        if (filePath.toString().includes('.gitignore')) {
          return gitignoreContent;
        }
        if (filePath.toString().includes('.claude-ignore')) {
          return claudeIgnoreContent;
        }
        throw new Error('Unexpected file');
      });
      
      const patterns = getProjectIgnorePatterns('/mock/project');
      
      // Should include default patterns
      expect(patterns).toContain('node_modules/**');
      expect(patterns).toContain('.git/**');
      
      // Should include gitignore patterns
      expect(patterns).toContain('*.log');
      
      // Should include claude-ignore patterns
      expect(patterns).toContain('*.test.js');
      expect(patterns).toContain('temp/**');
    });

    test('should return default patterns if no ignore files exist', () => {
      jest.mocked(fs.existsSync).mockReturnValue(false);
      
      const patterns = getProjectIgnorePatterns('/mock/project');
      
      // Should include default patterns
      expect(patterns).toContain('node_modules/**');
      expect(patterns).toContain('.git/**');
      expect(patterns).toContain('*.log');
      expect(patterns).toContain('.DS_Store');
    });
  });

  describe('createIgnoreFilter', () => {
    test('should create a filter function', () => {
      const gitignoreContent = `
node_modules/
*.log
`;
      
      jest.mocked(fs.existsSync).mockImplementation((filePath) => {
        return filePath.toString().includes('.gitignore');
      });
      
      jest.mocked(fs.readFileSync).mockReturnValue(gitignoreContent);
      
      const filter = createIgnoreFilter('/mock/project');
      
      expect(typeof filter).toBe('function');
      expect(filter('/mock/project/node_modules/package.json')).toBe(true);
      expect(filter('/mock/project/error.log')).toBe(true);
      expect(filter('/mock/project/src/index.js')).toBe(false);
    });
  });
});