# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

### Critical Security Issues

For critical security vulnerabilities that could affect user data or system integrity:

1. **DO NOT** create a public GitHub issue
2. Send details to the project maintainers privately
3. Include detailed reproduction steps
4. Allow up to 48 hours for initial response

### General Security Concerns

For general security improvements or non-critical issues:

1. Create a GitHub issue with the "security" label
2. Provide clear description of the concern
3. Suggest potential solutions if possible

## Security Considerations

### Data Protection
- No personal data is collected without explicit consent
- Tutorial progress is stored locally only
- No sensitive government data is embedded in the application
- All external dependencies are regularly audited

### Content Security
- Content Security Policy (CSP) implemented
- No inline scripts or styles
- All external resources are from trusted sources
- Input validation for all user interactions

### Infrastructure Security
- Docker containers run with minimal privileges
- No sensitive environment variables in builds
- Regular dependency updates via automated scanning
- HTTPS enforced in production

### Accessibility and Security
- Keyboard navigation doesn't bypass security measures
- Screen readers don't expose sensitive information
- Focus management doesn't create security vulnerabilities

## Development Security Practices

### Code Review
- All code changes require review
- Security implications considered in reviews
- Automated security scanning in development

### Dependencies
- Regular dependency updates
- Vulnerability scanning with npm audit
- No dependencies with known security issues
- Minimal dependency surface area

### Environment Security
- Environment variables properly managed
- No secrets in repository
- Development and production isolation
- Secure defaults in configuration

## Incident Response

In case of a security incident:

1. **Assessment**: Evaluate scope and impact
2. **Containment**: Isolate affected systems
3. **Communication**: Notify users if necessary
4. **Remediation**: Apply fixes and updates
5. **Documentation**: Record incident and lessons learned

## Security Updates

Security updates will be:
- Released as soon as possible after discovery
- Clearly marked in release notes
- Communicated through appropriate channels
- Backward compatible when possible

## Contact

For security-related questions or concerns, please refer to the project documentation or create an appropriately labeled issue.

## Acknowledgments

We appreciate security researchers and contributors who help keep this project secure. Responsible disclosure is appreciated and will be acknowledged in project documentation.
