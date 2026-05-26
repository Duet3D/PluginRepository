---
plugin_submitted_by: jaysuk
plugin_submitted_on: 2026-05-21T20:55:26.780Z
plugin_updated_on: 2026-05-21T20:55:26.780Z
plugin: true
title: Object Model Browser
abstract: This is an alternative object model browser than includes descriptions and auto updating
author: jaysuk
repo: RRF-Alternative-Object-Model-Browser
branch: main
homepage: undefined
dwcVersion: 3.6
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: V1.0.0
release_date: 2026-05-21T20:52:51Z
release_page: https://github.com/jaysuk/RRF-Alternative-Object-Model-Browser/releases/tag/V1.0.0
license: undefined
license_file: https://github.com/jaysuk/RRF-Alternative-Object-Model-Browser
download_count: 0
tags:
- dwc
---

# RRF Alternative Object Model Browser

A DuetWebControl (DWC) plugin that provides a richer Object Model browser than the one built into DWC.

![Object Model Browser screenshot](Screenshot.png)

## Features

- **Split-pane layout** — navigable tree on the left, property detail table on the right
- **Live mode** — when a printer is connected, shows real-time values from the live object model with their types
- **Reference mode** — when offline, shows the full typed object model schema with descriptions sourced from the DSF C# XML docs (147+ types)
- **Inline drill-down** — expand objects and arrays inline in the detail panel without leaving the current view
- **Property search** — search across all class names, property names, types, and descriptions
- **Path copying** — click the copy icon on any row to copy its full object model path to the clipboard (e.g. `boards[0].firmwareVersion`)
- **SBC property tags** — properties flagged as SBC-only or SBC-capable are labelled in the detail panel
- **Resizable tree panel** — drag the divider to adjust the split

## Requirements

- DuetWebControl 3.6 or later
- Node.js (to run the prebuild script)

## Building the plugin

### 1. Regenerate model data (when updating to a new firmware version)

```bat
node prebuild.js
```

This reads the TypeScript ObjectModel sources from `om-src/`, fetches the DSF C# XML documentation from GitHub, and writes `src/model-data.js`. Commit the updated `om-src/` sources alongside any schema changes.

### 2. Build the plugin ZIP

```bat
build.bat
```

This requires DuetWebControl to be checked out locally. Edit the `DWC_DIR` variable at the top of `build.bat` to point to your local DWC source folder. The script will build the plugin and copy the resulting ZIP to this folder.

The ZIP file is excluded from version control — attach it to a GitHub Release for distribution.

## Installation

1. Download the latest `OmBrowser-x.x.x.zip` from the [Releases](../../releases) page
2. In DWC, go to **Settings → Plugins → External plugins**
3. Click **Install plugin** and upload the ZIP

## Standalone viewer

A standalone HTML viewer (`viewer/index.html`) is also included. Open it directly in a browser — no build step or server needed. It parses the same TypeScript sources and DSF docs client-side and provides a read-only reference browser without requiring a printer connection.

## Development

The plugin source lives in `src/`:

| File | Purpose |
|------|---------|
| `src/OmBrowser.vue` | Main Vue component — tree, detail panel, search, resize |
| `src/index.js` | DWC plugin entry point |
| `src/model-data.js` | Auto-generated model + descriptions bundle (gitignored) |

`prebuild.js` generates `model-data.js` by:
1. Parsing all `.ts` files under `om-src/` to extract class and enum definitions
2. Fetching C# XML doc comments from the [DuetSoftwareFramework](https://github.com/Duet3D/DuetSoftwareFramework) repo on GitHub
3. Writing the merged output as a single ES module

## License

LGPL-2.1
