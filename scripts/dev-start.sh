#!/bin/bash

# FBI CDE Tutorial - Development Environment Startup Script
# This script starts the development environment using Docker

set -e  # Exit on any error

echo "🚀 Starting FBI Crime Data Explorer Tutorial Development Environment"
echo "================================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Create necessary directories
mkdir -p data/{raw,processed,temp}
mkdir -p assets/{images,animations,icons}
mkdir -p logs

# Create .env.development if it doesn't exist
if [ ! -f .env.development ]; then
    echo "📝 Creating development environment file..."
    cp .env.example .env.development
    echo "✅ Created .env.development"
fi

# Build and start the development environment
echo "🔨 Building development containers..."
docker compose build app

echo "🏃 Starting development services..."
docker compose up -d app

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 15

# Check if the application is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Development environment is ready!"
    echo "📱 Application: http://localhost:3000"
    echo "🐳 Docker containers:"
    docker compose ps
    echo ""
    echo "📋 Useful commands:"
    echo "   docker compose logs -f app       # View application logs"
    echo "   docker compose exec app bash     # Access application container"
    echo "   ./scripts/dev-stop.sh            # Stop development environment"
    echo "   ./scripts/dev-logs.sh            # View all logs"
else
    echo "❌ Application failed to start. Check logs with: docker compose logs app"
    echo "Logs:"
    docker compose logs app
    exit 1
fi
