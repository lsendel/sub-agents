// Test setup for ES modules
import { jest } from '@jest/globals';

// Global test setup
global.beforeEach(() => {
  jest.clearAllMocks();
});

// Mock console methods during tests to avoid noise
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
  info: jest.fn(),
};