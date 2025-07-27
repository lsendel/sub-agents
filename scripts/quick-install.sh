#!/bin/bash

# Quick install script for newly created agents
# Usage: ./scripts/quick-install.sh <agent-name>

if [ -z "$1" ]; then
    echo "Usage: $0 <agent-name>"
    echo "Example: $0 requirements-analyst"
    exit 1
fi

AGENT_NAME=$1

# Check if agent exists in agents directory
if [ ! -d "agents/$AGENT_NAME" ]; then
    echo "Error: Agent '$AGENT_NAME' not found in agents/ directory"
    exit 1
fi

echo "Installing agent: $AGENT_NAME"
npm start -- install "$AGENT_NAME"