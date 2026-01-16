# ADR-001: Tutorial Engine Choice

## Status
Accepted

## Context
We need to choose a tutorial/onboarding library that provides:
- Step-by-step guided tours
- Element highlighting and spotlights
- Customizable tooltips and popovers
- Mobile-responsive design
- Accessibility support
- Integration with React/Next.js

## Decision
We will use **React Joyride** as the primary tutorial engine with custom components for enhanced functionality.

## Options Considered

### 1. React Joyride
**Pros:**
- Mature library with active maintenance
- Excellent React integration
- Highly customizable
- Built-in accessibility features
- Spotlight and overlay system
- Good TypeScript support

**Cons:**
- Larger bundle size
- Some advanced customizations require workarounds

### 2. Shepherd.js
**Pros:**
- Framework agnostic
- Highly customizable
- Good positioning system

**Cons:**
- Less React-native feel
- More manual setup required
- Smaller community

### 3. Driver.js
**Pros:**
- Lightweight
- Simple API
- Good performance

**Cons:**
- Limited React integration
- Less customization options
- No built-in progress tracking

### 4. Custom Solution
**Pros:**
- Complete control
- Optimized for our specific needs
- No external dependencies

**Cons:**
- Significant development time
- Maintenance overhead
- Accessibility features need implementation

## Rationale
React Joyride provides the best balance of features, React integration, and customization options. The additional bundle size is acceptable given the rich feature set and the fact that tutorial functionality is core to our application.

## Consequences

### Positive
- Faster development with proven library
- Built-in accessibility compliance
- Rich feature set out of the box
- Good TypeScript integration
- Active community support

### Negative
- Dependency on external library
- Bundle size increase (~50KB gzipped)
- Some customizations may require CSS overrides

### Mitigation Strategies
- Code splitting to load tutorial engine only when needed
- Custom wrapper components for consistent styling
- Fallback graceful degradation if library fails

## Implementation Notes
- Wrap React Joyride in custom provider component
- Create reusable tooltip and spotlight components
- Implement progress persistence with Zustand
- Add custom animations with Framer Motion

## Review Date
This decision should be reviewed after initial implementation (approximately 4 weeks from adoption).