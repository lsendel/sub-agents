# Claude Sub-Agents Improvements Guide

This guide outlines improvements to make your sub-agents more effective and better aligned with Claude Code's official implementation.

## Summary of Improvements

### 1. **Description Enhancement** ✨
Improve descriptions to clearly indicate when Claude should use each agent:

```yaml
# Before
description: Expert code review specialist. Proactively reviews code...

# After  
description: Use after writing or modifying code to review for quality, security, performance, and best practices
```

### 2. **Focused System Prompts** 🎯
Make agents more focused and single-purpose:
- Clear role definition
- Step-by-step process
- Specific output format
- Defined scope limitations

### 3. **Tool Optimization** 🛠️
Only include tools each agent actually needs:

| Agent | Current Tools | Optimized Tools | Reasoning |
|-------|--------------|-----------------|-----------|
| code-reviewer | Read, Edit, Grep, Glob, Bash | Read, Grep, Glob | Reviewers shouldn't modify code |
| security-scanner | Read, Grep, Glob, Bash | Read, Grep, Glob | Scanning is read-only |
| doc-writer | Read, Edit, Grep, Glob | Read, Write, Edit, Grep, Glob | Need Write for new docs |
| refactor | Read, Edit, Grep, Glob | Read, Edit, MultiEdit, Grep, Glob | MultiEdit for efficiency |

### 4. **Installation Process** 📦
The updated installation process now:
- Validates agent format
- Optimizes descriptions for automatic delegation
- Generates cleaner files for Claude Code
- Maintains backward compatibility

## Implementation Steps

### Step 1: Run Migration Script
```bash
node scripts/migrate-agents.js
```

This creates `agent-improved.md` files for each agent with:
- Optimized descriptions
- Cleaned YAML frontmatter
- Preserved system prompts

### Step 2: Review and Update
1. Compare original vs improved agents
2. Test in Claude Code
3. Replace original files if satisfied

### Step 3: Update Installation
The install command now uses the optimizer automatically:
```javascript
// New installation flow
1. Load agent details
2. Validate format
3. Optimize for Claude Code
4. Write single .md file
```

## Best Practices for New Agents

### 1. Naming
- Use lowercase with hyphens: `my-agent-name`
- Be descriptive but concise

### 2. Description
Start with "Use to" or "Use when":
```yaml
description: Use when debugging errors, analyzing stack traces, or fixing crashes
```

### 3. Tools
Only include necessary tools:
```yaml
tools: Read, Grep, Glob  # Minimal set for read-only operations
```

### 4. System Prompt Structure
```markdown
You are [ROLE with expertise]. Your sole responsibility is [SPECIFIC PURPOSE].

## Immediate Actions
1. [First thing to do]
2. [Second thing to do]

## Core Process
[Detailed steps]

## Output Format
[Specific format with examples]

## Scope Limitations
DO NOT:
- [What not to do]

FOCUS ON:
- [What to focus on]
```

## Testing Your Improvements

1. **Install Updated Agent**
   ```bash
   claude-agents install code-reviewer --project
   ```

2. **Test in Claude Code**
   ```
   > Can you review my recent changes?
   [Claude should automatically use code-reviewer]
   ```

3. **Check Delegation**
   - Does Claude recognize when to use the agent?
   - Is the agent focused on its specific task?
   - Is the output format consistent?

## Future Enhancements

Consider adding:
1. **Priority field** for agent selection
2. **Tags** for categorization
3. **Examples** in system prompts
4. **Version** tracking
5. **Dependencies** between agents

## Resources

- [Official Sub-Agents Docs](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Claude Code Settings](https://docs.anthropic.com/en/docs/claude-code/settings)
- [Best Practices](https://docs.anthropic.com/en/docs/claude-code/best-practices)