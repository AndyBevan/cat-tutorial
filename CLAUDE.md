# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains **SpecKit**, a specification-driven development workflow for Claude Code. It provides structured commands and templates for feature development following a disciplined spec → plan → tasks → implement flow.

## Key Commands (Slash Commands)

The workflow follows this sequence:

1. `/speckit.constitution` - Create or update project principles and governance rules
2. `/speckit.specify <description>` - Generate feature specification from natural language
3. `/speckit.clarify` - Identify and resolve ambiguities in the spec (up to 5 questions)
4. `/speckit.plan` - Create technical implementation plan with research, data model, and contracts
5. `/speckit.tasks` - Generate dependency-ordered task list organized by user story
6. `/speckit.analyze` - Cross-artifact consistency analysis (read-only)
7. `/speckit.checklist <domain>` - Generate requirement quality checklists (e.g., `ux`, `api`, `security`)
8. `/speckit.implement` - Execute the task plan phase by phase
9. `/speckit.taskstoissues` - Convert tasks to GitHub issues (requires GitHub MCP server)

## Architecture

### Directory Structure

```
.specify/
├── memory/
│   └── constitution.md          # Project principles (non-negotiable rules)
├── scripts/powershell/          # Automation scripts
│   ├── check-prerequisites.ps1  # Validates feature context, returns JSON
│   ├── create-new-feature.ps1   # Creates branch and spec directory
│   ├── setup-plan.ps1           # Initializes plan artifacts
│   └── update-agent-context.ps1 # Updates agent-specific context files
└── templates/                   # Document templates
    ├── spec-template.md         # Feature specification structure
    ├── plan-template.md         # Implementation plan structure
    ├── tasks-template.md        # Task list structure
    ├── checklist-template.md    # Checklist structure
    └── agent-file-template.md   # Agent context template

.claude/commands/                # Slash command definitions
└── speckit.*.md                 # Each command's execution logic

specs/<###-feature-name>/        # Per-feature artifacts (created by workflow)
├── spec.md                      # Feature specification
├── plan.md                      # Implementation plan
├── research.md                  # Technical research decisions
├── data-model.md                # Entity definitions
├── contracts/                   # API contracts (OpenAPI/GraphQL)
├── quickstart.md                # Integration scenarios
├── tasks.md                     # Ordered task list
└── checklists/                  # Requirement quality checklists
```

### Key Concepts

- **Constitution**: Non-negotiable project principles in `.specify/memory/constitution.md`. Constitution violations are always CRITICAL severity.
- **User Stories**: Specs organize requirements as prioritized (P1, P2, P3) independently-testable user journeys
- **Task Organization**: Tasks are grouped by user story with `[US1]`, `[US2]` labels. `[P]` marks parallelizable tasks.
- **Checklists**: "Unit tests for requirements" - validate requirement quality, not implementation behavior
- **Phases**: Setup → Foundational (blocking) → User Stories (by priority) → Polish

### Script Usage

All PowerShell scripts output JSON when called with `-Json` flag. Common patterns:

```powershell
# Get feature context
.specify/scripts/powershell/check-prerequisites.ps1 -Json

# With tasks included
.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks

# Create new feature branch
.specify/scripts/powershell/create-new-feature.ps1 -Json -Number 5 -ShortName "user-auth" "Add user authentication"
```

## Workflow Rules

- Specs focus on WHAT and WHY, never HOW (no tech stack details)
- Plans fill technical context and generate research.md, data-model.md, contracts/
- Tasks must follow strict format: `- [ ] T### [P?] [US#?] Description with file path`
- Implementation marks tasks complete in tasks.md as `- [X]`
- Checklists validate requirement quality (completeness, clarity, consistency), not implementation behavior
