import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { getAvailableAgents, getAgentDetails, formatAgentForInstall, loadAgent } from '../../src/utils/agents.js';

// Mock fs module
jest.mock('fs');

describe('Agents Utility', () => {
  const mockAgentDir = '/mock/agents';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAvailableAgents', () => {
    test('should return empty array when agents directory does not exist', () => {
      fs.existsSync.mockReturnValue(false);
      
      const agents = getAvailableAgents();
      
      expect(agents).toEqual([]);
    });

    test('should return agents with metadata and content', () => {
      const mockAgent = {
        name: 'test-agent',
        description: 'Test agent',
        version: '1.0.0'
      };
      
      const mockAgentContent = `---
name: test-agent
description: Test agent
tools: Read, Edit
---

You are a test agent.`;

      fs.existsSync.mockReturnValue(true);
      fs.readdirSync.mockReturnValue([
        { name: 'test-agent', isDirectory: () => true }
      ]);
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes('metadata.json')) {
          return JSON.stringify(mockAgent);
        }
        return mockAgentContent;
      });
      
      const agents = getAvailableAgents();
      
      expect(agents).toHaveLength(1);
      expect(agents[0]).toMatchObject({
        name: 'test-agent',
        description: 'Test agent',
        version: '1.0.0',
        content: mockAgentContent
      });
    });
  });

  describe('getAgentDetails', () => {
    test('should return null when agent does not exist', () => {
      fs.existsSync.mockReturnValue(false);
      
      const details = getAgentDetails('non-existent');
      
      expect(details).toBeNull();
    });

    test('should return agent details with parsed frontmatter', () => {
      const mockMetadata = {
        name: 'test-agent',
        description: 'Test agent',
        version: '1.0.0'
      };
      
      const mockAgentContent = `---
name: test-agent
description: Test agent
tools: Read, Edit
---

You are a test agent.`;

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes('metadata.json')) {
          return JSON.stringify(mockMetadata);
        }
        if (filePath.includes('hooks.json')) {
          return '{}';
        }
        return mockAgentContent;
      });
      
      const details = getAgentDetails('test-agent');
      
      expect(details).toMatchObject({
        name: 'test-agent',
        description: 'Test agent',
        version: '1.0.0',
        fullContent: mockAgentContent,
        content: 'You are a test agent.'
      });
    });
  });

  describe('formatAgentForInstall', () => {
    test('should format agent with frontmatter', () => {
      const mockAgent = {
        name: 'test-agent',
        description: 'Test agent',
        frontmatter: {
          description: 'Test agent',
          tools: 'Read, Edit'
        },
        fullContent: `---
name: test-agent
description: Test agent
tools: Read, Edit
---

You are a test agent.`
      };
      
      const formatted = formatAgentForInstall(mockAgent);
      
      expect(formatted).toContain('---');
      expect(formatted).toContain('name: test-agent');
      expect(formatted).toContain('description: Test agent');
      expect(formatted).toContain('tools: Read, Edit');
      expect(formatted).toContain('You are a test agent.');
    });
  });

  describe('loadAgent', () => {
    test('should return null when agent directory does not exist', async () => {
      fs.existsSync.mockReturnValue(false);
      
      const agent = await loadAgent('/mock/agent-dir');
      
      expect(agent).toBeNull();
    });

    test('should load agent with all properties', async () => {
      const mockMetadata = {
        name: 'test-agent',
        description: 'Test agent',
        version: '1.0.0'
      };
      
      const mockAgentContent = `---
name: test-agent
description: Test agent
tools: Read, Edit
---

You are a test agent.`;

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes('metadata.json')) {
          return JSON.stringify(mockMetadata);
        }
        if (filePath.includes('hooks.json')) {
          return '{}';
        }
        return mockAgentContent;
      });
      
      const agent = await loadAgent('/mock/agent-dir');
      
      expect(agent).toMatchObject({
        name: 'test-agent',
        description: 'Test agent',
        version: '1.0.0',
        fullContent: mockAgentContent,
        metadata: mockMetadata
      });
    });
  });
});