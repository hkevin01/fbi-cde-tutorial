# Contributing to FBI Crime Data Explorer Tutorial

## Welcome

Thank you for your interest in contributing to the FBI Crime Data Explorer Interactive Tutorial System! This project aims to make government data more accessible through modern user experience design.

## Code of Conduct

This project follows a professional code of conduct. Please be respectful, inclusive, and constructive in all interactions.

## Development Setup

### Prerequisites
- Node.js 18+
- Docker (for containerized development)
- Git

### Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run development server: `npm run dev`
5. Run tests: `npm test`

## Project Structure

```
src/
├── components/          # React components
│   ├── tutorial/       # Tutorial-specific components
│   ├── ui/            # Shared UI components
│   └── explorer/      # Mock FBI CDE interface
├── lib/               # Utilities and configurations
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## Development Guidelines

### Code Quality
- Write TypeScript with strict type checking
- Follow existing code patterns and conventions
- Add comprehensive comments for complex logic
- Ensure accessibility (WCAG 2.1 AA compliance)
- Write tests for new functionality

### Commit Guidelines
- Use conventional commit format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep commits atomic and focused
- Write descriptive commit messages

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes with tests
3. Update documentation if needed
4. Ensure all tests pass
5. Create a pull request with clear description
6. Address review feedback promptly

## Testing

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Custom test utilities
- **E2E Tests**: Playwright
- **Accessibility Tests**: axe-core

Run tests with: `npm test`
Run E2E tests with: `npm run test:e2e`

## Documentation

- Update README.md for user-facing changes
- Update docs/ for technical documentation
- Add JSDoc comments for public APIs
- Update memory-bank/ for architectural decisions

## Performance Guidelines

- Optimize bundle size (target < 500KB gzipped)
- Use React.memo() for expensive components
- Implement proper cleanup in useEffect
- Lazy load non-critical components
- Monitor Core Web Vitals

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Proper ARIA labels and roles
- Color contrast ratios meet WCAG standards
- Screen reader compatibility
- Focus management in tutorial flows

## Tutorial Content Guidelines

- Keep explanations concise and actionable
- Use progressive disclosure principles
- Test with actual target users
- Provide skip options for experienced users
- Ensure content is government-appropriate

## Questions and Support

- Check existing issues before creating new ones
- Use clear, descriptive issue titles
- Provide reproduction steps for bugs
- Include browser/OS information for compatibility issues

## Recognition

Contributors will be recognized in the project documentation and change log. Thank you for helping make government data more accessible!
