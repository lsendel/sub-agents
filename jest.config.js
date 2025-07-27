/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: [
    '**/test/**/*.test.js',
    '**/__tests__/**/*.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/agents/',
    '/commands/',
    '/docs/'
  ],
  testTimeout: 10000,
  moduleNameMapper: {},
  resetMocks: true,
  clearMocks: true,
  restoreMocks: true
};