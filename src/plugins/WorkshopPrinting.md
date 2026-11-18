---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:10:49.681Z
plugin_updated_on: 2026-11-03T22:10:49.681Z
plugin: true
title: 3D Printing
abstract: 3D printing page: heaters, PID tuning, pellet or filament extruder
author: jhonf441
repo: WorkshopPrinting
branch: main
homepage: https://github.com/jhonf441/WorkshopPrinting
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v2.15.19
release_date: 2026-11-03T21:09:07Z
release_page: https://github.com/jhonf441/WorkshopPrinting/releases/tag/v2.15.19
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/LICENSE
download_count: 10
tags:
- fff
- 3d-printing
- pellet
- dwc
- sbc
---

# WorkshopPrinting (3D printing)



Page `/Plugins/Printing` ("3D printing"). Heaters, extruder, materials and the 3D job (FFF mode): state, preheat and configuration, head change guide, printer tests, pellet zones and feed, extruder flow, nozzle change and PID calibration (M303). It is made for pellet extruders and also works with a filament extruder (see *Extruder type*).

Version documented: 2.15.x on DWC 3.6.3.

## 1. Requirements

1. WorkshopService running. 2. FFF mode defined in the machine (`sys/modefff.g`: tool with extruder, heaters, sensors, fans). 3. Mode FFF enabled in the Machine plugin (Machine > Machine modes).

## 2. Install

1. Install WorkshopService. 2. DWC > Settings > Plugins > Install `WorkshopPrinting-<ver>.zip`; Start. Reload DWC. 3. Open *Plugins > 3D printing*. 4. Verify: the header chips "All fine" and "Mode FFF" and the side bar with the Operate and Configure groups.

## 3. Functions

The page is "3D printing" (side menu: Plugins > Printing). Its side bar has two groups: "Operate" (Status, Pellet panel, Materials, Load material, 3D job) and "Configure" (Printer tests, Head change, Pellet setup, Extruder, PID). With a filament extruder the Pellet panel and Pellet setup entries are hidden; with a pellet extruder Load material is hidden (see Extruder type). The temperatures and values in the pictures are examples.

### Page header and side bar

![Status](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/01-status-cards.png)

Picture 1: the page header (red rectangle at the top right), the side bar (left) and the heater cards of Status.

#### Header chips
- What: the overall state ("All fine", or the number of things to look at), the machine mode ("Mode FFF") and the active tool.
- Where: top right of the page header (picture 1).
- How: read only. Heater faults, cold extrusion allowed and a mode other than FFF show here as attention items.

#### Side bar
- What: the sections of the page in two groups, Operate and Configure. It shows only what your role may use.
- Where: left of the page (picture 1). The arrow at its top collapses it to icons.
- How: press a section to open it.

#### Start-up checklist
![Start-up](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/25-startup-checklist.png)

Picture 25: the start-up checklist opened from the rocket icon.

- What: what this page needs from the machine, with a progress bar and the list of cards to review.
- Where: the rocket icon at the right end of the header (picture 25).
- How: press the icon; "Show them" lists the cards.

### Operate

#### Status
- What: one card per heater (bed and each nozzle zone) with the temperature, the target, the limit, the heating state and a power bar.
- Where: Operate > Status, top (picture 1).
- How: read only.

![Status, lower part](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/02-status-fans-and-config.png)

Picture 2: fans, "Turn off all heaters" and the list "How it is configured".

#### Temperatures chart
- What: the temperature of every heater for the last 5 or 10 minutes. Solid line: temperature; dashes: target; dots: the limit (M143), with the Limits button.
- Where: below the cards (picture 1 and 2). Tap the chart to see the values at that moment.
- How: choose 5 min or 10 min.

#### Fans
- What: each fan with its speed; "(automatic)" marks a fan that follows a temperature.
- Where: under the chart (picture 2, first red rectangle).
- How: read only; the speed is changed in the Pellet panel.

#### Turn off all heaters
- What: sets the target of every heater to off.
- Where: button under the fans (picture 2, second rectangle).
- How: press it; it changes the real machine.

#### How it is configured
![Heater detail](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/03-status-heater-detail.png)

Picture 3: a heater opened: where it belongs, output, sensor, limit, model and control.

- What: for each heater, the tool and zone it belongs to, its sensor (M308), its limit (M143), its model (M307) and the PID in use.
- Where: list under the fans (picture 2); open a row (picture 3).
- How: open a row; "Read from the board" asks the board for M950, M308, M307 and M143 and shows the answers (read only).

#### Cold extrusion
![Cold extrusion](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/04-status-cold-extrusion.png)

Picture 4: the cold extrusion protection.

- What: tells whether the extruder is locked (it does not push below the minimum nozzle temperature nor retract below its own) and lets a technician allow it.
- Where: last card of Status (picture 4).
- How: "Allow cold extrusion" unlocks it until the board restarts. It switches a protection off: use it only when you know why.

#### Pellet panel
![Pellet panel](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/05-pellet-panel.png)

Picture 5: the extruder drawing and the editor of the selected zone.

- What: live drawing of the pellet extruder: hopper with its feeding state, the screw motor, the throat and part fans and the heat zones with temperature, setpoint and power. The colour says the state: at temperature, heating, overshoot, fault or off.
- Where: Operate > Pellet panel. Tap a part of the drawing to see its editor at the right (red rectangles in picture 5).
- How: tap a zone; type a temperature and press "Heat this zone" or "Turn zone off". "Tune PID" opens the PID section for that zone.
- Watch out: the buttons heat the real machine.

#### Screw motor
![Screw motor](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/06-pellet-panel-motor.png)

Picture 6: the motor selected.

- What: speed and data of the screw motor, a short motor test (extrude or retract a few millimetres), the flow factor, the pressure advance and a shortcut to the flow calibration.
- Where: tap the motor in the drawing (picture 6).
- How: type length and speed and press Extrude or Retract; type a flow percentage or a pressure advance and press Apply. The motor does not run while a zone is below the cold extrusion temperature.
- Watch out: flow applies now and is lost when the board restarts; pressure advance is also kept for the start when a technician applies it.

#### Fans (live)
![Fan editor](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/07-pellet-panel-fan.png)

Picture 7: the throat fan selected.

- What: for a thermostatic fan, the temperature where it starts and the one where it reaches full speed.
- Where: tap a fan in the drawing (picture 7).
- How: type both temperatures and press Apply. The saved value stays in the configuration file.

#### Hopper feeding
![Hopper feeding](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/08-pellet-panel-feeding.png)

Picture 8: the hopper selected.

- What: the level sensor, the feeding mechanism and a manual feed.
- Where: tap the hopper in the drawing (picture 8).
- How: "Feed 6 s" runs the mechanism for the configured time. In automatic mode the board feeds by itself when the sensor says the hopper is empty.

#### Materials
![Materials](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/09-materials.png)

Picture 9: the material table.

- What: the material list: nozzle and bed temperature, fan speed and density. The density is used by the flow calibration.
- Where: Operate > Materials (picture 9).
- How: press Preheat on a row to heat the bed and the nozzle (zone 1 goes to the material temperature and the others follow the steps of the Pellet setup); edit the cells, add a material and press Save; "Factory values" restores the list. A value above the machine limit shows in red.
- Watch out: Preheat heats the real machine.

#### Load material
- What: a short assistant to feed filament into a filament tool or take it out: heat to the material temperature, push or pull a length at a safe speed, cool down. It is hidden for a pellet tool.
- Where: Operate > Load material (operator).
- How: 1. choose the material (its nozzle temperature comes from the Materials table; "Tool temperature" uses the target the tool already has) and press Heat twice; wait for "ready". 2. press Load or Unload twice. When the board has the filament macros (`0:/filaments/<name>/load.g` and `unload.g`) the buttons run M701 / M702 (M701 only with a material chosen, since its name is the folder; with "Tool temperature" Load moves directly); otherwise they move the extruder directly (M83 + G1 E) with the length (1 to 800 mm) and the speed (1 to 20 mm/s) you type; unloading pushes 3 mm first to soften the tip. 3. Cool down if you are not printing now (it turns the heaters off and clears the active and standby temperatures of the tool, `M568 S0 R0 A0`, so nothing heats it again when the tool is selected later).
- Watch out: the extruder never moves while the nozzle is below the cold extrusion temperature of the board, with a job running, or when the nozzle reads no temperature; Heat and Cool down are not offered either with a job running or the machine busy (the temperatures of a job come from the file). The reason is written next to the buttons.

#### 3D job
![3D job running](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/11-job-running.png)

Picture 11: a job in progress.

- What: the temperatures, the state of the print (file, progress, layer, height, elapsed and remaining time, speed and extrusion factors) and a file list with a 3D view.
- Where: Operate > 3D job (picture 11).
- How: the state follows the job the machine is running.

#### Job control
- What: the controls of the print in progress, in the 3D job section under the print state: Pause (M25), Resume (M24) and Cancel (M0, two taps, only while paused, like DWC); Z baby-stepping (M290) in steps of 0.02 and 0.05 mm (two taps per step) with the sum the board applies and "Reset to 0" (two taps); the speed factor (M220, 10 to 300 %) and the flow factor of each extruder of the tool (M221 D, 10 to 300 %).
- Where: Operate > 3D job (operator; a viewer sees the values with the buttons grey).
- How: the Z steps and the percentages work only while a job runs (a printing or paused file job, or a live job); with no job their buttons are grey and the card says so. They apply at once and stay applied after the job ends, until you put them back, the board restarts or a file changes them: with no job running the card warns about what a job left applied (Z sum, speed, flow), and "Reset to 0" and "100 %" are always available to put it back before the next job. The Z sum is capped at 2 mm either way: more than that is a wrong Z offset, not a correction. A live job has its controls in the Jog bar.

#### 3D view
![3D view](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/10-job-3d-view.png)

Picture 10: the 3D view of a file with the layer slider.

- What: the G-code of a file of `0:/gcodes` drawn in 3D, layer by layer. It only shows; nothing is sent to the machine.
- Where: the file list and "View in 3D" under the print state; the slider and the view buttons under it (picture 10).
- How: choose a file and press "View in 3D". Move the slider to see up to a layer ("Up to this layer") or only that layer ("Only this layer"). Drag to turn, wheel or two fingers to zoom; Isometric, Top, Front and Show bed set the view.

### Configure

#### Printer tests
![Printer tests](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/12-printer-tests.png)

Picture 12: the guided tests.

- What: a checklist of 8 steps (temperature sensors, each heater heats, fans, the extruder pushes outward, extruder flow, and more). "Each heater heats" is a real test, one by one: it sets the heater to 60 °C (the bed and the chamber to 40) and checks that it rises 5 °C in less than 2 minutes, then turns it off.
- Where: Configure > Printer tests (picture 12).
- How: open the step, press the test button of a heater (for example "Test bed"), then Next, or Skip a step, or "Close assistant".
- Watch out: the tests heat the machine; never run them unattended.

#### Head change
![Head change](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/13-head-change-guide.png)

Picture 13: the head change guide.

- What: a guide to change the head of a machine that works in several modes: turn the laser or the spindle off (M5), raise Z 30 mm, remove the head and mount the pellet extruder (connect heater, thermistor, fans and driver, with the machine off or the motors still), put the print surface on and clear the bed, switch the mode, home (G28) and check the nozzle Z height before the first layer.
- Where: Configure > Head change (picture 13). It appears only when the machine uses more than one mode.
- How: choose the target (FFF or CNC), then do the steps in order; each opens when the previous is done.
- Watch out: "Raise Z" and "Home" move the machine; make sure nothing is in the way and the machine is powered.

#### Pellet setup
- What: where the pellet extruder is configured: heat zones, fans, feeding, motor, nozzle and panel layout. What you watch and run live is in the Pellet panel. It writes `modefff.g` with a `.bak` copy; reload FFF mode afterwards.
- Where: Configure > Pellet setup, with a tab bar for its six parts (pictures 14 to 19). It is hidden with a filament extruder.

#### Heat zones
![Heat zones](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/14-setup-zones.png)

Picture 14: the zones in order.

- What: the zones from the nozzle (zone 1) to the inlet, each with its heater and sensor, its temperature, its limit and the step: how many °C colder than the nozzle it works.
- Where: tab "Heat zones" (picture 14).
- How: change the order with the arrows or by dragging a row (it tells what that implies before writing); type the steps and press "Save steps"; "+ Zone" adds a zone; "Monitoring sensor" opens a sensor to watch a zone.
- Watch out: keep the inlet colder than the nozzle so the pellet does not soften early. Saving changes the machine configuration.

#### Fans (setup)
![Fans](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/15-setup-fans.png)

Picture 15: the fans of the board and the form to add one.

- What: the fans the board has with their output and speed, and a form to define a new fan (a part fan or a thermostatic throat fan): name, output connector and frequency.
- Where: tab "Fans" (picture 15).
- How: press "+ Fan", fill the form and press "Add fan". The connector must be free and the fan wired there.

#### Feeding
![Feeding](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/16-setup-feeding.png)

Picture 16: the feeding of the hopper.

- What: manual or automatic feeding, the level sensor (an input of the board and what value means "pellet"), the feeding mechanism (an output and its frequency) and the times: how long each run lasts, the wait between runs and the maximum time.
- Where: tab "Feeding" (picture 16).
- How: choose the mode, fill the sensor and the mechanism and press "Save feeding". "Feed 6 s" tests the mechanism and "Remove feeding" deletes the lines.
- Watch out: saving writes lines into `modefff.g` (with a backup); the board uses them when FFF mode is reloaded.

#### Motor
![Motor](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/17-setup-motor.png)

Picture 17: the screw motor data.

- What: steps per mm, microsteps, maximum speed, acceleration and jerk of the extruder motor, and the flow and pressure advance now in use. Below, the screw motor card: the acceleration, the jerk and the top speed as the board reports them (the speed in mm/s and in mm/min), three starting points to begin with (soft, balanced, fast) and the retraction (length and speed).
- Where: tab "Motor" (picture 17).
- How: to change the acceleration, the jerk or the top speed press "Change in Machine" next to it: Machine > Motion opens on that value, shows the change before it writes it, keeps a backup and records it in the history. Type the retraction and press "Save the retraction": it is applied now and saved in `modefff.g` with a `.bak` copy. "Calibrate screw flow" opens the Extruder section and "Open the pellet panel" the live panel.
- Watch out: Machine changes the first extruder only; for another extruder the card says so and you change its `M201`, `M203` and `M566` lines in the configuration file.

#### Nozzle
![Nozzle](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/18-setup-nozzle.png)

Picture 18: the nozzle change guide.

- What: the firmware does not know the nozzle diameter. The guide takes you through a nozzle change (hot, because the pellet inside is hard when cold) and says what to redo with the new diameter. It keeps the calibrations of each diameter (flow, PID, pressure advance).
- Where: tab "Nozzle" (picture 18).
- How: type the new diameter and the melt temperature and follow the guide.
- Watch out: the nozzle is hot while you change it.

#### Panel layout
![Panel layout](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/19-setup-panel-layout.png)

Picture 19: vertical or horizontal.

- What: how the Pellet panel is drawn, with the extruder axis vertical or horizontal. It is a choice of the machine and it is saved.
- Where: tab "Panel layout" (picture 19).
- How: press Vertical or Horizontal.

#### Extruder
![Extruder](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/20-extruder-type-purge-flow.png)

Picture 20: extruder type, purge and flow calibration.

- What: the extruder type, a purge and the calibration of the flow by weight.
- Where: Configure > Extruder (picture 20).
- How: see the next three functions.

#### Extruder type
![Filament type](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/22-extruder-filament-type.png)

Picture 22: with Filament chosen the Pellet panel and Pellet setup entries are gone.

- What: the type is a choice of each tool, so one machine can have a pellet tool and a filament tool. Pellets (the default) shows the Pellet panel and Pellet setup pages for that tool. Filament hides them and calibrates the flow with filament.
- Where: the Status page says the type of the tool you are looking at, with a Change button; the setting itself is at the top of the Extruder section (picture 20 and 22). With more than one tool, a Tool selector at the top of Status chooses which tool the page works on (by default the one the machine has now).
- How: choose the tool, then press Pellets or Filament (technician).

#### Purge
- What: pushes plastic out of the nozzle: when starting, when changing material or to clean.
- Where: Extruder section (picture 20).
- How: type the length and the speed and press Purge, then press again to confirm. Collect what comes out with tweezers (it is hot).
- Watch out: the nozzle must be at temperature.

#### Calibrate the flow (by weight)
![Flow calculation](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/21-extruder-flow-result.png)

Picture 21: the calculation after typing the weight.

- What: the slicer computes the extrusion for a given filament diameter; you extrude a length, weigh what comes out and the page computes the new steps per mm (M92 E).
- Where: Extruder section (picture 20 and 21).
- How: 1. Preheat the material and purge until it comes out evenly. 2. Choose the material, the diameter used in the slicer, the length and the speed and press "Extrude to weigh"; collect everything that comes out. 3. Weigh it (ideally with a 0.01 g scale) and type the weight: the page shows the expected weight, the measured one, the percentage and the new value. 4. "Apply now" uses it until the mode changes; "Save to modefff.g" keeps it (with a `.bak` copy).
- Watch out: if the result is very different from the expected one, check the weight, the diameter and that you collected everything before changing anything.

#### PID
![PID model](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/23-pid-model.png)

Picture 23: the model of a heater.

- What: the PID calibration (M303) of each heater: it heats and cools several times to learn the heater response, with a chart of temperature and power sampled by the service. It also shows the model the board has now.
- Where: Configure > PID (picture 23).
- How: choose the heater (Bed or a nozzle zone), type the temperature and press "Calibrate...". "Save to modefff.g" replaces the M307 line of that heater (with a `.bak` copy); "Read again" asks the board again.
- Watch out: it heats and cools the machine for several minutes; never run it unattended. While it lasts the status light marks an active risk.

#### Heater analysis
![PID values](https://raw.githubusercontent.com/jhonf441/WorkshopPrinting/main/img/24-pid-values-and-calcs.png)

Picture 24: the PID values and the calculations with them.

- What: "How it is and how it works" rates the model (for example Good) and lists the board values (heating, cooling, exponent, dead time, maximum power, voltage), the PID values with what each means, the limit and the sensor, and calculations with the target: the maximum at full power, the power to hold, the time to get there and the margin to the limit. A table lists all the heaters at a glance.
- Where: PID section, below the model (picture 24).
- How: read only.

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Active mode | Laser / CNC / FFF | per machine | Printing pages off outside FFF |
| Extruder type (of each tool) | Pellets or Filament | Pellets | Filament hides the pellet pages of that tool |
| Zones (heater + sensor) | Heater and sensor per pellet zone | from `modefff.g` | Wrong sensor: thermal runaway or no heat |
| Zone steps | °C colder than the nozzle | per material | Equal or hotter inlet: jams the throat |
| Pellet flow, nozzle diameter | Extrusion calibration | by weight | Under or over extrusion |
| PID values | Heater loop | from M303 | Oscillation or overshoot |

Files written: `sys/modefff.g` (backup `.bak-<stamp>`), `0:/sys/workshop/config/printing.json` (materials, steps, feeding, panel layout, extruder type, nozzle profiles).

## 5. Roles

Viewing: any role. Heating, tests, preheat, fan changes, loading material, pausing / resuming / cancelling the job, Z baby-stepping and the speed and flow factors: operator or technician; changes to the configuration (zones, feeding, extruder type, flow, PID) and allowing cold extrusion: technician or admin. Without users: admin.

## 6. API operations used

`jobs.preview`, `pid.trace`, `risk.start`, `risk.end` (marks hot operations as risk for the status light), `activity.log`, `view.heartbeat`, `settings.*`.

## 7. Troubleshooting

1. Printing pages are grey or off: the machine is not in FFF mode; use the mode button of the Control bar or the Machine plugin.
2. "Z not homed": home the machine first.
3. After saving the configuration the board does not use it: reload FFF mode (the page says so).
4. PID chart empty: the process `pid_trace` rests when Printing is stopped.
5. No Pellet panel: the extruder type is Filament (Extruder section).

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Medium (heats; edits the mode files)**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and everything it does goes through the API of `WorkshopService`, which applies the roles (viewer, operator, technician, administrator) in the server.

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Files it writes:**
- `modefff.g`, `select*.g` and `printing.json` through a preview and a `.bak` copy
- its PID and pellet settings under `0:/sys/workshop/`

**Safety notes:**
- Heating tests and PID tuning ask for a double tap and stay off unless you start them.

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Made for pellet extruders by default; for a filament extruder, set the extruder type to Filament in the Extruder section (it hides the pellet pages). The nozzle diameter is not known by the firmware; heater tests and PID heat the machine: do them with someone present.
