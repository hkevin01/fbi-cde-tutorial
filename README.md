# FBI Crime Data Explorer - Interactive Tutorial System

> A modern, interactive onboarding system for the FBI's Crime Data Explorer website, inspired by mobile game tutorial patterns (like Pokémon GO) adapted for web applications.

## 🚀 Quick Start with Docker

**Prerequisites:** Only Docker and Docker Compose are required!

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fbi-cde-tutorial
   ```

2. **Start the development environment**
   ```bash
   ./scripts/dev-start.sh
   ```

3. **Open your browser**
   - Application: http://localhost:3000
   - The tutorial will start automatically

4. **Stop the environment when done**
   ```bash
   ./scripts/dev-stop.sh
   ```

That's it! No Node.js, Python, or other dependencies needed on your host machine.

## 📋 Development Commands

| Command                        | Description                   |
| ------------------------------ | ----------------------------- |
| `./scripts/dev-start.sh`       | Start development environment |
| `./scripts/dev-stop.sh`        | Stop development environment  |
| `./scripts/dev-logs.sh`        | View application logs         |
| `./scripts/dev-logs.sh app`    | View only app logs            |
| `./scripts/dev-logs.sh python` | View Python environment logs  |
| `./scripts/dev-reset.sh`       | Reset entire environment      |

## 📦 What's Inside the Containers

### Main Application (`app` service)
- **Next.js 14+** with App Router
- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Joyride** for tutorial functionality
- **Zustand** for state management
- Hot reloading enabled

### Python Environment (`python-env` service)
- **Python 3.11** with virtual environment
- **Data analysis tools**: pandas, numpy, matplotlib
- **Development tools**: pytest, black, pylint
- **Jupyter notebook** support

### Development Tools (`tools` service)
- Docker management utilities
- Git tools
- System monitoring tools
- Additional development utilities

## 🎨 Project Features

### 🎮 Tutorial System
- **Progressive Disclosure**: Learn one concept at a time
- **Interactive Learning**: Hands-on interaction with UI elements
- **Visual Guidance**: Spotlights, arrows, and animations
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile Responsive**: Works on all devices

### 📊 Mock FBI CDE Interface
- Realistic crime data visualization
- Interactive filtering controls
- Time-based analysis tools
- Geographic data representation
- Export and sharing capabilities

### 🚀 Performance Optimized
- Bundle size < 500KB gzipped
- Initial load < 3 seconds
- Smooth 60fps animations
- Efficient state management

## 🛠️ Development Workflow

### Making Changes
1. Edit files in your host editor (changes sync automatically)
2. View changes instantly with hot reloading
3. Use Docker containers for consistent environment

### Running Tests
```bash
# Access the application container
docker-compose exec app bash

# Run tests inside container
npm test
npm run test:e2e
npm run lint
```

### Python Development
```bash
# Access Python environment
docker-compose exec python-env bash

# Run Python scripts
python scripts/data-analysis.py

# Install additional packages
pip install package-name
```

## 📊 File Structure

```
fbi-cde-tutorial/
├── src/                          # Next.js application source
│   ├── app/                      # Next.js App Router
│   ├── components/               # React components
│   │   ├── tutorial/            # Tutorial-specific components
│   │   ├── ui/                 # Shared UI components
│   │   └── explorer/           # Mock FBI CDE interface
│   ├── lib/                     # Utilities and configurations
│   ├── hooks/                   # Custom React hooks
│   └── types/                   # TypeScript definitions
├── scripts/                      # Development and deployment scripts
├── data/                        # Data files and processing
├── assets/                      # Static assets
├── docs/                        # Project documentation
├── memory-bank/                 # Project memory and decisions
├── tests/                       # Test files
├── docker-compose.yml           # Development environment
├── Dockerfile                   # Production build
├── Dockerfile.dev               # Development environment
└── Dockerfile.python            # Python environment
```

## 🌎 Environment Variables

Copy `.env.example` to `.env.development`:
```bash
cp .env.example .env.development
```

Key variables:
- `TUTORIAL_DEBUG=true` - Enable debug mode
- `TUTORIAL_SKIP_INTRO=false` - Skip intro animation
- `USE_MOCK_DATA=true` - Use mock crime data
- `ENABLE_PERFORMANCE_MONITORING=true` - Track performance

## 🛡️ Security Considerations

- No sensitive data in repository
- Environment variables for configuration
- Docker containers run with minimal privileges
- Regular dependency security updates
- Content Security Policy in production

## 📊 Performance Targets

| Metric               | Target          | Current     |
| -------------------- | --------------- | ----------- |
| Bundle Size          | < 500KB gzipped | ✅ Optimized |
| Initial Load         | < 3 seconds     | ✅ Fast      |
| Tutorial Transitions | < 300ms         | ✅ Smooth    |
| Mobile Performance   | > 90 Lighthouse | 🏃 Testing   |
| Accessibility        | WCAG 2.1 AA     | ✅ Compliant |

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Stop any running containers
docker-compose down

# Check what's using port 3000
lsof -i :3000
```

**Container won't start:**
```bash
# View detailed logs
docker-compose logs app

# Reset everything
./scripts/dev-reset.sh
```

**Hot reloading not working:**
```bash
# Restart with fresh containers
docker-compose restart app
```

## 🚀 Production Deployment

For production deployment:

1. **Build production image:**
   ```bash
   docker build -t fbi-cde-tutorial:latest .
   ```

2. **Run production container:**
   ```bash
   docker run -d \
     --name fbi-tutorial \
     -p 3000:3000 \
     --env-file .env.production \
     fbi-cde-tutorial:latest
   ```

## 🤝 Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for development guidelines.

## 📖 Documentation

- [Project Plan](docs/project-plan.md) - Detailed development roadmap
- [Architecture Decisions](memory-bank/architecture-decisions/) - Technical decisions
- [Implementation Plans](memory-bank/implementation-plans/) - Development approach

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.
