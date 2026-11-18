---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:05:55.429Z
plugin_updated_on: 2026-11-03T22:05:55.429Z
plugin: true
title: Model Explorer
abstract: Object model browser and global variables editor for DWC: live model in several views, typed global edits, watch list, snapshots, expression tester, usage finder. DWC only, no plugin on the Pi, works on a standalone Duet and in SBC mode.
author: jhonf441
repo: WorkshopModel
branch: main
homepage: https://github.com/jhonf441/WorkshopModel
dwcVersion: 3.6
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: v1.7.3
release_date: 2026-11-03T20:05:22Z
release_page: https://github.com/jhonf441/WorkshopModel/releases/tag/v1.7.3
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopModel/main/LICENSE
download_count: 3
tags:
- object model
- globals
- variables
- dwc
---

# WorkshopModel (Model Explorer)



Page `/Plugins/Model` ("Model Explorer"). The object model of the board, live, seen in the way that suits the question: readable cards by topic, a flat sortable list, columns like a file browser, one level at a time, only what changed, or the technical tree. Around it: the global variables with a typed editor and quick edits, a watch list drawn by the kind of each value, snapshots of the model to compare two moments, an expression tester, presets, the persistence of globals across reboots and a usage finder over your macros. It needs no WorkshopService and no Raspberry Pi: everything goes through the machine API of DWC itself (`rr_` on a standalone Duet, DSF with a Pi), so it works on a standalone Duet. With a Pi in SBC mode it turns a few extras on by itself.

Version documented: 1.7 (see the CHANGELOG of the plugin).

## 1. Requirements

1. DWC 3.6.x on a Duet 3, standalone or in SBC mode. Global variables need RepRapFirmware 3.4 or newer; with an older firmware the globals features are off and say why, everything else works. WorkshopService is not needed and no DSF permission is asked.
2. For the SBC extras (section 3.10): the Duet in SBC mode with DSF 3.4 or newer and plugin support. They turn on by themselves; on a standalone Duet they stay grey with a one-line reason.

## 2. Install

1. DWC > Settings > Plugins > Install `WorkshopModel-<ver>-dwc3.6.zip`; Start. Reload DWC. 2. Open *Plugins > Model Explorer*. 3. Verify: the start-up card shows "Connection" and "Firmware" in green and the Model section shows the cards of your machine.

## 3. Functions

The side bar has the sections Model, Globals, Watch, Presets, Usage, Snapshots, Expression tester, Alerts and Report. The start-up card lives in the header.

### 3.1 Model: the views of the live model

![Topics view with the quick diagnosis](https://raw.githubusercontent.com/jhonf441/WorkshopModel/main/img/01-topics-and-quick-diagnosis.png)

![Technical tree with the meaning of a path](https://raw.githubusercontent.com/jhonf441/WorkshopModel/main/img/02-technical-tree-and-path-dictionary.png)
- What: one selector of tabs over the same live model, remembered in this browser. Each view has a fold "How this view works" (what it is, what it is for, what you lose without it, how to use it).
  - Topics (the default): one card per area (machine state, temperatures, motion and axes, job, tools, fans, sensors, boards and drivers, network, plugins, globals) with readable names, units and live values. The cards come from what your model has: nothing of the workshop is assumed, and every top-level key no card covers is in Other. A row or "See all" opens that path in the technical tree. In the Plugins card a plugin without a process on the Pi reads "browser only", never "stopped". On top sits Quick diagnosis: one look at everything abnormal, errors first, each line with a fold that says what it means and what to check and an Open button. It checks the stepper drivers (stall, overtemperature, open load, short; RRF 3.5 and newer report them), the supply and 12 V voltages, the processor temperature, heaters in fault, offline or over their limit, temperature sensors that fail, filament monitors, cards that are not mounted, network interfaces that are down, a halted or powered-off machine, start-up errors, error messages and plugins that have lost their process. With nothing wrong it says how many checks ran; a check whose branch your model does not have is skipped and not counted.
  - Flat list: every value in one sortable table (path, value, type, last change) with filters by text, type, changed in the last minute and watched; bytes and durations are shown in words beside the raw value. A switch Names / Values changes what the box looks at: Names searches paths and values as before; Values searches only the values over the whole model: a word (contains), `=idle` or `"idle"` (equals), `!=0` (different), `>30`, `>=30`, `<5`, `<=5` (numbers), `10..20` (between), `true`, `false`, `null` and `empty`. A line under the box says how the text was read; sort, filters and the page size work on the matches.
  - Columns: like a file browser, a column per level.
  - Browse: one level at a time with a breadcrumb.
  - Changes: only what changed since a moment you pick, before and after; the command logs of other plugins (`lastCommands`) and clocks that move every second are hidden by default, with a chip to show them.
  - Technical tree: the tree of the firmware with the search by key and value.
- Around the views: a density switch (comfortable or compact rows), favourites (a star on any path, the pinned paths with their live values on top) and the detail panel of the selected path: the value in words (bytes, durations), a swatch for a colour, arrays as small tables, the kind as a chip, the meaning of the path (what it is, its unit, whether it can be changed and with which G-code, and the firmware it needs; a dictionary of the common RRF 3.x paths, covering move, heat, fans, tools, sensors, boards, state, job, network, directories, limits, volumes, inputs, spindles and global, with a fold of help), the path helper (`M409`, `M291`, `echo`, an expression, a condition) and Test (the expression tester).

### 3.2 Globals

![Globals as cards, with filters and a quick edit](https://raw.githubusercontent.com/jhonf441/WorkshopModel/main/img/03-globals-cards.png)
- What: the global variables in groups by the start of their name (before the first underscore or capital letter), folded or open as you leave them; a search, filters (kind, kept across reboots, changed in the last minute, watched) and a sort (name, type, last change; favourites first). Each row: star, name, kind, short value (a tap shows all of it), a save icon when kept, in how many files the last usage scan saw it, a quick edit for a boolean (a switch) or a number (a field and Enter), and one menu (edit with the typed editor, open in the tree, watch, favourite). "Create a global" opens a dialog with the typed editor.
- Watch out: RRF cannot delete a global until the next reboot; the plugin says so instead of offering a delete button.

### 3.3 Command preview
- What: before anything is sent the exact G-code is shown. Meta commands and reads (`set`, `global`, `echo`, `M409`) go with one tap; any other G or M code asks a second tap (design guide). The quick edits, the editor, the presets and the expression tester all go through it.

### 3.4 Watch
- What: pin any path and see it drawn by its kind: a number as a line with min and max (and, if you ask, a mark on every sudden jump), a text or a state word (`state.status`, a mode) as coloured bands as long as each value lasted with a legend, a boolean as on and off, an array or an object as the count of what changed inside. Every row opens its changes: time, before, after and how long the value before lasted, with the changes inside an array or an object.
- Watch out: the samples live in this browser; with a Pi in SBC mode they are also kept in `0:/sys/workshop-model-watch.json` (3.10).

### 3.5 Presets and persistence
- Presets: save the current set of globals under a name, compare it with the machine, apply it, export and import JSON (`0:/sys/workshop-model-presets.json`).
- Persistence: mark the globals to keep; the plugin writes ONE generated macro, `0:/sys/workshop-globals.g`, and you add `M98 P"0:/sys/workshop-globals.g"` to `config.g` (the start-up card copies the line; the plugin never edits `config.g`). The panel opens by itself only when a saved value is not the live one or `config.g` does not call the macro.

### 3.6 Usage finder
- What: where each global is used, in plain words. A button reads the files; a bar shows the file being read. Three big cards sum up the result and filter the list: Problems (a file reads a global that nothing creates and the machine does not have), To check (it may be created in a folder that was not read, or nobody reads it: a panel or the console may) and Everything. When there is no problem the page says all is clear. One search box finds a global by name or a file by name. Three tabs sit next to each other: By global (one row per global with small bars for created, written and read and one sentence such as "Read in 28 files, nobody creates it"; click a row for every file and line grouped by file, with Open in the tree, Copy the name and, on each line, Copy file:line), By file (pick a file and see everything it uses, with the state of each global) and By macro (the macro map, section 3.13). If some folders could not be read, one banner says why and one button reads them. The technical side is folded in Options: what to read is your choice, remembered in this browser (by default `config.g` and every file it calls with `M98`, followed once each, `daemon.g`, `start.g` and the top of `0:/macros`; a switch per folder, the depth, 2 by default, and backups, examples and plugin folders left out), the kinds of use to show and one file to look at. A text in quotes is not counted as a read unless it is inside braces. Animations stop when the system asks for less motion.
- Watch out: files that did not change are not read again (memory in the page; in SBC mode also in the watch file). On a standalone Duet the budget is small (the files come through the board).

### 3.7 Snapshots

![Snapshots: the name is shown before it is saved](https://raw.githubusercontent.com/jhonf441/WorkshopModel/main/img/05-snapshots-default-name.png)
- What: save the whole model or the selected branch under a name (`0:/sys/workshop-model-snapshots.json`), compare two snapshots or one with the model now (changed, added, removed), export one as a JSON file and import one back.
- Watch out: on a standalone Duet the plugin keeps 4 snapshots of up to 4000 values (the file goes through the board); in SBC mode 20 of up to 10000. The oldest goes when a new one does not fit.

### 3.8 Expression builder (and tester)

![Expression builder: fill in the blanks one by one](https://raw.githubusercontent.com/jhonf441/WorkshopModel/main/img/04-expression-builder-fill-in-the-blanks.png)
- What: write an RRF expression (sent with `echo`) or a path (read with `M409`) and see the answer of the board in place, with a short history. It only reads: one line, through the command preview with one tap; an expression that starts with `>` (which would write a file) is refused.
- Build it, do not just type it: four tabs under the field. Paths: any path of the live model with a search, its type and its value now, inserted where the cursor is. What you can write: a searchable catalog of what an RRF expression can do (operators, text with `^`, `?:`, math and angle functions, `exists()`, `#`, indexing, `null`, `true`, `false`, `iterations`, `result`, `param.`, `global.`, `var.`, model paths, and the G-code forms with `{}` which are copied, not tested) with a one-line explanation and an example each; inserting a pattern selects its first blank (written between `<` and `>`) so you type over it, and a selection is wrapped into it. What the board's firmware does not have is hidden and can be shown, marked "needs RRF x.y". Recipes: ready expressions made with the real paths of this machine (a heater above a limit, an axis inside its limits, a job running and its layer, a global or a default with `exists()`, the bed temperature). Saved: the expressions you keep with the star, remembered in this browser (30 at most).
- While you write: the value and type of the path under the cursor, and warnings with no call to the board (an unclosed bracket or quote, a blank left in, a global that does not exist and is not guarded by `exists()`).
- The answer is shown with its type (number, true or false, text, list, object, no value); an error is explained in plain words with a hint (unknown name, unknown function, bad operator, list position out of range, wrong type, division by zero, unclosed text, malformed expression) and the board text stays below.
- Live preview: evaluate again every N seconds, one call at a time, like the watch list. On a standalone Duet it waits at least 5 s between runs and stops after 60; in SBC mode the floor is 2 s and it stops after 600. It also stops when the board goes offline or the expression stops being valid.
- Recipes from the community: next to the built-in recipes, the Recipes tab lists the ones people have contributed to the public repository of the plugin (marked Community, with the author's name, the blanks to fill with what each one expects, an example and the first RRF that has it; one hidden when the board's firmware is older than it needs). They are JSON files bundled into the plugin when a version is built: the page never connects to the internet. Share on a saved formula or on a recipe turns it into a ready recipe file, checked (no addresses, host names, PC paths or values read from the board) and shown with the steps to propose it as a pull request or an issue; a recipe file someone sends you can be pasted or chosen and added to your saved formulas. The format is in `CONTRIBUTING-RECIPES.md` of the repository.

### 3.9 Start-up card
- Rows: the connection, the firmware with global variables, the include line of the persistence macro (when you keep globals), the SBC mode extras (done from DWC, no plugin on the Pi). Every row says what it is, what it is for, what happens without it and how to do it.

### 3.10 With a Raspberry Pi (SBC mode)
- What turns on by itself (DSF 3.4 or newer, plugin support): the watch history and the memory of the usage finder kept in `0:/sys/workshop-model-watch.json`, the wide budget of the usage finder and of the snapshots, and the process state of the plugins of the Pi in the Plugins card. The header says "SBC mode, extras on" (or off) or "Standalone".

### 3.11 Machine report
- What: the Report section builds a markdown text, in English, ready to paste into the Duet forum or a GitHub issue: firmware and boards, DWC and DSF versions, SBC mode yes or no, plugins with their versions, sensors, drivers, network state, heaters, volumes and the active warnings (a halted machine, a heater in fault, a volume not mounted, little free memory, a hot processor, a firmware older than 3.4). Copy it to the clipboard or download it as a `.md` file.
- Private data: the report is built from a fixed list of fields, not by dumping the model. The machine name, the hostname, the IP addresses, the MAC address, the board serial numbers and the file paths are left out unless you tick the box of each one (all off); user names and passwords are never read, and neither is the Wi-Fi name. A free text such as a sensor name goes through a scrub that replaces any address or private value with `[redacted]`. Each tick box explains what it adds, what it is for and what the report says without it.
- Watch out: DWC does not tell its own version to the page; type it in the DWC version field (or it reads "not detected" in the report). The report is built when you press the button, not live; after changing a box, build it again.

### 3.12 Export the watch
- What: at the end of the Watch section, download the watch list as CSV (one column per path and one row per sample, ISO time stamps, numbers as numbers, booleans as `true` and `false`, texts with their value from the moment they changed) or as JSON (the samples, the events and the changes of every path), and the events of the Changes view as CSV. Pick a range first: everything the page holds, the last minute, 5 minutes, 15 minutes or the last hour.
- Watch out: the page keeps the last 300 samples of each path, so a longer history needs the SBC mode watch file. The JSON uses the exchange envelope of the Workshop plugins, which names the machine; the CSV files carry no machine name.

### 3.13 Macro and parameter map
- What: in the Usage section, after a scan, the By macro tab lists each macro file the scan read with the parameters it reads (`param.S`, whether it is required or optional, the default it falls back to: `exists(param.S) ? param.S : 100`, a block under `if !exists(param.S)` that sets a default or ends with `abort`), the globals it reads, writes or defines, the macros it calls with `M98` and the parameters it passes them, who calls it, where it can `abort`, and a one-line example of how to call it (square brackets mark optional parameters). It is narrowed by the search box of the section (a file, `param.S`, a global or a macro name), with filters for macros that take parameters or call others. A call whose file name is built at run time is listed with its expression.
- Watch out: it is read from the same files as the usage finder, so the scope and the budget of the scan decide what is in it.

### 3.14 In-page alerts
- What: the Alerts section holds rules on any path of the model: goes above or below a number, is equal to a word, or changes to a word. A rule has a hysteresis (for limits: how far back past the limit the value must go before the alert is over, so a wobbling value does not fire again and again) and a cooldown (the shortest time between two alerts of the rule). When a rule fires, a banner appears at the top of the page, whichever section is open, and the event is listed with its recovery. An optional sound (two short tones) is off by default. The rules are kept in this browser.
- Watch out: alerts work only while the page is open in a browser. Nothing runs on the Pi and nothing is sent to a phone; close the page and they stop. A browser keeps a page silent until you touch it once, so the sound may need one tap first.

## 4. Settings

No settings page. In this browser: the chosen view, the density, the favourites, the folded groups of globals, the scope of the usage finder, the watch list and the alert rules. On the SD card: `0:/sys/workshop-globals.g` (persistence macro), `0:/sys/workshop-model-presets.json` (presets), `0:/sys/workshop-model-snapshots.json` (snapshots) and, in SBC mode, `0:/sys/workshop-model-watch.json`. The include line for `config.g` is yours to add.

## 5. Roles

Any role can read the model, the globals, the watch list and the snapshots and use the expression tester. Editing a global, applying or deleting a preset, saving, deleting or importing a snapshot and writing the persistence macro need the technician or administrator role when the workshop service with users is installed; without it (or without users) everybody can edit.

## 6. API operations used

None of WorkshopService. The plugin uses the machine API of DWC itself: the object model, sending G-code (`set global...`, `global ...`, `echo`, `M409`, `M98`) and reading and writing files on the SD card (`rr_` on a standalone Duet, the DSF file API with a Pi; files are written as `application/octet-stream`, otherwise DSF leaves them empty).

## 7. Troubleshooting

1. A global goes back to its old value after a reboot: mark it as kept and add the include line to `config.g` (the start-up card copies it).
2. The SBC row is grey: the Duet is standalone; the extras of 3.10 do not apply and everything else works.
3. "Cannot delete": RRF keeps a global until the next reboot; take its line out of the persistence macro and reboot.
4. The usage finder reads few files on a standalone Duet: its budget is small there; narrow the scope to where your macros are.
5. The firmware row is red: the RepRapFirmware of the board has no global variables; update the firmware.
6. The Changes view looks empty: the noise is hidden by default; the chip says how many paths were hidden.

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Medium (it changes global variables that your macros read, and sends the G-code you confirm)**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and talks to the board through the file and G-code API of DWC itself (`rr_` on a standalone Duet, DSF with a Raspberry Pi); it does not use `WorkshopService`.

**Files it writes:**
- the persistence macro `0:/sys/workshop-globals.g` for the globals you mark as persistent (generated by the plugin; you include it from `config.g`)
- its presets in `0:/sys/workshop-model-presets.json`, its snapshots of the model in `0:/sys/workshop-model-snapshots.json` and, in SBC mode, the watch history with the memory of the usage finder in `0:/sys/workshop-model-watch.json`

**Safety notes:**
- It needs no backend and no DSF permissions: it talks to the board through the file and G-code API of DWC itself (`rr_` on a standalone Duet, DSF with a Raspberry Pi).
- The functions that need a Raspberry Pi (history kept on the Pi, background usage index, persistence applied at boot) turn on by themselves in SBC mode and are hidden on a standalone Duet.
- RRF cannot delete a global until a restart: the plugin says so instead of offering a delete button.
- The live preview never queues calls (one at a time), keeps the floor and the run limit of the tier and stops by itself.
- The expression tester only sends `echo` or `M409` through the command preview, one line, and refuses an expression that starts with `>` (a write to a file).

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

The SBC extras need SBC mode. DWC 3.6.x only (support for DWC 3.7 is paused for now). The alerts exist only while the page is open in a browser. The macro map reads what the usage scan reads. The report cannot know the DWC version by itself.

