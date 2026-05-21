---
plugin_submitted_by: jaysuk
plugin_submitted_on: 2026-05-21T12:31:49.794Z
plugin_updated_on: 2026-05-21T12:31:49.794Z
plugin: true
title: Globals Editor
abstract: Allows editing of globals from an easy to interact with interface
author: jaysuk
repo: RRF-Globals-Editor
branch: main
homepage: undefined
dwcVersion: 3.6
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: V1.0.0
release_date: 2026-05-21T12:02:50Z
release_page: https://github.com/jaysuk/RRF-Globals-Editor/releases/tag/V1.0.0
license: undefined
license_file: https://github.com/jaysuk/RRF-Globals-Editor
download_count: 0
tags:
- dwc
---

# RRF Globals Editor

A [DuetWebControl](https://github.com/Duet3D/DuetWebControl) plugin for RepRapFirmware that lets you view, edit, and create `global.*` variables directly from the web interface.

![Globals Editor screenshot](screenshot.png)

## Features

- **Live list** — all `global.*` variables are listed automatically and kept up to date as the object model polls
- **Type-aware editing** — booleans use a true/false dropdown; all other scalar types use a text field
- **Array support** — arrays show an inline preview and can be expanded to edit individual elements, including nested sub-arrays
- **Create new variables** — choose a name, type, and value; the plugin sends the correct `global` G-code command
- **Search/filter** — filter the variable list by name as you type

## Requirements

- DuetWebControl 3.6 or later
- RepRapFirmware 3.4 or later (global variables support)

## Installation

1. Download `GlobalsManager-1.0.0.zip` from the [Releases](../../releases) page (or directly from this repo)
2. In DuetWebControl, go to **Settings → General → Plugin Management**
3. Click **Upload Plugin** and select the ZIP file
4. Enable the plugin and reload DWC when prompted

The plugin appears under **Plugins → Globals Editor** in the main navigation.

## Usage

### Viewing variables

All current `global.*` variables are listed in the table with their name, type, and current value. The count chip in the top-right shows how many variables are loaded.

Use the **Search variables** box to filter the list by name.

### Editing a value

- **Boolean** — select `true` or `false` from the dropdown, then click **Set**
- **Number / String** — type the new value in the text field, then click **Set**
- The **Set** button is only enabled when the value differs from the loaded value, so you can see at a glance which fields have pending changes

### Editing array elements

Click the chevron button next to any array variable to expand it. Each element can be edited individually. For nested sub-arrays, enter the value in `{1, 2, 3}` brace notation.

### Creating a variable

Use the **Create New Variable** card at the bottom of the page:

1. Enter a variable name (letters, digits, underscores; must start with a letter or underscore)
2. Choose the type: Number, Boolean, String, or Array
3. Enter the initial value
   - Arrays can be entered as comma-separated values: `1, 2, 3` or `{1, 2, 3}`
   - Strings do not need surrounding quotes — the plugin adds them automatically
4. Click **Create**

The plugin sends a `global <name> = <value>` command to the firmware. The variable will appear in the list on the next object model update.

## Building from source

This plugin is built against [DuetWebControl 3.6](https://github.com/Duet3D/DuetWebControl). To rebuild:

1. Clone DuetWebControl 3.6 and install its dependencies
2. Copy `plugin.json`, `index.js`, and `GlobalsManager.vue` into `src/plugins/GlobalsManager/` inside the DWC repo
3. Register the plugin in `src/plugins/imports.ts`
4. Run `npm run build-plugin-pkg GlobalsManager` from the DWC root

## License

MIT
