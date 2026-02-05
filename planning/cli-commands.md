# CLI Commands Log

This document tracks the CLI commands used during the development of YAGRG, along with their purpose.

## Project Initialization

| Command                                                                                                                                         | Purpose                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `npm install -g pnpm`                                                                                                                           | Installs pnpm globally for faster package management.                                               |
| `npx -p @angular/cli@latest ng new yagrg --style=scss --routing=true --ssr=false --standalone=false --package-manager=pnpm --strict --skip-git` | Generates the Angular workspace with strict settings, SCSS, Routing, and NgModules (No Standalone). |
| `git init`                                                                                                                                      | Initializes the git repository.                                                                     |
| `git add . && git commit -m "chore: initial project setup"`                                                                                     | Creates the initial commit.                                                                         |

## Dependency Installation

| Command                                                                      | Purpose                                                |
| :--------------------------------------------------------------------------- | :----------------------------------------------------- |
| `pnpm add @ngrx/store @ngrx/effects @ngrx/router-store @ngrx/store-devtools` | Installs NgRx for state management.                    |
| `pnpm add @ng-bootstrap/ng-bootstrap bootstrap`                              | Installs ng-bootstrap and Bootstrap for UI components. |
| `pnpm add -D eslint prettier husky commitlint ...`                           | Installs development tools (Linting, Hooks, Docs).     |

## Tooling Configuration

| Command                           | Purpose                           |
| :-------------------------------- | :-------------------------------- |
| `pnpm exec husky init`            | Initializes Husky git hooks.      |
| `echo ... > commitlint.config.js` | Creates Commitlint configuration. |
| `echo ... > .prettierrc`          | Creates Prettier configuration.   |
| `echo ... > .stylelintrc.json`    | Creates Stylelint configuration.  |
