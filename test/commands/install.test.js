import { jest } from '@jest/globals';
import { installCommand } from '../../src/commands/install.js';
import * as config from '../../src/utils/config.js';
import * as paths from '../../src/utils/paths.js';
import * as agents from '../../src/utils/agents.js';
import * as fs from 'fs-extra';
import * as logger from '../../src/utils/logger.js';
import chalk from 'chalk';

// Mock dependencies
jest.mock('../../src/utils/config.js');
jest.mock('../../src/utils/paths.js');
jest.mock('../../src/utils/agents.js');
jest.mock('fs-extra');
jest.mock('../../src/utils/logger.js');

describe('Install Command', () => {
  const mockAgent = {
    name: 'test-agent',
    description: 'Test Agent',
    version: '1.0.0',
    fullContent: '---\nname: test-agent\n---\nTest agent content',
    metadata: {
      name: 'test-agent',
      description: 'Test Agent',
      version: '1.0.0',
      author: 'Test Author'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up default mocks
    paths.getAgentsDir = jest.fn().mockReturnValue('/mock/agents');
    paths.ensureDirectories = jest.fn();
    config.loadConfig = jest.fn().mockReturnValue({
      installedAgents: {},
      enabledAgents: [],
      disabledAgents: []
    });
    config.addInstalledAgent = jest.fn().mockReturnValue(true);
    agents.getAgentDetails = jest.fn().mockReturnValue(mockAgent);
    logger.success = jest.fn();
    logger.error = jest.fn();
    logger.info = jest.fn();
    logger.warning = jest.fn();
  });

  test('should install an agent successfully', async () => {
    jest.mocked(fs.pathExists).mockResolvedValue(false);
    jest.mocked(fs.ensureDir).mockResolvedValue();
    jest.mocked(fs.writeFile).mockResolvedValue();
    jest.mocked(fs.writeJson).mockResolvedValue();

    await installCommand('test-agent', {});

    expect(paths.ensureDirectories).toHaveBeenCalled();
    expect(agents.getAgentDetails).toHaveBeenCalledWith('test-agent');
    expect(fs.ensureDir).toHaveBeenCalledWith('/mock/agents/test-agent');
    expect(fs.writeFile).toHaveBeenCalledWith(
      '/mock/agents/test-agent/agent.md',
      mockAgent.fullContent
    );
    expect(fs.writeJson).toHaveBeenCalledWith(
      '/mock/agents/test-agent/metadata.json',
      mockAgent.metadata,
      { spaces: 2 }
    );
    expect(config.addInstalledAgent).toHaveBeenCalledWith('test-agent', mockAgent.metadata, false);
    expect(logger.success).toHaveBeenCalledWith(
      expect.stringContaining('Successfully installed agent "test-agent"')
    );
  });

  test('should handle agent not found error', async () => {
    agents.getAgentDetails = jest.fn().mockReturnValue(null);

    await installCommand('non-existent', {});

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Agent "non-existent" not found')
    );
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  test('should handle already installed agent', async () => {
    config.loadConfig = jest.fn().mockReturnValue({
      installedAgents: {
        'test-agent': { version: '1.0.0' }
      },
      enabledAgents: ['test-agent'],
      disabledAgents: []
    });

    await installCommand('test-agent', {});

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Agent "test-agent" is already installed')
    );
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  test('should force install when force option is provided', async () => {
    config.loadConfig = jest.fn().mockReturnValue({
      installedAgents: {
        'test-agent': { version: '0.9.0' }
      },
      enabledAgents: ['test-agent'],
      disabledAgents: []
    });
    
    jest.mocked(fs.pathExists).mockResolvedValue(true);
    jest.mocked(fs.ensureDir).mockResolvedValue();
    jest.mocked(fs.writeFile).mockResolvedValue();
    jest.mocked(fs.writeJson).mockResolvedValue();

    await installCommand('test-agent', { force: true });

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Force installing agent "test-agent"')
    );
    expect(fs.writeFile).toHaveBeenCalled();
    expect(config.addInstalledAgent).toHaveBeenCalled();
    expect(logger.success).toHaveBeenCalled();
  });

  test('should install to project scope when project option is provided', async () => {
    jest.mocked(fs.pathExists).mockResolvedValue(false);
    jest.mocked(fs.ensureDir).mockResolvedValue();
    jest.mocked(fs.writeFile).mockResolvedValue();
    jest.mocked(fs.writeJson).mockResolvedValue();

    await installCommand('test-agent', { project: true });

    expect(paths.getAgentsDir).toHaveBeenCalledWith(true);
    expect(config.loadConfig).toHaveBeenCalledWith(true);
    expect(config.addInstalledAgent).toHaveBeenCalledWith('test-agent', mockAgent.metadata, true);
  });

  test('should handle write errors gracefully', async () => {
    jest.mocked(fs.pathExists).mockResolvedValue(false);
    jest.mocked(fs.ensureDir).mockResolvedValue();
    jest.mocked(fs.writeFile).mockRejectedValue(new Error('Write failed'));

    await installCommand('test-agent', {});

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Failed to install agent "test-agent"')
    );
  });

  test('should install slash command if available', async () => {
    const agentWithCommand = {
      ...mockAgent,
      command: '/test',
      commandContent: '# Test Command\nThis is a test command'
    };
    
    agents.getAgentDetails = jest.fn().mockReturnValue(agentWithCommand);
    jest.mocked(fs.pathExists).mockResolvedValue(false);
    jest.mocked(fs.ensureDir).mockResolvedValue();
    jest.mocked(fs.writeFile).mockResolvedValue();
    jest.mocked(fs.writeJson).mockResolvedValue();
    
    paths.getCommandsDir = jest.fn().mockReturnValue('/mock/commands');

    await installCommand('test-agent', {});

    expect(fs.ensureDir).toHaveBeenCalledWith('/mock/commands');
    expect(fs.writeFile).toHaveBeenCalledWith(
      '/mock/commands/test.md',
      agentWithCommand.commandContent
    );
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Installing slash command: /test')
    );
  });
});