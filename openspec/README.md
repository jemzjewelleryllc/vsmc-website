# OpenSpec Configuration for VSMC

All settings live under the `openspec-for-copilot` namespace.

## Settings

| Setting | Type | Default | Purpose |
|---------|------|---------|---------|
| `aiAgent` | string | `github-copilot` | Select which chat agent to use (github-copilot or codex) |
| `chatLanguage` | string | `English` | The language GitHub Copilot should use for responses |
| `copilot.specsPath` | string | `openspec` | Workspace-relative path for generated specs |
| `copilot.promptsPath` | string | `.github/prompts` | Workspace-relative path for Markdown prompts |
| `views.specs.visible` | boolean | `true` | Show or hide the Specs explorer |
| `views.prompts.visible` | boolean | `true` | Toggle the Prompts explorer |
| `views.steering.visible` | boolean | `true` | Toggle the Steering explorer |
| `views.settings.visible` | boolean | `true` | Toggle the Settings overview |
| `customInstructions.global` | string | `""` | Global custom instructions appended to all prompts |
| `customInstructions.createSpec` | string | `""` | Custom instructions for "Create Spec" |
| `customInstructions.startAllTask` | string | `""` | Custom instructions for "Start All Tasks" |
| `customInstructions.archiveChange` | string | `""` | Custom instructions for "Archive Change" |
| `customInstructions.runPrompt` | string | `""` | Custom instructions for "Run Prompt" |

> **Note:** In Codex mode, prompts are written to temporary Markdown files under `~/.codex/.tmp/` and sent via `chatgpt.addToThread`.

## Workspace Layout

```
.github/
├── prompts/                # Markdown prompts
├── agents/                 # Project agent definitions
openspec/
├── AGENTS.md               # Project-specific steering rules
├── project.md              # Project specification
├── <spec>/
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
```

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run install:all` | Install dependencies for extension and webview UI |
| `npm run build` | Build prompts and bundle the extension |
| `npm run watch` | TypeScript watch + webview dev server |
| `npm run build-prompts` | Generate prompt modules from markdown |
| `npm test` | Run unit tests (Vitest) |
| `npm run lint` | Run linting checks |
| `npm run package` | Produce a VSIX package |
