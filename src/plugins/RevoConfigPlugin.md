---
plugin_submitted_by: chrishamm
plugin_submitted_on: 2022-12-09T17:09:37.861Z
plugin_updated_on: 2022-12-14T16:41:45.603Z
plugin: true
title: E3D Revo Config Plugin
abstract: RepRapFirmware configuration macros for the E3D Revo hotend
author: chrishamm
repo: RevoConfigPlugin
branch: master
homepage: https://github.com/chrishamm/RevoConfigPlugin
dwcVersion: undefined
sbcDSfVersion: undefined
rrfVersion: 3.4
oem: false
latest_version: v1.1.0
release_date: 2022-12-14T16:39:40Z
release_page: https://github.com/chrishamm/RevoConfigPlugin/releases/tag/v1.1.0
license: MIT
license_file: https://raw.githubusercontent.com/chrishamm/RevoConfigPlugin/master/LICENSE
download_count: 8
tags:
- config
- revo
- rrf
---

# E3D Revo Tool Configuration Plugin

This plugin provides RepRapFirmware macro files for persistent storage of Revo tool configurations (variable nozzle diameters).
It can be used both in SBC and standalone mode, however currently only a single tool is supported (not suitable for tool changers).
RepRapFirmware 3.4 or newer is required to use them.

This script set is licensed under the terms of the MIT license. Use at your own risk.

## Installation

To install this plugin, open DWC, go to `Settings -> Plugins -> External Plugins` and click on "Install Plugin".
Then select the plugin ZIP file and confirm the following steps.

Once installed, remove your existing tool defintion from `config.g` (typically the `Tools` section) but write down the configured heater, fan, and extruder numbers mapped to your existing tool (typically `D0`, `H1`, `F0`).

Instead of this section, you should invoke `revo/config.g` with the corresponding parameters:


```
; Revo tool config
M98 P"revo/config.g" D0 H1 F0
```

This will restore the last configured Revo insert on the next restart of the firmware.

## Usage

Upon installation, you can see a new `Revo` directory in the `Macros` list which contains the following items:

- 0.15mm Nozzle (Pink)
- 0.25mm Nozzle (Yellow)
- 0.4mm Nozzle (Red)
- 0.6mm Nozzle (Blue)
- 0.8mm Nozzle (Green) 

Using these macros you can reconfigure your Revo hotend whenever you've changed the nozzle insert.
Changes are saved permantently on the SD card for your convenience and the last configuration is restored on reboot.

### Global variable nozzleDiameter

In order to fine-tune filament instances, you can reference `global.nozzleDiameter` in your filament configuration macros to set up the right PA and firmware retraction parameters.


## Demo configuration for custom filaments

Here my demo configuration for a PETG filament definition that uses different PA and firmware retraction values for the 0.4 and 0.8mm nozzles.
The corresponding `load.g` script uses StallGuard when loading a filament. Bear in mind that these files are only demos and further fine-tuning may be required for your setup.

### Main config.g

At the end of config.g, you can add something like

```
; Filament config
global filamentType = ""
T0
M703
```

to restore the last filament.

### Filament config.g

```
set global.filamentType = "PETG"
M221 D0 S87

if global.nozzleDiameter == 0.4
  M572 D0 S0.55
  M207 P0 S4 F3600 Z0
elif global.nozzleDiameter == 0.8
  M572 D0 S0.325
  M207 P0 S5 F3000 Z0
else
  M572 D0 S0
  M207 P0 S5 F3000 Z0
  echo "Warning: Unsupported nozzle diameter"
```

### Filament load.g

```
M98 P"load.g"
```

### Filament unload.g


```
M98 P"unload.g" T160
```

### /sys/check-filament.g


```
if global.filamentType != param.F
  abort "Incorrect filament! Expected " ^ param.F ^ " but " ^ global.filamentType ^ " is loaded."
```

### /sys/load.g


```
; load filament using SG at 75% motor current
T0
M83
M913 E75
M302 P1
G1 H1 E750 F1800 
M913 E100
M302 P0

```

### /sys/unload.g

```
; heat up to the given temperature if necessary (as passed via the T parameter)
var hadToHeat = false
if sensors.analog[1].lastReading < param.T
  set var.hadToHeat = true
  T0
  M568 S{param.T}
  M116

; retract 500mm of filament
G1 E-500 F6000

; turn off the nozzle again if we enabled it before
if var.hadToHeat == true
  M568 S0
```

### Sample start G-code (PrusaSlicer)

To check if the right filament and nozzle is used, you can run these commands as part of your slicer start G-code:

```
M98 P"check-filament.g" F"[filament_type]"
M98 P"revo/check-nozzle.g" S0.6
```

If either the loaded filament type or the nozzle widths (0.6mm in this case) don't match, the print is aborted immediately.
In the case of the previously mentioned PETG filament, make sure to set `Filament type` in the slicer to `PETG`.
