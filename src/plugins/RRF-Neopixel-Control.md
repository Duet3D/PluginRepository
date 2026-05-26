---
plugin_submitted_by: jaysuk
plugin_submitted_on: 2026-05-21T12:31:03.592Z
plugin_updated_on: 2026-05-21T12:31:03.592Z
plugin: true
title: Neopixel Control
abstract: Allows manual control of neopixels
author: jaysuk
repo: RRF-Neopixel-Control
branch: main
homepage: undefined
dwcVersion: 3.6
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: V1.0.0
release_date: 2026-05-21T12:24:48Z
release_page: https://github.com/jaysuk/RRF-Neopixel-Control/releases/tag/V1.0.0
license: undefined
license_file: https://github.com/jaysuk/RRF-Neopixel-Control
download_count: 0
tags:
- dwc
---

# RRF Neopixel Control

A DuetWebControl (DWC) plugin for controlling Neopixel (WS2812) and DotStar LED strips on RepRapFirmware 3.x machines.

![Neopixel Control plugin screenshot](screenshot.png)

## Features

- Auto-detects all LED strips configured in firmware from the object model
- Supports RGB and RGBW strips
- Set all LEDs to a single colour with a master brightness control
- Individual LED control with per-LED colour (RGBW) and per-LED brightness
- Visual pip display — click any LED to select and edit it
- Colour picker swatch for quick RGB selection
- "Fill all from above" copies the Set All colour to every individual LED slot
- Persistent LED count stored in browser localStorage (keyed per strip pin)
- Stop-movement warning shown when `stopMovement` is set on a strip
- Handles multiple strips independently, each with their own settings

## Requirements

- RepRapFirmware 3.4 or later
- DuetWebControl 3.6

## Firmware configuration

Define your LED strips in `config.g` using `M950`:

```
M950 E0 C"<pin>" T1   ; NeoPixel RGB on strip 0
M950 E1 C"<pin>" T2   ; NeoPixel RGBW on strip 1
```

Type values: `1` = NeoPixel RGB, `2` = NeoPixel RGBW, `3` = DotStar.

## Installation

1. Download `NeopixelControl-1.0.0.zip` from the [Releases](../../releases) page
2. In DWC, go to **Settings → Plugins**
3. Click **Install Plugin** and select the ZIP file
4. The plugin appears under **Plugins → Neopixel Control** in the navigation menu

## Usage

### Set All LEDs

Use the colour swatch (click to open a colour picker) and the R/G/B (and W for RGBW strips) sliders to choose a colour. The **Brightness** slider scales all channels proportionally before sending — 255 is full brightness, 0 is off.

Click **Apply to All LEDs** to send the colour to every LED on the strip at once.

### Individual LED Control

The pip strip shows one coloured square per LED. Click any pip to select that LED and open the editor panel below. The editor shows:

- **R / G / B** sliders (and **W** for RGBW strips) — set the target colour for this LED
- **Brightness** slider — independent dimmer for this LED only

The pip colour updates live as you adjust the sliders, showing what the LED will look like at its set brightness.

Use **Fill all from above** to copy the current "Set All" colour into every LED slot (keeping individual brightness values). Use **Clear all** to set all LEDs to off.

Click **Apply Individual** to send all per-LED values to the strip in one sequence.

### Off button

The **Off** button in the strip header immediately sends all-zero values to every LED on that strip.

### Number of LEDs

The LED count is not available in the RRF object model, so it is entered manually and saved in browser localStorage. The default is 30 on first load.

## GCode reference

The plugin uses standard RRF 3.x `M150` syntax:

| Parameter | Meaning |
|-----------|---------|
| `E`       | Strip number (matches `M950 E<n>`) |
| `R`       | Red (0–255) |
| `U`       | Green (0–255, note: `G` is reserved for mesh bed levelling) |
| `B`       | Blue (0–255) |
| `W`       | White (0–255, RGBW strips only) |
| `S`       | Number of LEDs to set |
| `F0`      | Apply immediately |
| `F1`      | Buffer (used for individual LED sequences, final LED uses F0) |

Example — set 3 RGBW LEDs to full white:
```
M150 E0 R0 U0 B0 W255 S3 F0
```

## Building from source

The plugin is built against the DuetWebControl 3.6 source.

1. Clone [DuetWebControl](https://github.com/Duet3D/DuetWebControl) and check out the `3.6-dev` branch
2. Clone this repo into a separate directory
3. From the DWC source directory, run:

```
node scripts/build-plugin.js "<path to this repo>"
```

The output ZIP is written to `dist/NeopixelControl-1.0.0.zip`.
