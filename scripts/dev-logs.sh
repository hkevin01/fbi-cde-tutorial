#!/bin/bash

# FBI CDE Tutorial - View Development Logs

set -e

echo "📋 FBI Crime Data Explorer Tutorial - Development Logs"
echo "===================================================="

if [ "$1" = "app" ]; then
    echo "📱 Application logs:"
    docker compose logs -f app
else
    echo "📊 All service logs (use Ctrl+C to exit):"
    echo "   Use './scripts/dev-logs.sh app' to view only application logs"
    echo ""
    docker compose logs -f
fi
