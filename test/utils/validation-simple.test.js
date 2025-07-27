import { validateAgentName, sanitizeInput, escapeForDisplay } from '../../src/utils/validation.js';

describe('Validation Utility - Simple Tests', () => {
  describe('validateAgentName', () => {
    test('should validate agent names correctly', () => {
      // Valid names
      expect(validateAgentName('test-agent').valid).toBe(true);
      expect(validateAgentName('my-awesome-agent').valid).toBe(true);
      expect(validateAgentName('agent123').valid).toBe(true);
      
      // Invalid names
      expect(validateAgentName('').valid).toBe(false);
      expect(validateAgentName('ab').valid).toBe(false); // too short
      expect(validateAgentName('Test Agent').valid).toBe(false); // spaces
      expect(validateAgentName('TEST-AGENT').valid).toBe(false); // uppercase
    });
  });

  describe('sanitizeInput', () => {
    test('should sanitize dangerous characters', () => {
      expect(sanitizeInput('echo `whoami`')).toBe('echo \\`whoami\\`');
      expect(sanitizeInput('$PATH')).toBe('\\$PATH');
      expect(sanitizeInput('test\\command')).toBe('test\\\\command');
    });
    
    test('should handle null values', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
    });
  });

  describe('escapeForDisplay', () => {
    test('should escape HTML characters', () => {
      expect(escapeForDisplay('<script>')).toBe('&lt;script&gt;');
      expect(escapeForDisplay('&')).toBe('&amp;');
      expect(escapeForDisplay('"')).toBe('&quot;');
    });
  });
});