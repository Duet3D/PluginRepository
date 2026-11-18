---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:09:08.020Z
plugin_updated_on: 2026-11-03T22:09:08.021Z
plugin: true
title: Power Usage
abstract: Energy use from a Tuya meter: live power, per job and cost
author: jhonf441
repo: WorkshopPower
branch: main
homepage: https://github.com/jhonf441/WorkshopPower
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v2.7.14
release_date: 2026-11-01T02:40:59Z
release_page: https://github.com/jhonf441/WorkshopPower/releases/tag/v2.7.14
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopPower/main/LICENSE
download_count: 7
tags:
- power
- monitor
- dwc
- sbc
---

# WorkshopPower (Consumption)



Page `/Plugins/Power` ("Power usage"). Shows what the machine uses: now (watts, volts, amps), by period (day / month / year), by finished job, and a detailed history; with cost from a price per kWh and a monthly cap. It reads a smart energy meter (here a Tuya meter, read only) through the System service. The meter section configures the meter.

Version documented: 2.7.x on DWC 3.6.3.

## 1. Requirements

1. WorkshopService running (reads the meter every 30 s, stores consumption in the database `duet.db`, table `consumption`). 2. An energy meter the service can read (machine profile `meter`: `{kind: tuya | none | ...}`); Tuya needs the device id, local key and address, entered in the Meter section (stored in `/opt/dsf/conf/workshop-secrets.json`, mode 600). 3. Python `tinytuya` is used by the service for Tuya.

## 2. Install

1. Install WorkshopService. 2. DWC > Settings > Plugins > Install `WorkshopPower-<ver>.zip`; Start. Reload DWC. 3. Open *Monitor > Power usage*. 4. Open *Meter* and set up the meter (see 3.5). Verify: the Summary shows a live reading ("Live" with the age of the reading) and the header "All fine".

## 3. Functions

The page is "Power usage" (side menu: Plugins > Power). Its side bar has five entries: Summary, By period, Jobs, History, Meter (icons only when collapsed with the double arrow). Red rectangles mark the control described.

### Page header

#### State chip and pending steps
- What: "All fine" or a warning, and "N steps pending" (setup steps not done yet, for example the meter or the price).
- Where: top right of the page header (picture 1).
- How: read only.

### Summary

![Summary](https://raw.githubusercontent.com/jhonf441/WorkshopPower/main/img/01-summary-live-power.png)

Picture 1: live state at the top left, tiles Today / This month / Month projection, "Set limit" and "Change" (red rectangles). The power reads "--" because the meter did not answer at that moment.

#### Live power
- What: the power now in watts (W), voltage and current, with the chip "Live - N s ago" and the "Meter" link.
- Where: top left card (picture 1).
- How: the "Meter" link opens the Meter entry of the side bar.
- Watch out: W is the power at this moment; kWh is the accumulated energy.

#### Today, This month and Month projection
- What: energy and cost of today, of the month so far, and the projected total for the month.
- Where: three tiles at the right of the live card (picture 1).
- How: read only.

#### Monthly energy limit
- What: you choose how many kWh you want to use at most per month and the page warns when you get close.
- Where: card "Monthly energy limit", button "Set limit" (red rectangle, picture 1).
- How: 1. Press "Set limit". 2. Type the kWh in the field that appears. 3. Press Save (or Cancel). Once set, the card shows the use against the limit with "Change" and "Clear".
- Watch out: the limit is saved only in this browser.

#### Rate (price per kWh)
- What: the price used for all costs (here 800 COP per kWh). The currency follows the DWC language or the machine profile.
- Where: line "Rate" with the link "Change" (red rectangle, picture 1, bottom).
- How: 1. Press "Change". 2. Type the price. 3. Save.
- Watch out: it changes the cost shown everywhere (see Roles).

### By period

![By period](https://raw.githubusercontent.com/jhonf441/WorkshopPower/main/img/02-energy-by-period.png)

Picture 2: "Energy per period": Day / Month / Year, date arrows, totals and the hourly bars.

#### Day / Month / Year and date arrows
- What: chooses the span (a day by hours, a month by days, a year by months) and moves to the previous or next one.
- Where: top right buttons and the arrows around the date (picture 2).
- How: 1. Press Day, Month or Year. 2. Use the arrows to move.

#### Period totals and comparison
- What: total energy and cost of the period, how much less or more than the previous period at the same time, average per hour and the hour with the highest usage.
- Where: left and right of the chart title area (picture 2).

#### Bar chart per hour
- What: bars per hour with the dotted average ("avg.") and the previous day as grey ticks to compare; tap a bar for its value.
- Where: chart in the lower part of picture 2.

#### Export CSV (by period)
- What: downloads the period as a CSV file.
- Where: button "Export CSV" at the top right of the card (picture 2).
- Watch out: it downloads a file.

### Jobs

![Jobs](https://raw.githubusercontent.com/jhonf441/WorkshopPower/main/img/03-finished-jobs.png)

Picture 3: "Finished jobs" with the filters (red rectangle), tiles and "Energy per process".

#### Filters and sort
- What: the period (7 days / 30 days), the mode (All / Laser / No mode), "Sort by" (Most recent and others) and "Hide cancelled".
- Where: top of the card (red rectangle, picture 3).
- How: press the buttons; the tiles and the list follow.

#### Job tiles and energy per process
- What: Jobs (count and time working), Energy (total and the largest job), Cost, Average per job; bars "Energy per process" by mode with jobs and time.
- Where: under the filters (picture 3).

#### Job list by day and Export CSV
- What: the list of jobs grouped by day with energy and cost of each; "Export CSV" downloads it.
- Where: below "Energy per process"; button at the top right of the card.
- Watch out: job names are not shown in the picture; "Export CSV" downloads a file.

### History

![History](https://raw.githubusercontent.com/jhonf441/WorkshopPower/main/img/04-detailed-history.png)

Picture 4: "Detailed history" with the span buttons (red rectangle), tiles and the Power chart.

#### Span and date picker
- What: the span of the readings: 24 h, 7 days, 30 days or a chosen date (calendar button).
- Where: top right of the card (red rectangle, picture 4).
- How: press a span or the calendar and pick a day.

#### Tiles and charts
- What: Consumed, Average, Peak, Idle (power when nothing works, with its cost per day) and Readings (one every 30 s); charts Power (W) with the peak line, Voltage (V) and Current (A) over time.
- Where: tiles and chart under the span buttons (picture 4); voltage and current charts are below (scroll the card).
- Watch out: a gap in the chart is a time without readings.

### Meter

![Meter settings](https://raw.githubusercontent.com/jhonf441/WorkshopPower/main/img/05-meter-settings.png)

Picture 5: "Meter settings": the list of meters with "Add meter" and "Edit" (red rectangles). ID, address and key are blurred.

#### Meter list and state
- What: each meter with its name, state dot, current power ("Answering"), the roles (here "powers the system" and "cut last") and its ID, IP, version and key (partly hidden).
- Where: card "Meter settings" (picture 5).
- Watch out: it shows the address and part of the key: blur them before sharing a picture. The line "On shutdown it cuts" tells which meter the shutdown cuts last (the one powering the system).

#### Add meter and Edit
- What: "Add meter" registers another meter; "Edit" changes the name, the device data and the roles of one.
- Where: red rectangles in picture 5.
- How: 1. Press "Add meter" or "Edit". 2. Fill the data. 3. Save, or cancel.
- Watch out: For a Tuya meter the local key changes every time the device is paired again in the Tuya app: run the `tinytuya` wizard again if the reading stops. The reading uses `updatedps(["6"])`, which fails about one time in three on the local network, so the service retries up to 4 times.

![Meter health](https://raw.githubusercontent.com/jhonf441/WorkshopPower/main/img/06-meter-health.png)

Picture 6: bottom of the Meter entry: "Meter health" and "How it works".

#### Meter health and How it works
- What: last reading, good readings, failures and success percentage, time between readings, the last failure with its time, and a folded text "How it works" (red rectangle).
- Where: bottom of the Meter entry (picture 6).
- How: press "How it works" to unfold it.
- Watch out: failures are normal at a low percentage (the meter misses some answers).

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Price per kWh (`energy.rate_set`) | Cost basis | 800 COP (this machine) | All costs wrong |
| Monthly cap (kWh) | Page warning | none, per browser | Lost on another browser |
| Meter (kind, device, key) | Where the data come from | none | No reading: "no meter" |
| Reading period | Sampling | 30 s | n/a |

## 5. Roles

Looking: any role. Changing the price and the meter: technician or admin (`profile.set`, `energy.rate_set`). The same meter also powers the safe shutdown (cut of the whole machine) used by the Control bar; the consumption page reads it read-only.

## 6. API operations used

`energy.history`, `energy.period`, `energy.rate_get`, `energy.rate_set`, `activity.list`, `profile.set`, `view.heartbeat`.

## 7. Troubleshooting

1. Header not green / no reading: the meter does not answer; check its network and the key (Tuya key rotates when re-paired).
2. Readings missing in the chart: the service was stopped or the meter unreachable; gaps are not interpolated.
3. Cost looks wrong: change the price in the Summary.
4. The monthly cap vanished: it is stored per browser only.

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Low**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and everything it does goes through the API of `WorkshopService`, which applies the roles (viewer, operator, technician, administrator) in the server.

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Files it writes:**
- consumption history in the service database
- the key of the Tuya meter in `/opt/dsf/conf/workshop-secrets.json` (mode 600)

**What it needs outside the zip** (each one is a separate step you do on purpose and can undo):
- `tinytuya` to read the meter on your network (done by the service)

**Safety notes:**
- Reading the meter does not need internet. The tariff and the monthly limit are yours.

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Reads one meter; kWh by job are estimates from the 30 s readings; Tuya local protocol drops some reads (retried).

