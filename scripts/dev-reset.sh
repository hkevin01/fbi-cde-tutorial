#!/bin/bash

# FBI CDE Tutorial - Reset Development Environment
# This script completely resets the development environment

set -e

echo "🔄 Resetting FBI Crime Data Explorer Tutorial Development Environment"
echo "====================================================================="
echo "⚠️  Warning: This will remove all containers, volumes, and cached data!"
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Reset cancelled."
    exit 1
fi

echo "🧹 Stopping and removing all containers..."
docker-compose down

echo "🗑️  Removing volumes..."
docker-compose down -v

echo "📦 Removing images..."
docker-compose down --rmi all || true

echo "🧽 Removing Docker build cache..."
docker system prune -f

echo "📁 Cleaning local files..."
rm -rf .next/
rm -rf node_modules/.cache/
rm -rf logs/*
rm -rf data/temp/*

echo "✅ Development environment reset complete!"
echo "🚀 Run './scripts/dev-start.sh' to rebuild and start fresh."
