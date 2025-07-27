import { jest } from '@jest/globals';
import { enableCommand } from '../../src/commands/enable.js';
import { disableCommand } from '../../src/commands/disable.js';
import * as config from '../../src/utils/config.js';
import * as logger from '../../src/utils/logger.js';
import * as prompts from '../../src/utils/prompts.js';

// Mock dependencies
jest.mock('../../src/utils/config.js');
jest.mock('../../src/utils/logger.js');
jest.mock('../../src/utils/prompts.js');

describe('Enable/Disable Commands', () => {
  const mockInstalledAgents = {
    'test-agent': {
      version: '1.0.0',
      description: 'Test Agent',
      scope: 'user'
    },
    'another-agent': {
      version: '2.0.0',
      description: 'Another Agent',
      scope: 'project'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up default mocks
    config.getInstalledAgents = jest.fn().mockReturnValue(mockInstalledAgents);
    config.isAgentEnabled = jest.fn().mockReturnValue(false);
    config.enableAgent = jest.fn().mockReturnValue(true);
    config.disableAgent = jest.fn().mockReturnValue(true);
    logger.success = jest.fn();
    logger.error = jest.fn();
    logger.warning = jest.fn();
  });

  describe('Enable Command', () => {
    test('should enable an installed agent', async () => {
      await enableCommand('test-agent', {});

      expect(config.getInstalledAgents).toHaveBeenCalledWith(true);
      expect(config.isAgentEnabled).toHaveBeenCalledWith('test-agent');
      expect(config.enableAgent).toHaveBeenCalledWith('test-agent', false);
      expect(logger.success).toHaveBeenCalledWith(
        expect.stringContaining('Agent "test-agent" has been enabled')
      );
    });

    test('should show error if agent is not installed', async () => {
      await enableCommand('non-existent', {});

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Agent "non-existent" is not installed')
      );
      expect(config.enableAgent).not.toHaveBeenCalled();
    });

    test('should show warning if agent is already enabled', async () => {
      config.isAgentEnabled = jest.fn().mockReturnValue(true);

      await enableCommand('test-agent', {});

      expect(logger.warning).toHaveBeenCalledWith(
        expect.stringContaining('Agent "test-agent" is already enabled')
      );
      expect(config.enableAgent).not.toHaveBeenCalled();
    });

    test('should enable agent in project scope when project option is provided', async () => {
      await enableCommand('test-agent', { project: true });

      expect(config.getInstalledAgents).toHaveBeenCalledWith(true);
      expect(config.enableAgent).toHaveBeenCalledWith('test-agent', true);
    });

    test('should handle enable errors gracefully', async () => {
      config.enableAgent = jest.fn().mockReturnValue(false);

      await enableCommand('test-agent', {});

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to enable agent "test-agent"')
      );
    });

    test('should prompt for agent selection when no agent name provided', async () => {
      prompts.selectAgent = jest.fn().mockResolvedValue('test-agent');

      await enableCommand(undefined, {});

      expect(prompts.selectAgent).toHaveBeenCalledWith(
        Object.keys(mockInstalledAgents),
        'Select an agent to enable:'
      );
      expect(config.enableAgent).toHaveBeenCalledWith('test-agent', false);
      expect(logger.success).toHaveBeenCalled();
    });

    test('should handle prompt cancellation', async () => {
      prompts.selectAgent = jest.fn().mockResolvedValue(null);

      await enableCommand(undefined, {});

      expect(prompts.selectAgent).toHaveBeenCalled();
      expect(config.enableAgent).not.toHaveBeenCalled();
      expect(logger.warning).toHaveBeenCalledWith('Operation cancelled');
    });
  });

  describe('Disable Command', () => {
    test('should disable an enabled agent', async () => {
      config.isAgentEnabled = jest.fn().mockReturnValue(true);

      await disableCommand('test-agent', {});

      expect(config.getInstalledAgents).toHaveBeenCalledWith(true);
      expect(config.isAgentEnabled).toHaveBeenCalledWith('test-agent');
      expect(config.disableAgent).toHaveBeenCalledWith('test-agent', false);
      expect(logger.success).toHaveBeenCalledWith(
        expect.stringContaining('Agent "test-agent" has been disabled')
      );
    });

    test('should show error if agent is not installed', async () => {
      await disableCommand('non-existent', {});

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Agent "non-existent" is not installed')
      );
      expect(config.disableAgent).not.toHaveBeenCalled();
    });

    test('should show warning if agent is already disabled', async () => {
      config.isAgentEnabled = jest.fn().mockReturnValue(false);

      await disableCommand('test-agent', {});

      expect(logger.warning).toHaveBeenCalledWith(
        expect.stringContaining('Agent "test-agent" is already disabled')
      );
      expect(config.disableAgent).not.toHaveBeenCalled();
    });

    test('should disable agent in project scope when project option is provided', async () => {
      config.isAgentEnabled = jest.fn().mockReturnValue(true);

      await disableCommand('test-agent', { project: true });

      expect(config.getInstalledAgents).toHaveBeenCalledWith(true);
      expect(config.disableAgent).toHaveBeenCalledWith('test-agent', true);
    });

    test('should handle disable errors gracefully', async () => {
      config.isAgentEnabled = jest.fn().mockReturnValue(true);
      config.disableAgent = jest.fn().mockReturnValue(false);

      await disableCommand('test-agent', {});

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to disable agent "test-agent"')
      );
    });

    test('should prompt for agent selection when no agent name provided', async () => {
      config.isAgentEnabled = jest.fn().mockReturnValue(true);
      prompts.selectAgent = jest.fn().mockResolvedValue('test-agent');

      await disableCommand(undefined, {});

      expect(prompts.selectAgent).toHaveBeenCalledWith(
        expect.arrayContaining(['test-agent']),
        'Select an agent to disable:'
      );
      expect(config.disableAgent).toHaveBeenCalledWith('test-agent', false);
      expect(logger.success).toHaveBeenCalled();
    });

    test('should only show enabled agents in prompt', async () => {
      config.isAgentEnabled = jest.fn().mockImplementation((name) => name === 'test-agent');
      prompts.selectAgent = jest.fn().mockResolvedValue('test-agent');

      await disableCommand(undefined, {});

      expect(prompts.selectAgent).toHaveBeenCalledWith(
        ['test-agent'],
        'Select an agent to disable:'
      );
    });
  });
});