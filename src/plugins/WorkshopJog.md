---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:07:43.697Z
plugin_updated_on: 2026-11-03T22:07:43.697Z
plugin: true
title: Jog
abstract: Floating jog panel with STOP, E-STOP and saved positions
author: jhonf441
repo: WorkshopJog
branch: main
homepage: https://github.com/jhonf441/WorkshopJog
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v3.13.42
release_date: 2026-11-03T21:07:55Z
release_page: https://github.com/jhonf441/WorkshopJog/releases/tag/v3.13.42
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopJog/main/LICENSE
download_count: 5
tags:
- jog
- cnc
- laser
- fff
- dwc
- sbc
---

# WorkshopJog (Jog panel)



A floating panel on every DWC page to move the machine by hand: a free-direction knob, a Z slider, step buttons, go-to-zero, home, probe, STOP and E-STOP, an advanced tab (macro buttons, extra axes, console, current), the "move without limits" mode and a settings sheet. It is not a page: you open it from the Control bar (button "Jog" under "THIS SCREEN"). The motion goes through the System service (`dsf/jog_move.py`, own DSF connection), not through DWC.

Version documented: 3.13.x on DWC 3.6.3.

## 1. Requirements

1. WorkshopService running; the Duet must be in SBC mode (the panel says so otherwise: "No connection with the System service (the Duet must be in SBC mode)."). 2. Homed axes for limited movement (or the "no limits" mode). 3. Motor power on. 4. Jog is blocked while a JOB runs (file or live job through the bridge); it works when the machine is idle or busy (homing alternates).

## 2. Install

1. Install WorkshopService. 2. DWC > Settings > Plugins > Install `WorkshopJog-<ver>.zip`; Start. Reload DWC. 3. Install WorkshopControlBar to get the button that opens it (or it appears as a floating window by itself). 4. Verify: the Jog window opens with the state line ("Locked: machine off" when off; empty when ready).

## 3. Functions

The Jog is a floating panel that is available on every DWC page. It is opened with the button "Jog" of the group "THIS SCREEN" in the Control bar and closed with the "-" button of its title bar. It moves the real machine: in the pictures the panel was only opened and looked at; no knob, slider, step, Home, Probe, STOP or E-STOP was pressed. The panel is narrow and tall (about 275 x 885 px); the pictures show it at the size it has on a 682 px high screen. Red rectangles mark the control described.

![Jog panel](https://raw.githubusercontent.com/jhonf441/WorkshopJog/main/img/01-jog-panel-step-tab.png)

Picture 1: the whole panel with the "Step" tab: title buttons, position, mode, knob, speed, tabs, axis and step chips, home row and the two stop buttons (red rectangles).

### Panel and title bar

#### Open, close and move the panel
- What: shows the Jog over any page; it can be dragged by the title bar.
- Where: opened by the "Jog" button of the Control bar; "-" at the top right of the panel closes it (picture 1, title bar).
- How: 1. Open the Control bar. 2. Press "Jog". 3. Press "-" to close it.
- Watch out: it only affects this screen.

#### Resize the panel
- What: the panel changes size by dragging the handle in its bottom right corner (a small triangle under the STOP / E-STOP row, never over them). The width sets how big everything is drawn (the knob, the sliders and the buttons keep their proportions, from 0.8 to 1.8 times); the height sets how much is seen before the body scrolls inside.
- Where: bottom right corner of the panel. The gear has no size or zoom setting: the handle is the only way.
- How: drag the corner; the size is remembered on this screen. Two quick taps on the corner give the original size back (as wide as drawn, as tall as its content).
- Watch out: it never gets bigger than the window (on a phone a size saved on a wide screen is fitted, and comes back when the window is wide again) and it never grows under the Emergency stop button of DWC. Full screen (phones) has no handle.

#### State line
- What: the line under the title: "Ready - 2198 mm/min" when you can move, or an orange line with the reason when the jog is blocked: machine off, a job running, a service lock, no sign-in or a view-only role (for example "Locked: Machine off", "Blocked: live job running").
- Where: just under the title bar (picture 1).
- How: read it before touching anything.

#### Lock icon
- What: shows the role / sign-in state of this screen.
- Where: first icon of the title bar (picture 1).
- How: read only.

#### Help mode ("?")
- What: turns on short explanations under each group of buttons.
- Where: third icon of the title bar (picture 1).
- How: press it to turn it on, press again to turn it off.

#### Settings (gear)
- What: opens the sheet "Jog settings" (see below).
- Where: second icon of the title bar (picture 1).
- How: press it; "Cancel" closes the sheet without saving.

### Position

#### Zone / Machine position
- What: the toggle chooses which coordinates the readouts show: Zone (work coordinates of the active zone, for example G55) or Machine (machine coordinates).
- Where: row "Position" (picture 1).
- How: press Zone or Machine.

#### X, Y, Z readouts and Go to X0 / Y0 / Z0
- What: the three readouts with a button under each: "Go to X0", "Go to Y0", "Go to Z0" move that axis to the zero of the active zone. Moving to zero raises Z first (X and Y) and asks for confirmation; "Go to Z0" lowers slowly to the zone Z0 (contact) and asks for confirmation in a dialog.
- Where: under "Position" (red rectangle, picture 1).
- How: 1. Check the path is free. 2. Press the button. 3. Confirm the dialog.
- Watch out: it MOVES the machine.

#### Limits and speed readouts
- What: the limits of the axes (here X -12..620, Y 0..523, Z 0..314), the speed reached / requested in mm/s and the maximum of the axes (X9000 Y9000 Z600 mm/min).
- Where: under the Go to buttons (picture 1).
- How: read only.

### Moving

#### Mode: Free or Straight
- What: "Free" lets the knob go in any direction; "Straight" moves one axis at a time (X and Y as separate sliders) so only one axis moves.
- Where: two buttons above the knob (red rectangle, picture 1).
- How: press one of them.

#### Knob (X / Y direction)
- What: drag the knob in the direction you want; the speed grows with the distance from the centre. A hold sends short segments (every 60 ms); the machine cannot cancel a move it already accepted, so stopping only stops sending new moves.
- Where: round control (red rectangle, picture 1).
- How: 1. Put your hand near the STOP. 2. Drag the knob a little. 3. Release to stop.
- Watch out: it MOVES the machine. Operator role.

#### Z slider
- What: the vertical slider at the right of the knob moves Z up (Z+) or down (Z-).
- Where: next to the knob (red rectangle, picture 1).
- How: drag it up or down and release.
- Watch out: it moves the tool towards or away from the material.

#### Speed slider
- What: sets the speed from MIN to MAX for the knob.
- Where: slider under the knob (red rectangle, picture 1).
- How: drag it.

#### Step tab: axis chips, step slider and "-" / "+"
- What: the chips X, Y, Z choose the axis; the step slider chooses the distance (here 1 mm); the buttons "-" and "+" move: a tap is one step, a hold is continuous until you release.
- Where: tab "Step" and the chips under it (red rectangles, picture 1).
- How: 1. Choose the axis. 2. Choose the step. 3. Tap "+" or "-".
- Watch out: it moves the machine. With the keyboard option on, the arrows (X/Y) and PgUp / PgDn (Z) do the same (it turns off when you close the jog or leave the window).

#### Home row: Home, X, Y, Z and Probe
- What: "Home" homes all axes; "X", "Y", "Z" home one axis; "Probe" measures the surface height with the Z probe (G30 S-1): it lowers Z until it touches and changes no zero; it asks for a double tap.
- Where: row above STOP (red rectangle, picture 1).
- How: press the button (double tap for Probe) and stay next to the machine.
- Watch out: Home and Probe MOVE the machine.

#### STOP and E-STOP
- What: STOP (orange) stops sending moves and halts the active motion; E-STOP (red) is the emergency stop of the machine (M112). STOP is always available, even with a view-only role.
- Where: two buttons at the bottom of the panel (red rectangle, picture 1).
- How: press STOP to halt; press E-STOP in case of danger.
- Watch out: After E-STOP the board must be restarted.

### Advanced tab

![Advanced tab](https://raw.githubusercontent.com/jhonf441/WorkshopJog/main/img/02-jog-panel-advanced-tab.png)

Picture 2: the tab "Advanced" (here all its sections are hidden).

#### Advanced sections
- What: sections that can be shown, hidden and reordered (gear > Sections): macro buttons, extra axes (an axis added in `config.g` with `M584 U..., A...` shows up here and in Step with tap / hold +/-), tool change (RRF runs its tfree / tpre / tpost macros), a console (arrows up / down = history; several orders separated by `;` run one by one and stop if one fails; `M112` and `M999` are refused: use the jog E-STOP) and motor release. This machine shows "All the sections are hidden. Turn them on in the gear > Sections of the Advanced tab."
- Where: tab "Advanced" (red rectangle, picture 2).
- How: press the tab; choose the sections in the gear.
- Watch out: the console and the macro buttons run real G-code.

#### Move without limits (free mode)
- What: moves the axes without homing and outside the limits. DANGER: without homing the position is unknown; the M208 limits and the homing requirement are OFF while it is active. It lowers the motor current (default 50 %), caps the speed (25 mm/s), requires a minimum speed to detect crashes (below it StallGuard does not detect), accepts only moves from the jog, the console and the DWC motion panel (a job or another macro is rejected), shuts itself off after a time without movement, and in Laser mode adds `S0` to every move so the laser does not fire. With homed axes it never passes the limits plus a margin. It needs a backup on the board (`daemon.g`); without it the limits do not come back by themselves if the service falls. The crash sensitivity is set in Motors > Crash.
- Where: option of the Advanced tab / settings; a warning dialog appears when you turn it on.
- How: read the warning, keep your hand on the Emergency Stop, then confirm.

### Jog settings (gear)

![What is shown](https://raw.githubusercontent.com/jhonf441/WorkshopJog/main/img/03-settings-what-is-shown.png)

Picture 3: the sheet "Jog settings": design (Option 1 / Option 2), the tabs and the controls to move (red rectangles).

#### First: start-up card
- What: a green card "First: Start-up - Everything is ready" with the button "Review the start-up", to check again what the Jog needs (come back if you change something on the machine).
- Where: top of the sheet (picture 3).
- How: press "Review the start-up".

#### Design: Option 1 or Option 2
- What: Option 1 is the knob with the tabs Step / Advanced; Option 2 (task based) shows a large position, arrows (tap = one step, hold = smooth continuous), "Go to" with numbers and the stop at the bottom; the knob and everything of option 1 stay in "More". Each option keeps its own settings.
- Where: row "Design" (red rectangle, picture 3).
- How: press an option, then "Save" (or "Cancel").

#### What is shown
- What: controls to move X / Y (Knob, X and Y sliders, Arrows, Keyboard) and Z (Slider, Z+ / Z- buttons); "Show the position above the controls" (large numbers in the work area or the machine, go to zero for each axis, limits and speed reached); the tabs Step and Advanced; extra axes of the Step tab; sections of the Advanced tab.
- Where: tab "What is shown" (picture 3).
- How: choose the options and press "Save".

![Speed](https://raw.githubusercontent.com/jhonf441/WorkshopJog/main/img/04-settings-speed.png)

Picture 4: the tab "Speed".

#### Speed settings
- What: Maximum X/Y speed (here 6000 mm/min; it never exceeds the axis maximum of the board, M203), Z relative to X/Y (35 %), Knob curve (1.6: higher means finer control near the centre) and Dead zone (12 %: how far the knob must move before it starts); and "On opening (this screen)": remember the last speed or start at a fixed percentage. These apply to the MACHINE (all screens): they are stored in `sys/workshop/config/jog.json` and the backend picks them up in about 2 s.
- Where: tab "Speed" (red rectangles, picture 4).
- How: move the sliders and press "Save".
- Watch out: a high maximum speed makes the knob move fast.

![Steps](https://raw.githubusercontent.com/jhonf441/WorkshopJog/main/img/05-settings-steps.png)

Picture 5: the tab "Steps".

#### Steps (distances of the Step tab)
- What: the list of distances in mm separated by commas (up to 12; here 0.01 to 100) and "Step chosen on opening".
- Where: tab "Steps" (red rectangles, picture 5).
- How: type the list, choose the opening step and press "Save".

![Macro buttons](https://raw.githubusercontent.com/jhonf441/WorkshopJog/main/img/06-settings-macro-buttons.png)

Picture 6: the tab "Macro buttons".

#### Macro buttons
- What: makes the buttons of the Jog: pick a button that already exists in the Control bar, a macro of the machine (macros folder) or type G-code; optional state (lights while an object model value matches, for example `global.luz` = true or `state.machineMode` = Laser). They are saved on the machine, so every screen and phone shows the same. The arrows order them and "Delete" (double tap) removes one.
- Where: tab "Macro buttons" with "+ New button" (red rectangle, picture 6).
- How: 1. Press "+ New button". 2. Choose the source and the label. 3. Press "Save".
- Watch out: a button runs the macro or G-code as written.

#### Appearance, Restore this design, Cancel and Save
- What: the tab "Appearance" holds the look of the panel; "Restore this design" returns the factory values of the chosen design; "Save" stores (on the machine, for every screen, unless the setting says "only on this screen"); "Cancel" closes without saving.
- Where: tab row and buttons at the bottom of the sheet (picture 3).
- How: press the button.
- Watch out: "Restore this design" overwrites your settings of that design.

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Step distance | One tap | 1 mm | Large steps near a stop can crash |
| Speed slider | Continuous speed | mid | Too high near limits |
| Free mode current | Motor current in free mode | 50 % | More = more force in a crash |
| Free mode max speed | Cap | 25 mm/s | Higher = harder crashes |
| Free mode idle off | Auto shut off | time-based | Long = risk |
| Macro buttons | Your own buttons | none | A macro that moves is run as is |

## 5. Roles

View-only roles (viewer) see "View only: your role does not move the machine here. STOP is always available." Operator and above can move. Without users everybody is admin; with users, sign in (PIN) first: "You are not signed in. Sign in with your name and PIN to move the machine."

## 6. API operations used

`jog.xy`, `jog.z`, `jog.axis`, `jog.free`, `jog.stop_axis`, `jog.stop_xy`, `jog.stop_z`, `motors.disable`, plus the object model published by the service. The jog backend has a single owner of motion (`motion_owner.py`); jog is blocked while a live job is active.

## 7. Troubleshooting

1. "It does not move: X Y not homed. Home it, or turn on Move without limits.": press Home, or use the free mode if you know what you do.
2. "Bloqueado: ...": machine off, a job or live job running, or a lock of the service; the reason is in the state line.
3. "the Duet is not in SBC mode (the jog needs the system)": the jog needs the service.
4. The service is stopped: start WorkshopService in Settings > Plugins.
5. After homing the arrows seem to jitter: segments shorter than 60 ms; keep default step settings.

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Medium-high (moves the machine)**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and everything it does goes through the API of `WorkshopService`, which applies the roles (viewer, operator, technician, administrator) in the server.

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Files it writes:**
- its settings and saved positions in `0:/sys/workshop/`
- the macros it installs into `0:/sys/workshop/macros/` (for example `workzeroaxis.g`, `jogFreeSet.g`)

**Safety notes:**
- Moving is checked by the service (one owner of the motion, homing, limits); STOP and the emergency stop always work.

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Duet 3 + Pi only; no motion during jobs; RRF cannot cancel a move it already accepted; the free mode never replaces a person watching the machine.

