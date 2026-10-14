---
plugin_submitted_by: jaysuk
plugin_submitted_on: 2026-10-14T09:57:33.932Z
plugin_updated_on: 2026-10-14T09:57:33.932Z
plugin: true
title: G-code Post-Processor
abstract: Allows post processing of gcode within DWC
author: jaysuk
repo: duet-gcode-postprocessor
branch: main
homepage: https://github.com/jaysuk/duet-gcode-postprocessor
dwcVersion: 3.7
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: v1.3.0
release_date: 2026-09-29T21:14:43Z
release_page: https://github.com/jaysuk/duet-gcode-postprocessor/releases/tag/v1.3.0
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jaysuk/duet-gcode-postprocessor/main/LICENSE
download_count: 17
tags:
- gcode
- post-processing
- find-replace
- scripting
- files
- dwc
---

# duet-gcode-postprocessor

A **G-code post-processor for RepRapFirmware**, delivered as a DuetWebControl 3.7 plugin.

Browse the G-code files already on your Duet's SD card, apply find/replace rules, command
mappings, layer-anchored insertions and scripted transforms, preview the diff, then write the
result back — without a PC, a slicer re-slice, or an SD card shuffle.

> **Status: v1.0.0 — feature-complete and in active testing on real hardware.** 800+ unit,
> golden-file, safety and component tests pass; typecheck and `verify-build` are green against DWC
> `v3.7-dev`. The plugin ZIP is about 72 KB. What is and is not implemented is listed in
> [PLAN.md](PLAN.md#status); [docs/usage.md](docs/usage.md) is the full guide.

## What it does

- **Browse** the G-code on the SD card, and **inspect** any file: slicer, print time, layers,
  extents, tools, temperatures, command histogram, dialect detection, and preflight checks against
  the machine's own limits.
- **Transform** it with an ordered recipe: find and replace (PrusaSlicer-compatible), command
  mapping that moves parameters properly, layer/Z/tool/object-anchored insertion, deletion,
  parameter arithmetic, calibration-tower sweeps, a no-code rules tier and a JavaScript tier.
- **Preview** the exact diff before anything is written.
- **Write it back safely**: backup, atomic temp-then-move, post-write size verification, an
  identity stamp that catches a repeat run, and a hard refusal to touch the file being printed.

## Why

Slicers already do this — PrusaSlicer has *G-code Substitutions* (find/replace with regex) and
*Post-processing scripts* (an external Perl/Python/Bash executable handed the output file path);
OrcaSlicer has the same. Both have two limitations this project fixes:

1. **They only run at slice time.** A file already on the SD card — sliced last month, sent by
   someone else, downloaded from a model site — can't be touched without re-slicing.
2. **Post-processing scripts need a desktop.** They shell out to a local interpreter. There is
   nothing equivalent when the printer is the only machine in the loop.

This plugin runs the same class of transformation *in the browser*, against the files already on
the board, from the same UI you're already looking at.

## Prior art / inspiration

| Project | What's borrowed |
| --- | --- |
| [PrusaSlicer](https://github.com/prusa3d/PrusaSlicer) | *G-code Substitutions* semantics — find/replace pairs with regex, case-sensitivity and whole-word flags, applied per layer block ([docs](https://help.prusa3d.com/article/g-code-substitutions_301694)) |
| [PrusaSlicer](https://help.prusa3d.com/article/post-processing-scripts_283913) / [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer) | *Post-processing scripts* — the "hand the whole file to a script" model, reimagined as a sandboxed in-browser worker |
| [oozeBot preFlight](https://github.com/oozebot/preFlight) | Slicer-side profile/metadata conventions and the "know what produced this file" idea |
| oozeBot OPP | The concept of a dedicated post-processor pass for a specific printer family |

## Licence

GPL-3.0-or-later, matching the other plugins in this family.
