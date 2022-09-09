[![Version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/Duet3D/PluginRepository/master/package.json&label=Version&query=$.version&colorB=blue)](https://plugins.duet3d.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-magenta.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![GH-Pages Deployment](https://github.com/Duet3D/PluginRepository/actions/workflows/pages/pages-build-deployment/badge.svg?branch=master)](https://github.com/Duet3D/PluginRepository/actions/workflows/pages/pages-build-deployment)

# Duet3D Plugin Repository

## Build and run locally
- `npm run dev`

## Increase version number and deploy any new changes
- Run GitHub Action -> `update-repository-version`
- `patch`, `minor`, `major` are options

## GitHub Workflows
- `nodescript_ci_test` - CI tests for nodescripts
- `submit_new_plugin`
- `update_plugin`
- `remove_plugin`
- `merge_pr_on_issue`
- `update_plugin_stats` - Scheduled to run/Workflow dispatch
- `update_version` - Workflow dispatch

## Stats
- Stats are being saved in `plugin_stats.json` using a daily schedule (Can be run manually as well)
- Weekly total and latest release download stats are recorded
- Per-version stats are not available