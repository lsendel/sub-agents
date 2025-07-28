import yaml from 'yaml';

/**
 * Parse YAML frontmatter with support for Claude Code format
 * Claude Code uses unquoted long descriptions with \n escape sequences
 */
export function parseYamlFrontmatter(yamlContent) {
  try {
    // First try standard YAML parsing
    return yaml.parse(yamlContent);
  } catch (e) {
    // If standard parsing fails, try Claude Code format
    return parseClaudeCodeFormat(yamlContent);
  }
}

/**
 * Parse Claude Code's specific YAML format
 * Handles unquoted multi-line descriptions with \n
 */
function parseClaudeCodeFormat(yamlContent) {
  const result = {};
  const lines = yamlContent.split('\n');
  let currentKey = null;
  let currentValue = '';
  let inMultilineValue = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) continue;

    // Check if this is a new key-value pair
    const keyMatch = /^(\w+):\s*(.*)$/.exec(line);

    if (keyMatch && !inMultilineValue) {
      // Save previous key-value if exists
      if (currentKey) {
        result[currentKey] = processValue(currentValue.trim());
      }

      currentKey = keyMatch[1];
      currentValue = keyMatch[2];

      // Check if this is a multi-line value (contains \n or very long)
      if (
        currentKey === 'description' &&
        (currentValue.includes('\\n') || currentValue.length > 100)
      ) {
        inMultilineValue = true;
      } else {
        // Single line value - save it immediately
        result[currentKey] = processValue(currentValue);
        currentKey = null;
        currentValue = '';
      }
    } else if (inMultilineValue) {
      // Check if this line starts a new key (not part of description)
      const nextKeyMatch = /^(name|tools|color|version|author|tags):\s*/.exec(
        line,
      );

      if (nextKeyMatch) {
        // End of multi-line value
        result[currentKey] = processValue(currentValue.trim());
        inMultilineValue = false;

        // Process this line as a new key
        i--; // Reprocess this line
        currentKey = null;
        currentValue = '';
      } else {
        // Continue multi-line value
        currentValue += ' ' + line.trim();
      }
    }
  }

  // Save last key-value if exists
  if (currentKey) {
    result[currentKey] = processValue(currentValue.trim());
  }

  return result;
}

/**
 * Process a value - handle different formats
 */
function processValue(value) {
  // Remove surrounding quotes if present
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith('\'') && value.endsWith('\''))
  ) {
    value = value.slice(1, -1);
  }

  // Handle empty values
  if (value === '""' || value === '\'\'') {
    return '';
  }

  // Handle boolean values
  if (value === 'true') return true;
  if (value === 'false') return false;

  // Handle numeric values
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value);

  return value;
}

/**
 * Extract YAML frontmatter from markdown content
 */
export function extractFrontmatter(content) {
  const frontmatterMatch = /^---\n([\s\S]*?)\n---/.exec(content);

  if (!frontmatterMatch) {
    return { frontmatter: null, content };
  }

  const yamlContent = frontmatterMatch[1];
  const frontmatter = parseYamlFrontmatter(yamlContent);
  const remainingContent = content.replace(frontmatterMatch[0], '').trim();

  return { frontmatter, content: remainingContent };
}
