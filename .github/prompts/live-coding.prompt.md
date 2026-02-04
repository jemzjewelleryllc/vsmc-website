# Live Coding for Python

## Configuration

| Setting Key | Description |
|-------------|-------------|
| `live-coding.whenToExecute`, `live-coding.delay` | Debounce & trigger strategy |
| `live-coding.pythonPath`, `live-coding.envFile` | Override interpreter / .env location |
| `live-coding.defaultImports` | Inject imports automatically |
| `live-coding.printResultPlacement`, `live-coding.show*` | Control UI layout, filtering, and diagnostics |

## Getting Started

1. Install Python and space-tracer
2. Install the extension from VSIX or Marketplace
3. Open any `.py` file, run the Live Coding command (Command Palette), and tweak settings

## Key Features

- **Live execution**: Auto-run based on `afterDelay`, `onSave`, `onKeybinding` strategies
- **Variable & loop tracing**: Each assignment and loop iteration displayed in webview
- **Instant diagnostics**: Syntax errors and exceptions shown inline
- **Highly configurable**: Delay, default imports, variable filtering, result placement

## Python Requirements

- **Minimum**: Python 3.8

The extension searches for Python in this order:
1. Active environment (`PYTHON_EXECUTABLE`, `VIRTUAL_ENV`, `CONDA_PREFIX`, VS Code's `python.defaultInterpreterPath`)
2. Extension's bundled `python/` folder or `live-coding.pythonPath` setting
3. System PATH Python

## Commands

| Platform | Current Document | New Session |
|----------|------------------|-------------|
| Windows/Linux | `Ctrl+Shift+A` | `Ctrl+Shift+Q` |
| macOS | `Cmd+Shift+A` | `Cmd+Shift+R` |

## Credits

- **Livecode for Python**: Original VS Code extension
- **wolf project**: Inspired live-coding UX
- **PyCharm Live Coding for Python**: UX patterns and workflow
- **space_tracer**, **python-shell**, VS Code team, and community contributors
