---
plugin_submitted_by: jaysuk
plugin_submitted_on: 2026-10-14T09:57:50.861Z
plugin_updated_on: 2026-10-18T08:58:40.960Z
plugin: true
title: Duet TMC Tuner
abstract: Allows tuning of TMC registers
author: jaysuk
repo: duet-tmc-tuner
branch: main
homepage: https://github.com/jaysuk/duet-tmc-tuner
dwcVersion: 3.7
sbcDSfVersion: undefined
rrfVersion: 3.7
oem: false
latest_version: v1.2.0
release_date: 2026-10-18T08:56:54Z
release_page: https://github.com/jaysuk/duet-tmc-tuner/releases/tag/v1.2.0
license: GPL-3.0-or-later
license_file: https://spdx.org/licenses/GPL-3.0-or-later
download_count: 75
tags:
- tmc
- stepper
- drivers
- tuning
- stealthchop
- dwc
- rrf
---

# Duet TMC Tuner — DuetWebControl plugin

Computes quiet **stealthChop** and **Spreadcycle** chopper and PWM register values for TMC stepper drivers from a motor's
electrical specs, and writes them to the driver using standard RepRapFirmware codes: `M569 C` for the
chopper bits, `M915` for CoolStep/StallGuard and `M569.2` register writes for the rest.

Pick a motor (from a built-in database of 200+ motors, or enter the specs by hand), confirm the
driver, supply voltage and clock, and the plugin derives **CHOPCONF** (TOFF / TBL / HSTRT / HEND) and
**PWMCONF** (PWM_OFS / PWM_GRAD / pwm_freq + autoscale/autograd) using the Trinamic datasheet
initial-value equations. It then:

- shows the computed register words **and their decoded fields** (nothing is applied blind),
- **reads the live registers** off the board first, so a write only changes the tuned fields and your
  microstep-resolution / current / interpolation bits are preserved (read-modify-write),
- **Apply now** sends the writes for an instant tuning session (stopping and reporting RRF's error if
  a command is rejected), and
- **Copy for config.g** gives you a ready block to paste *after* your driver setup so it persists.

A Duet Web Control **3.7** plugin (Vue 3 / Vuetify 4).

## Requirements & scope

- A **Duet 3** board. Supported driver families: **TMC2208 / 2209 / 2225 / 2226**, **TMC2160 / 5160**
  and **TMC2240**. `M569.2` register access works on Duet 3 main, expansion and tool boards (RRF
  3.3/3.4+). Boards with external drivers (6XD/1XD) and Duet 2 (TMC2660) are not tuneable this way.
- **Drivers are auto-detected from the object model** across the mainboard, expansion boards and
  toolboards (incl. CAN addresses). The board name only seeds a default chip guess; on third-party
  STM32-port boards use **Detect chip**, which reads the driver's IOIN VERSION over `M569.2` to
  identify it exactly. Run current is read from the assigned axis/extruder. Override anything by hand.
- **Tuning modes** add the stealthChop↔spreadCycle velocity thresholds (TPWMTHRS, plus THIGH on the
  SPI parts): *Chopper & PWM only* (default, no thresholds), *Silent*, *Performance*, *Auto* and
  *Auto-switch*. These need `M569 ... D3` (stealthChop) enabled to take effect.
- **CoolStep & StallGuard** (opt-in, advanced): sets TCOOLTHRS (`M915 H`), the COOLCONF CoolStep
  fields (`M915 T`) and the StallGuard threshold (`M915 S`, which RRF maps to SGTHRS on 2209/2226 and
  SGT in COOLCONF on 5160/2240); not available on plain 2208/2225. Going through `M915` keeps RRF's
  own stall settings (SGT/filter, stall speed) consistent instead of overwriting them. These change dynamic current and sensorless-homing sensitivity — off by default, and the
  StallGuard threshold normally needs per-machine tuning.
- A motor datasheet (or a database match) for resistance, inductance, holding torque, rated current
  and steps/rev. The built-in database is kept in sync with the upstream community motor list by a
  scheduled workflow (`update-motors`) that opens a PR when new motors appear.
- **Custom motors** can be entered in datasheet units (inductance mH/µH/H, torque N·cm/kgf·cm/N·m,
  current A/mA) with the **rated current set as RMS or peak** to match the datasheet — the maths uses
  RMS internally and scales a peak rating by 1/√2 (LDO datasheets quote RMS). They can be **saved onto
  the printer** (`0:/sys/duet-tmc-tuner.json`), so they survive plugin updates and DWC settings resets,
  and **edited or deleted** later. The plugin also **remembers the motor + chip per driver** in the
  same file, and you can copy a saved motor as a database entry to contribute upstream.
- **Hysteresis basis**: defaults to the Klipper/community RMS method; an optional **Trinamic-exact
  (peak current + CS)** mode matches Trinamic's calculation spreadsheets.
- Picking a driver (while connected) **auto-detects the chip and reads the live registers**, and
  **Apply now stays disabled until the registers have been read**, so writes are always read-modify-write.

- **CHOPCONF goes through `M569 P<d> C<n>`**, for both **Apply now** and **Copy for config.g**: RRF keeps
  that value and re-applies it if it reprograms the driver (e.g. after `M350`/`M569 D`). `C` carries
  only the bits RRF lets you set — TOFF/HSTRT/HEND/TBL, plus FD3/DISFDCC/TPFD on TMC2160/5160/2240 — and
  the **Advanced (chopper)** panel exposes TPFD, FD3 and DISFDCC (blank / *Keep current* keeps RRF's
  value). The read-back takes those bits from the `ccr` that `M569 P<d>` reports. TOFF/TBL are checked
  the way RRF checks them (TOFF 1–15, TOFF 1 needs TBL ≥ 2) so RRF never rejects the `M569 C`.
- PWMCONF is write-only on TMC2160/5160, so there the bits the tuner doesn't compute (freewheel,
  PWM_REG, PWM_LIM) come from RRF's start-up value rather than a read-back.
- **Requires RepRapFirmware 3.7.0-rc.2 or later** (`M569 C` on CAN expansion boards and the extra bits).

> ⚠️ Direct register writes are powerful. Always review the decoded values, test at low speed, and keep
> a copy of your working config. RRF programs these registers itself from `M569`/`M906`/microstepping,
> so the config.g block must go **after** that setup.

## Develop

Uses [`dwc-plugin-test-kit`](https://github.com/jaysuk/dwc-plugin-test-kit) (typecheck/tests/CI) and
[`dwc-plugin-runtime`](https://github.com/jaysuk/dwc-plugin-runtime) (self-update + diagnostics).

```bash
npm install
npm test
DWC_DIR=/path/to/DuetWebControl npm run typecheck
DWC_DIR=/path/to/DuetWebControl npm run verify-build
```

The autotune maths is unit-tested against a known-good reference output. Releases: `npm run release --
<version> --push`.

## License

GPL-3.0-or-later.
