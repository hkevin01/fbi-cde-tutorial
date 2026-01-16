#!/bin/bash

# FBI CDE Tutorial - Development Environment Stop Script

set -e

echo "🛑 Stopping FBI Crime Data Explorer Tutorial Development Environment"
echo "==================================================================="

# Stop all services
echo "📦 Stopping Docker containers..."
docker compose down

echo "✅ Development environment stopped successfully!"
echo "💡 To start again, run: ./scripts/dev-start.sh"
