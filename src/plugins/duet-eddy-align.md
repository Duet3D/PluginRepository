---
plugin_submitted_by: jaysuk
plugin_submitted_on: 2026-10-14T09:16:45.784Z
plugin_updated_on: 2026-10-14T09:16:45.784Z
plugin: true
title: Duet Eddy Align
abstract: Align tools using an eddy coil
author: jaysuk
repo: duet-eddy-align
branch: main
homepage: https://github.com/jaysuk/duet-eddy-align
dwcVersion: 3.7
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: v1.0.0
release_date: 2026-08-29T08:03:06Z
release_page: https://github.com/jaysuk/duet-eddy-align/releases/tag/v1.0.0
license: GPL-3.0-or-later
license_file: https://spdx.org/licenses/GPL-3.0-or-later
download_count: 3
tags:
- toolchanger
- alignment
- eddy-current
- scanning-probe
- calibration
- dwc
---

# Duet Eddy Align

Automated tool-offset alignment for RepRapFirmware toolchangers, using the fixed-mount **Scanning Z
Probe** (an inductive eddy-current coil) instead of a camera — a DWC 3.7 plugin.

Sibling project to [duet-tool-align](https://github.com/jaysuk/duet-tool-align) (the camera/OpenCV
equivalent): same goal, different sensor. A nozzle swept across the coil produces a localized
resonant-frequency response; fitting that response's sub-sample peak per tool gives the relative
`ΔX, ΔY` offsets for `G10`.

## Status

**v0.12.0 — ready to test on hardware**, with two fit strategies, repeatability checking, and
goal-seeking scan refinement built in from a review of Klipper/Kalico prior art (see
[docs/open-questions.md](docs/open-questions.md)'s Prior art section). The signal-processing core
(`src/model/eddyScan/`) and `src/model/orchestrator.ts`'s cross-scan sequencing are complete and unit
tested, `makeProbeReader()` is verified directly against RepRapFirmware source, and
`src/widgets/EddyAlignWidget.vue` gives a working control panel:

- **Setup tab**, grouped into *Probe position* / *Motion* / *Scan window* / *Fit* / *Refinement* /
  *Advanced* — a live, polling raw-probe-reading display (the fastest way to confirm the sensor +
  `M409` query work on your hardware before trusting anything automated), manual X/Y/Z jog, saved
  probe position (set from current machine position, or jog back to it), all the scan/motion settings
  (probe `K` index, feeds, settle time, scan window, safe-Z travel — a clearance *floor*, only ever
  raising Z, never lowering it), a choice of sub-sample fit (`gaussianLog` or `weightedQuadratic`), an
  opt-in bidirectional (forward + reverse, averaged) sweep mode, and opt-in **goal-seeking refinement**:
  after the first cross scan, move to the fitted centre and re-scan with a narrower window (halfWidth
  and step shrunk together, preserving sample count), repeating until the centre stops moving or a pass
  cap is hit — the answer to "can a second, narrower scan pin down the exact peak" (`runRefinedScan`,
  `src/model/scanWorkflow.ts`).
- **Scan & Offsets tab** — a **Stop** button that aborts a running scan/scan-all/repeatability check
  between steps; a **Prepare tool** strip to load a tool, jog Z while watching the live reading, and
  set (or clear) that tool's own scan height (`cfg.toolScanZ`), independent of the global default,
  with a readout of which one will actually be used; a current-tool indicator that also highlights the
  loaded tool's row; per-tool or scan-all, an on-demand repeatability check per tool (mean ± sample
  stddev over N runs), a results table (captured position, confidence — `quality.ts`'s
  `fitConfidence`, blending R² with an SNR estimate from the raw sweep so a technically-smooth fit to
  a weak signal reads lower than R² alone would suggest, not raw R² by itself — computed `G10`, and a
  **Variation** column showing how much Apply would actually change each tool's offset — new G10 minus
  current G10, per axis), per-row and clear-all capture clearing, and Apply/Save with the same
  show-the-exact-command confirm dialog `duet-tool-align` uses. `computeToolOffset`/`formatG10`
  (`src/util/toolAlign.ts`) are ported verbatim from there, same sign convention. Two reference modes,
  matching two real E3D Tool Changer setups: **"tool"** mode measures every tool against a chosen
  reference tool (e.g. T0); **"point"** mode measures every tool against a fixed carriage datum
  instead — captured as a raw position snapshot (jog the bare carriage to trigger a fixed reference
  like a homing switch that never touches a tool, then Capture) and **persisted** across sessions
  (with its capture date shown, and a Clear action), since a rigidly bed-mounted coil and a
  carriage-fixed switch make that position stable long-term. In "tool" mode, **the reference tool
  still gets scanned like any other tool** (own row, own Scan button) — by default
  (`zeroReferenceOffset: true`) its own fresh capture becomes the new zero baseline rather than
  inheriting whatever G10 it already had, so a from-scratch calibration never silently trusts an
  unverified offset. Turn that off to keep the reference tool's existing G10 instead, matching
  duet-tool-align's original convention.

**Whether the raw reading rises or falls with lateral nozzle proximity is unverified on real
hardware** — `quality.ts`'s `detectPeakType()` detects it per scan rather than assuming, and a
detected valley auto-switches the fit to `weightedQuadratic` (which handles one natively, unlike
`gaussianLogFit`) and always reports the switch in the results table, never silently. Same status for
the raw reading's DC magnitude — `baseline.ts`'s `estimateDcBaseline()` handles it either way. Both
get answered by Jay's first real scan; see [docs/open-questions.md](docs/open-questions.md).

Not built yet / still open: background-*shape* correction isn't wired into the scan workflow
(deferred until a real sweep's background shape is characterised — the 30mm metal-proximity warning
in [docs/open-questions.md](docs/open-questions.md) says it'll matter), and the expected scan
`σ`/window size are defaults, not calibrated. No self-update or embeddable-widget wiring yet either.

## Math

| Module | Covers |
| --- | --- |
| `linalg.ts` | Gauss-Jordan solve + closed-form 3x3 inverse — the only linear algebra dependency anywhere in this plugin |
| `smoothing.ts` | Median despiking, Gaussian smoothing, Savitzky-Golay (coefficients derived, not hardcoded) |
| `baseline.ts` | Asymmetric IRLS polynomial baseline, difference-of-Gaussians high-pass, DC-offset estimate |
| `peak1d.ts` | 3-point parabolic, least-squares parabolic (+ standard error via the delta method), Gaussian log-fit, Gaussian-weighted quadratic fit (DC- and valley-tolerant), a dispatcher that auto-switches between the two, optional Gauss-Newton refinement, thresholded centroid |
| `peak2d.ts` | 2D paraboloid and axis-aligned 2D Gaussian fits for a raster scan |
| `quality.ts` | Robust noise estimate, peak/valley polarity detection, incomplete-sweep detection, combined confidence score |
| `repeatability.ts` | Runs a scan N times and reports mean ± sample stddev per axis |

Every function above is pure (no Vue/DOM/DWC dependency) and covered by `src/__tests__/*.test.ts`
against synthetic, closed-form-known signals — no mocking needed.

## Setup

Scaffolded per [dwc-plugin-template](https://github.com/jaysuk/dwc-plugin-template)'s conventions —
same `plugin.json`/`package.json`/CI shape as the other plugins in this family
(`dwc-plugin-runtime`, `dwc-plugin-test-kit`, tests via `dwc-plugin-test-kit/vitest`).

```bash
npm install
npm test                                   # pure-logic + component tests, no DWC checkout needed
DWC_DIR=/path/to/DuetWebControl npm run typecheck
DWC_DIR=/path/to/DuetWebControl npm run verify-build
```

## Releasing

Automated end-to-end, adapted from duet-tool-align's release pipeline:

```bash
npm run release -- 0.16.0 --push   # bumps plugin.json + package.json, commits, tags, pushes
```

The pushed tag triggers `.github/workflows/release.yml`, which builds the ZIP against DWC and
publishes a GitHub Release with the ZIP attached, a generated title (a pun from
`scripts/release-titles.txt`), and Conventional-Commit release notes (the shared generator in
`dwc-plugin-runtime`) plus an install-instructions footer (`scripts/release-footer.mjs`). That footer
also carries the machine-readable marker `src/model/updateCheck.ts`'s in-app update checker reads.

## License

GPL-3.0-or-later
