# Tasks: Cat Tutorial Website

**Input**: Design documents from `/specs/001-cat-tutorials/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Tests included per constitution requirement (II. Testing)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Project structure**: `src/` at repository root (Next.js App Router)
- **Tests**: `__tests__/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic Next.js structure

- [X] T001 Initialize Next.js 14+ project with TypeScript in project root
- [X] T002 [P] Configure next.config.js with static export, basePath, and assetPrefix per research.md
- [X] T003 [P] Install and configure Tailwind CSS v4 with custom 320px breakpoint in tailwind.config.js
- [X] T004 [P] Install Framer Motion and react-confetti-explosion dependencies
- [X] T005 [P] Configure Jest and React Testing Library with next/jest in jest.config.js
- [X] T006 [P] Create jest.setup.ts with Testing Library matchers and MotionConfig wrapper
- [X] T007 [P] Create global styles with cartoon aesthetic in src/styles/globals.css
- [X] T008 [P] Add .nojekyll file to public/ for GitHub Pages compatibility
- [X] T009 Create src/app/layout.tsx root layout with MotionConfig wrapper

**Checkpoint**: Development environment ready with all dependencies configured ✅

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, data structures, and shared components that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T010 Create TypeScript type definitions in src/data/tutorials/types.ts (Tutorial, TutorialStep, InteractiveElement, etc.)
- [X] T011 [P] Create Cat content entity types and data in src/data/cats.ts
- [X] T012 [P] Create Button component in src/components/ui/Button.tsx
- [X] T013 [P] Create Card component in src/components/ui/Card.tsx
- [X] T014 [P] Create Header component in src/components/layout/Header.tsx
- [X] T015 [P] Create Footer component in src/components/layout/Footer.tsx
- [X] T016 Create PageTransition animation component in src/components/animations/PageTransition.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin ✅

---

## Phase 3: User Story 1 - Browse Tutorials Homepage (Priority: P1) 🎯 MVP

**Goal**: Visitors see whimsical homepage with tutorial listings that establishes the comedic premise

**Independent Test**: Visit site URL, verify homepage loads with tutorial card showing "Count the Cats" with humorous description

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T017 [P] [US1] Component test for TutorialCard in __tests__/components/TutorialCard.test.tsx
- [X] T018 [P] [US1] Integration test for homepage tutorial listing in __tests__/pages/homepage.test.tsx

### Implementation for User Story 1

- [X] T019 [P] [US1] Create tutorial data index and helpers in src/data/tutorials/index.ts (getTutorialBySlug, getAllTutorialSlugs)
- [X] T020 [P] [US1] Create cat-counting tutorial data file in src/data/tutorials/cat-counting.ts
- [X] T021 [US1] Create TutorialCard component in src/components/tutorial/TutorialCard.tsx
- [X] T022 [US1] Create homepage in src/app/page.tsx with tutorial card listing

**Checkpoint**: Homepage functional - visitors can see available tutorials and click to navigate ✅

---

## Phase 4: User Story 2 - Complete Cat Counting Tutorial (Priority: P1) 🎯 MVP

**Goal**: Visitors experience the full interactive, humorous cat counting tutorial with completion celebration

**Independent Test**: Start tutorial, progress through all steps, reach completion screen with certificate

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T023 [P] [US2] Component test for TutorialStep in __tests__/components/TutorialStep.test.tsx
- [X] T024 [P] [US2] Component test for CompletionCertificate in __tests__/components/CompletionCertificate.test.tsx
- [X] T025 [P] [US2] Integration test for tutorial completion flow in __tests__/pages/tutorial.test.tsx

### Implementation for User Story 2

- [X] T026 [P] [US2] Create CatCharacter animation component in src/components/animations/CatCharacter.tsx
- [X] T027 [P] [US2] Create CelebrationEffect component in src/components/animations/CelebrationEffect.tsx
- [X] T028 [US2] Create interactive element components (ButtonElement, QuizElement, ClickableAreaElement) in src/components/tutorial/InteractiveElements.tsx
- [X] T029 [US2] Create TutorialStep component in src/components/tutorial/TutorialStep.tsx
- [X] T030 [US2] Create CompletionCertificate component in src/components/tutorial/CompletionCertificate.tsx
- [X] T031 [US2] Create useTutorialProgress hook in src/hooks/useTutorialProgress.ts
- [X] T032 [US2] Create dynamic tutorial page with generateStaticParams in src/app/tutorials/[slug]/page.tsx

**Checkpoint**: Tutorial fully playable - visitors can complete cat counting tutorial with celebration ✅

---

## Phase 5: User Story 3 - View Tutorial Navigation (Priority: P2)

**Goal**: Visitors can navigate between tutorial steps with progress indication

**Independent Test**: Load tutorial, use prev/next controls, verify step indicator updates correctly

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T033 [P] [US3] Component test for ProgressIndicator in __tests__/components/ProgressIndicator.test.tsx
- [X] T034 [P] [US3] Component test for StepNavigation in __tests__/components/StepNavigation.test.tsx

### Implementation for User Story 3

- [X] T035 [P] [US3] Create ProgressIndicator component in src/components/ui/ProgressIndicator.tsx
- [X] T036 [US3] Create StepNavigation component in src/components/tutorial/StepNavigation.tsx
- [X] T037 [US3] Integrate ProgressIndicator and StepNavigation into tutorial page src/app/tutorials/[slug]/page.tsx

**Checkpoint**: Navigation complete - visitors can track progress and move between steps ✅

---

## Phase 6: User Story 4 - Extensible Tutorial Structure (Priority: P3)

**Goal**: Website architecture supports adding new tutorials without redesign

**Independent Test**: Review that adding a new tutorial only requires a new data file and re-export

### Tests for User Story 4 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T038 [P] [US4] Unit test for tutorial data helpers (getTutorialBySlug, getAllTutorialSlugs) in __tests__/hooks/tutorials.test.ts

### Implementation for User Story 4

- [ ] T039 [US4] Create custom 404 page with cat-themed message in src/app/not-found.tsx
- [ ] T040 [US4] Add deep linking support via URL query params for tutorial steps in src/app/tutorials/[slug]/page.tsx
- [ ] T041 [US4] Document tutorial addition pattern in code comments in src/data/tutorials/index.ts

**Checkpoint**: Architecture complete - future tutorials can be added by following established pattern

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories

- [ ] T042 [P] Verify responsive design works on 320px screens across all pages
- [ ] T043 [P] Verify reduced motion accessibility with useReducedMotion in all animation components
- [ ] T044 [P] Add keyboard navigation support to interactive elements
- [ ] T045 Run full test suite and fix any failures
- [ ] T046 Build static export and verify all pages generate correctly
- [ ] T047 Run quickstart.md validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-6)**: All depend on Foundational phase completion
  - US1 and US2 are both P1 priority (core MVP)
  - US3 (P2) can start after Foundational
  - US4 (P3) can start after Foundational
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational - Uses tutorial data from US1
- **User Story 3 (P2)**: Can start after Foundational - Integrates with US2 tutorial page
- **User Story 4 (P3)**: Can start after Foundational - Depends on US1 data helpers

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Data/types before components
- Components before page integration
- Core implementation before polish
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T008)
- All Foundational tasks marked [P] can run in parallel (T011-T015)
- Once Foundational phase completes, all user stories can start in parallel
- All tests for a user story marked [P] can run in parallel
- Components marked [P] within a story can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "T017 [P] [US1] Component test for TutorialCard"
Task: "T018 [P] [US1] Integration test for homepage"

# Launch all data files for User Story 1 together:
Task: "T019 [P] [US1] Create tutorial data index"
Task: "T020 [P] [US1] Create cat-counting tutorial data"
```

---

## Parallel Example: User Story 2

```bash
# Launch all tests for User Story 2 together:
Task: "T023 [P] [US2] Component test for TutorialStep"
Task: "T024 [P] [US2] Component test for CompletionCertificate"
Task: "T025 [P] [US2] Integration test for tutorial completion"

# Launch all animation components for User Story 2 together:
Task: "T026 [P] [US2] Create CatCharacter animation"
Task: "T027 [P] [US2] Create CelebrationEffect"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Homepage)
4. Complete Phase 4: User Story 2 (Tutorial Content)
5. **STOP and VALIDATE**: Test both stories - this is a complete MVP!
6. Deploy to GitHub Pages

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Homepage works
3. Add User Story 2 → Test independently → Tutorial playable (MVP!)
4. Add User Story 3 → Test independently → Navigation enhanced
5. Add User Story 4 → Test independently → Extensibility complete
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Homepage)
   - Developer B: User Story 2 (Tutorial Content)
3. After US1 + US2 complete:
   - Developer A: User Story 3 (Navigation)
   - Developer B: User Story 4 (Extensibility)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests must fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
