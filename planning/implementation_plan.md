# Implementation Plan - YAGRG (Yet Another GitHub README Generator)

## Goal Description
Build a production-quality, frontend-only Angular application named **YAGRG** for generating GitHub Profile and Project READMEs. The app will be hosted on GitHub Pages, utilize NgRx for state management, and strict architectural patterns.

## User Review Required
> [!IMPORTANT]
> The user explicitly requested **No Standalone Components** and **NgModules**. This is a deviation from the modern Angular default but will be strictly followed.

> [!NOTE]
> 100% Unit Test Coverage is a strict requirement.
> `pnpm` will be used as the package manager.

## Proposed Architecture

### Tech Stack
- **Framework**: Angular (Latest)
- **State Management**: NgRx (Store, Effects, Router Store)
- **UI Framework**: ng-bootstrap + Bootstrap 5 (SCSS)

### Styling (SCSS)
- **Global SCSS Variables**: Define comprehensive color palettes, spacing, and typography to override Bootstrap defaults.
- **Modern Aesthetic**: Focus on "Premium" design (glassmorphism, gradients, subtle shadows) to ensure the app looks state-of-the-art and not like a standard Bootstrap site. `ng-bootstrap` will be used for functionality, but visual styles will be heavily customized.
- **Micro-interactions**: **MANDATORY** usage of `cubic-bezier` curves for all transitions (e.g., `cubic-bezier(0.25, 0.8, 0.25, 1)`) to ensure smooth, organic motion.
- **Theming**: robust Light/Dark mode implementation using CSS variables and SCSS maps.

### UI Framework (ng-bootstrap)
- Use for functional components (Modals, Tooltips, Typeahead).
- **Strictly overwrite** default Bootstrap styles to match the "Modern" aesthetic.
- **No Standalone Components**: Strictly use `NgModules` for all declarations.
- **Build Tool**: Angular CLI
### Deployment & CI/CD
- **GitHub Actions**: Automated pipeline for linting, testing, and deployment.

## Methodology: Test-Driven Development (TDD)
- **Strict TDD**: All features will be implemented by writing a failing test first, then the implementation code.
- **Cycle**: Red (Test Fails) -> Green (Test Passes) -> Refactor.
- **Coverage**: 100% coverage will be enforced and verified at each step.

### Directory Structure
```
src/
  app/
    core/           # Singletons, Services, Guards, Interceptors
    shared/         # Reusable Dumb Components, Pipes, Directives
    features/       # Lazy Loaded Modules
      profile/      # Profile Generator Feature
      project/      # Project Generator Feature
      preview/      # Live Preview Feature
    store/          # Root State
  assets/
  environments/
```

### State Management (NgRx)
- **Root State**: `AppState` (Theme, Global Config)
- **Feature States**: 
  - `profile`: content, settings
  - `project`: content, settings

### Modules
- `AppModule`: Root module, imports CoreModule, SharedModule.
- `CoreModule`: Provides global services.
- `SharedModule`: Exports common UI components.
- `ProfileModule`: Lazy loaded, contains profile generator forms.
- `ProjectModule`: Lazy loaded, contains project generator forms.
- `PreviewModule`: Lazy loaded (or shared if tight coupling needed, likely lazy for separation).

## Verification Plan

### Automated Tests
- `pnpm test -- --code-coverage`: Run unit tests with coverage report.
- `pnpm lint`: Ensure coding standards.

### Manual Verification
- Verify Lazy Loading via Network tab in DevTools.
- Verify State changes via Redux DevTools.
- Verify Markdown generation accuracy by copying to a real GitHub repo.
- Verify Light/Dark mode toggle.
