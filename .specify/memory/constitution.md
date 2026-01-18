<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: N/A (initial)
Added sections:
  - Core Principles (3 principles)
  - Technical Standards
  - Development Workflow
  - Governance
Removed sections: N/A (initial)
Templates validated:
  - .specify/templates/plan-template.md ✅ (Constitution Check section compatible)
  - .specify/templates/spec-template.md ✅ (requirements format compatible)
  - .specify/templates/tasks-template.md ✅ (phase structure compatible)
Follow-up TODOs: None
-->

# Cat Tutorial Constitution

## Core Principles

### I. Code Quality

All code MUST be clean, readable, and maintainable. This principle is non-negotiable.

- Code MUST follow established conventions for React (frontend) and .NET (backend)
- Functions and methods MUST have a single responsibility
- Variable and function names MUST be descriptive and self-documenting
- Code duplication MUST be eliminated through appropriate abstractions
- All public APIs MUST be documented with clear parameter and return type descriptions
- Code reviews MUST verify adherence to these standards before merge

**Rationale**: A tutorial project serves as an educational reference. Poor code quality
undermines the learning experience and creates technical debt that compounds over time.

### II. Testing

All features MUST have appropriate test coverage. Testing is the foundation of reliable software.

- Unit tests MUST cover all business logic and service methods
- Integration tests MUST verify API endpoints and database interactions
- Frontend components MUST have component tests for user interactions
- Tests MUST be written before or alongside implementation (TDD encouraged)
- Test coverage MUST NOT decrease with new changes
- All tests MUST pass before code can be merged to main branch

**Rationale**: Tests provide confidence in refactoring, catch regressions early, and serve
as living documentation of expected behavior.

### III. Simplicity

Solutions MUST be as simple as possible, but no simpler. Complexity is the enemy of maintainability.

- YAGNI (You Aren't Gonna Need It): Do not implement features until they are needed
- KISS (Keep It Simple, Stupid): Prefer straightforward solutions over clever ones
- Premature optimization MUST be avoided; measure before optimizing
- Dependencies MUST be justified; prefer fewer, well-maintained libraries
- Architecture decisions MUST be documented when deviating from simple patterns
- If a junior developer cannot understand the code, it is too complex

**Rationale**: Complex code is harder to debug, test, and maintain. Simple code is easier
to reason about and less prone to bugs.

## Technical Standards

The Cat Tutorial project uses the following technology stack:

- **Frontend**: React with TypeScript
- **Backend**: .NET 10 (C#)
- **API Communication**: RESTful APIs with JSON
- **Code Style**: ESLint/Prettier (frontend), .NET conventions (backend)

All technical decisions MUST align with these standards unless explicitly justified and
documented in the relevant plan.md file.

## Development Workflow

All development MUST follow the SpecKit workflow:

1. **Specification First**: Features begin with a clear spec.md defining WHAT and WHY
2. **Planning Before Implementation**: Technical decisions documented in plan.md
3. **Task-Driven Development**: Work organized in tasks.md with clear dependencies
4. **Incremental Delivery**: User stories implemented and tested independently
5. **Documentation**: Changes reflected in appropriate documentation

Pull requests MUST:
- Reference the related feature specification
- Include appropriate tests
- Pass all CI checks
- Receive at least one approval before merge

## Governance

This constitution represents the foundational principles for the Cat Tutorial project.
All development decisions, code reviews, and architectural choices MUST comply with
these principles.

**Amendment Process**:
1. Proposed amendments MUST be documented with rationale
2. Amendments require explicit approval from project maintainers
3. Version number MUST be updated following semantic versioning:
   - MAJOR: Principle removal or fundamental redefinition
   - MINOR: New principle or section added
   - PATCH: Clarifications and wording improvements
4. All dependent templates MUST be reviewed for consistency after amendments

**Compliance**:
- All pull requests MUST pass constitution compliance review
- Violations MUST be flagged as CRITICAL and resolved before merge
- Exceptions require documented justification and maintainer approval

**Version**: 1.0.0 | **Ratified**: 2025-01-18 | **Last Amended**: 2025-01-18
