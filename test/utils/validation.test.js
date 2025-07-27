import { jest } from '@jest/globals';
import { validateAgentName, validateAgentMetadata, validateFilePath, sanitizeInput, validateCommandOptions, validateEnvironment, escapeForDisplay } from '../../src/utils/validation.js';

describe('Validation Utility', () => {
  describe('validateAgentName', () => {
    test('should return valid for valid agent names', () => {
      expect(validateAgentName('test-agent').valid).toBe(true);
      expect(validateAgentName('my-awesome-agent').valid).toBe(true);
      expect(validateAgentName('agent123').valid).toBe(true);
      expect(validateAgentName('abc').valid).toBe(true);
    });

    test('should return invalid for invalid agent names', () => {
      expect(validateAgentName('').valid).toBe(false);
      expect(validateAgentName('ab').valid).toBe(false); // too short
      expect(validateAgentName('Test Agent').valid).toBe(false); // spaces
      expect(validateAgentName('test_agent').valid).toBe(false); // underscores
      expect(validateAgentName('test.agent').valid).toBe(false); // dots
      expect(validateAgentName('TEST-AGENT').valid).toBe(false); // uppercase
      expect(validateAgentName('-test-agent').valid).toBe(false); // starts with dash
      expect(validateAgentName('test-agent-').valid).toBe(false); // ends with dash
      expect(validateAgentName('test..agent').valid).toBe(false); // path traversal
      expect(validateAgentName('test/agent').valid).toBe(false); // slash
    });
  });

  describe('validateAgentMetadata', () => {
    test('should return valid for valid metadata', () => {
      const validMetadata = {
        name: 'test-agent',
        description: 'A test agent',
        version: '1.0.0'
      };
      
      const result = validateAgentMetadata(validMetadata);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should return errors for missing required fields', () => {
      const invalidMetadata = {
        name: 'test-agent'
      };
      
      const result = validateAgentMetadata(invalidMetadata);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required field: description');
      expect(result.errors).toContain('Missing required field: version');
    });

    test('should return error for invalid version format', () => {
      const invalidMetadata = {
        name: 'test-agent',
        description: 'A test agent',
        version: 'invalid-version'
      };
      
      const result = validateAgentMetadata(invalidMetadata);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Version must follow semantic versioning (e.g., 1.0.0)');
    });

    test('should return error for long description', () => {
      const metadata = {
        name: 'test-agent',
        description: 'A'.repeat(201),
        version: '1.0.0'
      };
      
      const result = validateAgentMetadata(metadata);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Description must be 200 characters or less');
    });

    test('should return error for non-array tools', () => {
      const metadata = {
        name: 'test-agent',
        description: 'A test agent',
        version: '1.0.0',
        tools: 'Read, Write'
      };
      
      const result = validateAgentMetadata(metadata);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Tools must be an array');
    });
  });

  describe('validateFilePath', () => {
    test('should return valid for safe file paths', () => {
      // Mock process.cwd() for consistent testing
      const originalCwd = process.cwd;
      process.cwd = jest.fn().mockReturnValue('/test/project');
      
      expect(validateFilePath('/test/project/file.js').valid).toBe(true);
      
      process.cwd = originalCwd;
    });

    test('should return invalid for paths with command injection attempts', () => {
      expect(validateFilePath('file.js; rm -rf /').valid).toBe(false);
      expect(validateFilePath('file.js | cat /etc/passwd').valid).toBe(false);
      expect(validateFilePath('file.js && echo "hacked"').valid).toBe(false);
      expect(validateFilePath('file.js`whoami`').valid).toBe(false);
    });

    test('should return invalid for path traversal attempts', () => {
      expect(validateFilePath('../../../etc/passwd').valid).toBe(false);
      expect(validateFilePath('~/sensitive-file').valid).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    test('should sanitize shell metacharacters', () => {
      expect(sanitizeInput('echo `whoami`')).toBe('echo \\`whoami\\`');
      expect(sanitizeInput('$PATH')).toBe('\\$PATH');
      expect(sanitizeInput('test\\command')).toBe('test\\\\command');
    });

    test('should remove null bytes', () => {
      expect(sanitizeInput('test\0string')).toBe('teststring');
    });

    test('should limit length to 1000 characters', () => {
      const longInput = 'a'.repeat(1500);
      expect(sanitizeInput(longInput).length).toBe(1000);
    });

    test('should return empty string for invalid input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });
  });

  describe('validateCommandOptions', () => {
    test('should return valid for allowed options', () => {
      const options = { scope: 'user', force: true };
      const allowedOptions = ['scope', 'force', 'verbose'];
      
      expect(validateCommandOptions(options, allowedOptions).valid).toBe(true);
    });

    test('should return invalid for unallowed options', () => {
      const options = { scope: 'user', invalid: true };
      const allowedOptions = ['scope', 'force'];
      
      const result = validateCommandOptions(options, allowedOptions);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid options: invalid');
    });

    test('should return valid for no options', () => {
      expect(validateCommandOptions(null, []).valid).toBe(true);
      expect(validateCommandOptions(undefined, []).valid).toBe(true);
    });
  });

  describe('validateEnvironment', () => {
    test('should return valid with no warnings for normal environment', () => {
      const result = validateEnvironment();
      expect(result.valid).toBe(true);
    });

    test('should warn about outdated Node.js version', () => {
      const originalVersion = process.version;
      Object.defineProperty(process, 'version', {
        value: 'v14.17.0',
        writable: true,
        configurable: true
      });
      
      const result = validateEnvironment();
      expect(result.warnings).toContain('Node.js v14.17.0 is outdated. Please upgrade to v16 or later');
      
      Object.defineProperty(process, 'version', {
        value: originalVersion,
        writable: true,
        configurable: true
      });
    });
  });

  describe('escapeForDisplay', () => {
    test('should escape HTML special characters', () => {
      expect(escapeForDisplay('<script>alert("XSS")</script>')).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
      expect(escapeForDisplay('Test & "quotes"')).toBe('Test &amp; &quot;quotes&quot;');
      expect(escapeForDisplay("It's a test")).toBe('It&#x27;s a test');
    });

    test('should return empty string for invalid input', () => {
      expect(escapeForDisplay(null)).toBe('');
      expect(escapeForDisplay(undefined)).toBe('');
      expect(escapeForDisplay(123)).toBe('');
    });
  });
});