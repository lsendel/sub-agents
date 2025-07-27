import { jest } from '@jest/globals';
import { listCommand } from '../../src/commands/list.js';
import * as config from '../../src/utils/config.js';
import * as agents from '../../src/utils/agents.js';
import * as logger from '../../src/utils/logger.js';
import Table from 'cli-table3';
import chalk from 'chalk';

// Mock dependencies
jest.mock('../../src/utils/config.js');
jest.mock('../../src/utils/agents.js');
jest.mock('../../src/utils/logger.js');
jest.mock('cli-table3');

describe('List Command', () => {
  const mockInstalledAgents = {
    'test-agent': {
      version: '1.0.0',
      description: 'Test Agent',
      installedAt: '2024-01-01T00:00:00.000Z',
      scope: 'user'
    },
    'another-agent': {
      version: '2.0.0',
      description: 'Another Agent',
      installedAt: '2024-01-02T00:00:00.000Z',
      scope: 'project'
    }
  };

  const mockAvailableAgents = [
    {
      name: 'test-agent',
      version: '1.0.0',
      description: 'Test Agent'
    },
    {
      name: 'another-agent',
      version: '2.0.0',
      description: 'Another Agent'
    },
    {
      name: 'new-agent',
      version: '1.0.0',
      description: 'New Agent'
    }
  ];

  let mockTable;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock table
    mockTable = {
      push: jest.fn(),
      toString: jest.fn().mockReturnValue('table output')
    };
    Table.mockImplementation(() => mockTable);
    
    // Set up default mocks
    config.getInstalledAgents = jest.fn().mockReturnValue(mockInstalledAgents);
    config.isAgentEnabled = jest.fn().mockImplementation((name) => name === 'test-agent');
    agents.getAvailableAgents = jest.fn().mockReturnValue(mockAvailableAgents);
    logger.info = jest.fn();
    logger.warning = jest.fn();
    console.log = jest.fn();
  });

  test('should list installed agents by default', async () => {
    await listCommand({});

    expect(config.getInstalledAgents).toHaveBeenCalledWith(true);
    expect(mockTable.push).toHaveBeenCalledWith([
      'test-agent',
      '1.0.0',
      chalk.green('✓ Enabled'),
      'user',
      'Test Agent'
    ]);
    expect(mockTable.push).toHaveBeenCalledWith([
      'another-agent',
      '2.0.0',
      chalk.gray('✗ Disabled'),
      'project',
      'Another Agent'
    ]);
    expect(console.log).toHaveBeenCalledWith('table output');
    expect(logger.info).toHaveBeenCalledWith('\nTotal installed agents: 2');
  });

  test('should show message when no agents are installed', async () => {
    config.getInstalledAgents = jest.fn().mockReturnValue({});

    await listCommand({});

    expect(logger.warning).toHaveBeenCalledWith('No agents installed yet.');
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Run "claude-agents install <agent-name>" to install an agent')
    );
    expect(mockTable.push).not.toHaveBeenCalled();
  });

  test('should list all available agents when --all flag is used', async () => {
    await listCommand({ all: true });

    expect(agents.getAvailableAgents).toHaveBeenCalled();
    expect(config.getInstalledAgents).toHaveBeenCalledWith(true);
    
    // Should show all three agents
    expect(mockTable.push).toHaveBeenCalledTimes(3);
    expect(mockTable.push).toHaveBeenCalledWith([
      'test-agent',
      '1.0.0',
      chalk.green('✓ Installed'),
      'Test Agent'
    ]);
    expect(mockTable.push).toHaveBeenCalledWith([
      'another-agent',
      '2.0.0',
      chalk.green('✓ Installed'),
      'Another Agent'
    ]);
    expect(mockTable.push).toHaveBeenCalledWith([
      'new-agent',
      '1.0.0',
      chalk.gray('Not installed'),
      'New Agent'
    ]);
    expect(logger.info).toHaveBeenCalledWith('\nTotal available agents: 3');
  });

  test('should handle errors when listing available agents', async () => {
    agents.getAvailableAgents = jest.fn().mockImplementation(() => {
      throw new Error('Failed to read agents');
    });

    await listCommand({ all: true });

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Error listing agents')
    );
  });

  test('should list only user scope agents when --user flag is used', async () => {
    await listCommand({ user: true });

    expect(config.getInstalledAgents).toHaveBeenCalledWith(false);
  });

  test('should list only project scope agents when --project flag is used', async () => {
    config.getInstalledAgents = jest.fn().mockReturnValue({
      'another-agent': mockInstalledAgents['another-agent']
    });

    await listCommand({ project: true });

    expect(config.getInstalledAgents).toHaveBeenCalledWith(false);
    expect(mockTable.push).toHaveBeenCalledTimes(1);
    expect(mockTable.push).toHaveBeenCalledWith([
      'another-agent',
      '2.0.0',
      chalk.gray('✗ Disabled'),
      'project',
      'Another Agent'
    ]);
  });

  test('should format dates correctly', async () => {
    const recentAgent = {
      'recent-agent': {
        version: '1.0.0',
        description: 'Recent Agent',
        installedAt: new Date().toISOString(),
        scope: 'user'
      }
    };
    
    config.getInstalledAgents = jest.fn().mockReturnValue(recentAgent);
    config.isAgentEnabled = jest.fn().mockReturnValue(false);

    await listCommand({});

    expect(mockTable.push).toHaveBeenCalledWith([
      'recent-agent',
      '1.0.0',
      chalk.gray('✗ Disabled'),
      'user',
      'Recent Agent'
    ]);
  });
});