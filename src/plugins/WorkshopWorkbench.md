---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-04T00:52:42.248Z
plugin_updated_on: 2026-11-04T00:52:42.248Z
plugin: true
title: Workbench
abstract: Work table: bed map, zones, materials, cut editor, cut by parts
author: jhonf441
repo: WorkshopWorkbench
branch: main
homepage: https://github.com/jhonf441/WorkshopWorkbench
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v2.22.17
release_date: 2026-11-03T21:46:13Z
release_page: https://github.com/jhonf441/WorkshopWorkbench/releases/tag/v2.22.17
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/LICENSE
download_count: 6
tags:
- laser
- cnc
- work-zones
- dwc
- sbc
---

# WorkshopWorkbench (Work table)



Page `/Plugins/Workbench` ("Workbench"). Place the job on the bed, set origin and height, follow the cut on a live map and prepare, design and run work: work zones (G54...), materials, cut area, a laser editor with layers, CNC toolpaths with passes by depth, cutting a large design in parts, simulation, the running job and interrupted jobs that can be resumed step by step.

Version documented: 2.22.x on DWC 3.6.3 (hand-written JS plugin in `src/`).

## 1. Requirements

1. WorkshopService running (API, zones, live job state). 2. Machine modes defined (Laser and CNC are served here; FFF has its own page, Printing; the modes follow the Machine plugin). 3. Optional: Camera and Vision for the camera layer and "find center".

## 2. Install

1. Install WorkshopService. 2. DWC > Settings > Plugins > Install `WorkshopWorkbench-<ver>.zip`; Start. Reload DWC. 3. Open *Plugins > Workbench* (also reachable from the side bar). 4. Verify: the bed map draws the cut area (dashed red rectangle), the status bar shows mode, zone (G55 here) and head position.

## 3. Functions

The page is "Workbench" (side menu: Plugins > Workbench). It has a top status bar, a left side bar of tools in two groups ("Work zone": Prepare, Zones, Materials, Work area, Find centre; "Design and cut": Laser editor, CNC toolpaths (CNC mode only), Cut in parts, Simulate job, Job in progress, Interrupted), the bed map in the centre with its toolbar, and at the right the "Inspector" of the chosen tool with a folded "How to use" help. The side bar shows names, or icons only when collapsed with the double arrow. Red rectangles mark the control described. The zone name is blurred in the pictures.

### Top status bar

#### Mode, state, zone, head position and lock
- What: the current mode chip (Laser), the machine state ("Free"), the active zone, the head position X Y Z and, when it applies, a lock chip ("Locked: machine off") that disables the tools that move the machine.
- Where: right side of the page header (picture 2, top).
- How: read only.

#### Pause, Resume and Cancel of the job
- What: buttons next to the state while a file job runs. Printing: Pause. Paused: Resume and Cancel (double tap: the first tap asks, the second cancels). While it is pausing or resuming, and for a live job (a program through the bridge, which has its controls in the Jog bar), no button is offered.
- Where: right side of the page header, next to the machine state.
- How: to cancel a job that is printing, pause it first and then cancel it. RRF refuses to cancel a job that is printing, so Cancel is never offered before the pause (the Job control card of 3D Printing follows the same rule).

#### Commands button
- What: a button labelled "Commands" in the header.
- Where: top right of the page header (red rectangle, picture 2).
- How: press it to open the commands of the page.
- Watch out: ; its content is not described here.

### Bed map

![Bed map](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/01-bed-map-and-toolbar.png)

Picture 1: the bed map with the Interrupted inspector (right) and the toolbar under the map (red rectangle on the toolbar).

#### Bed map and cutting area
- What: the bed with its limits (here X -12..620, Y 0..523) and the dashed red "Area Laser (active)" with its corner coordinates. It shows the chosen zone, its Z point (magenta diamond "Measure focus"), the head and the job or design being prepared. A mini-map sits in a corner.
- Where: centre of the page (picture 1).
- How: drag to move the view, use the wheel or the zoom buttons to zoom.

#### Map toolbar
- What: under the map: eye (show or hide layers), pin (points), ruler (measure), magnet (snap), camera, move, fullscreen of the map; zoom - and +, image; layers, settings and page fullscreen at the right. The footer shows the laser position and the zoom ("Laser X25.46 Y321.33 | Zoom x1").
- Where: bar under the map (red rectangle, picture 1).
- How: press a button to turn that tool on or off; hover it for its name.
- Watch out: the camera and move tools can send the machine somewhere; they ask before moving.

#### Clamps (screws, stops)
- What: markers for the things that must not be touched: a clamp, a screw or a stop on the bed. Each one is a red rectangle on the map. With clamps on, the page warns when a work zone, the Laser editor design or a running job passes over one, and when the Z point would measure a clamp instead of the material. Clamps are off by default (they hide nothing and warn about nothing until you turn them on).
- Where: map toolbar > Layers > "Clamps (CNC)" > "Use clamps: NO / YES". Once on, the layer "Clamps" gets its own eye button. They are stored per machine in `0:/sys/workshop/config/clamps.json`.
- How: 1) Layers > "Use clamps: YES". 2) Tap a point on the map and choose "Mark clamp here": a red 30 x 20 mm rectangle appears centred there. 3) Tap the rectangle to set its name, position, size and height (how far it stands above the material), or to delete it. 4) A path that goes over a clamp turns it brighter red and the job list shows "Shape(s) go over a clamp".
- Watch out: turning "Use clamps" on draws nothing by itself: the screen shows "No clamps marked yet" until you mark one. Turning it off hides them and silences every warning but does not delete them. The CNC toolpaths always check every clamp of `clamps.json`, on or off (a cutter hits a clamp the map hides); with no clamps marked they say the clamps were not checked.

### Work zone

![Prepare](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/02-prepare-steps.png)

Picture 2: "Prepare a job": the six step chips (red rectangle).

#### Prepare a job (six steps)
- What: follows the steps in order, each one marks itself done: 1 Machine ready (all axes homed and the machine free, with what is missing and a "Home" button), 2 Zone, 3 Material, 4 Measure and focus (with the probe, or with a sheet of paper when the machine has none), 5 Check with the pointer, 6 Ready to cut. The steps that move the machine ask for a second tap. The map shows the chosen zone, its Z point and the head.
- Where: Prepare (picture 2).
- How: 1. Do step 1 first. 2. Continue down the list. 3. Press the button of each step.
- Watch out: "Home", "Measure" and "Check with the pointer" MOVE the machine.

![Zones](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/03-zones-active-zone.png)

Picture 3: Zones: tabs "Active zone", "All zones", "Positions" and the menu "Change to..." (red rectangles).

#### Active zone and Change to...
- What: shows the active zone (the zone name is blurred), its origin and homing state, and the menu "Change to..." to pick another zone. Zones are files `p<N>.g` in `sys/workshop/zones`.
- Where: Zones > "Active zone" (picture 3).
- How: open "Change to..." and choose the zone.
- Watch out: changing the zone changes the origin of the next job.

#### Height and focus
- What: the material of the zone and the focus height (mm above the surface); for a laser the probe the machine declares measures the surface of the material at the Z point and the laser ends up at the focus height above it (a machine without a probe uses a sheet of paper, see "Probe, Z zero and the focus geometry"). A zone without a zone file needs one created with Edit / New zone to pick its measuring point. The thickness rule compares the material thickness with what the probe measures.
- Where: card "Height and focus" under the zone (picture 3).
- How: choose the material and type the focus height.
- Watch out: wrong focus height spoils the cut. Technician role.

#### Origin and zero
- What: X0 Y0 is where the pointer falls; the button "Go to X0 Y0 (pointer)" moves the machine there.
- Where: card "Origin and zero" (scroll the inspector down).
- How: press the button.
- Watch out: it moves the machine; not pressed.

#### All zones and Positions
- What: the list of all zones (to choose, edit or create) and the saved positions.
- Where: tabs "All zones" and "Positions" (red rectangle, picture 3).
- How: press a tab.

#### Probe, Z zero and the focus geometry
- What: the Workbench does not assume a BLTouch. The machine declares its probe (`M558 P` in `config.g`, read from the object model as `sensors.probes[0].type`) and every step of the page and every macro asks that:

  | Probe (type) | Servo pin | How the surface is measured |
  |---|---|---|
  | BLTouch (9) | yes: before moving, the alarm is cleared and the pin is stowed | `G30` |
  | switch (5), piezo or unfiltered switch (8), analog (1, 2, 3), Z motor stall (10), scanning probe (11) | no: it gets no `M280`, `M401` or `M402` | `G30` |
  | none, or manual (0) | no | the paper |

  The probe is named in the texts (for example "the probe (switch)"); the pin badge and the "Stow pin" button only appear with a BLTouch. Without a probe that can touch the surface, "Measure and focus", "Focus here" and "Probe Z here" give way to the paper: "Go to the Z point" takes the tool there, you lower it with the Jog until it just drags a sheet of paper, and "Z0 with paper" (double tap) makes that surface Z0 and rises to the focus height. "Focus here (paper)" does the same where the head is.
- Where: the cards "Height and focus", "Advanced" and step 4 of Prepare. In the macros: `zmeasure.g` measures the surface under the probe by its type and is what `laserfocus.g`, `focushere.g` and `zprobepoint.g` call instead of a bare `G30`; with no probe it stops before touching anything. The macros that move the servo (`laserfocus.g`, `focushere.g`, `zprobepoint.g`, `zcal-goto.g`, `zcal-probe.g`, `zcal-szp.g`, `focusref.g`, `zmeasure.g`) send the servo commands only when the probe is type 9.
- How: nothing to set; plug in the probe and declare it with `M558`. The Z calibration profile is `0:/sys/workshop/config/zcal.json` (written by Machine > Height, read here, one entry per mode): `{"version": 1, "paper": 0.1, "modes": {"Laser": {"general": {"method": "bltouch", "setting": 0}, "k0": {"p": 500, "x": 0, "y": 0, "z": 2.467, "date": "2026-10-22"}}}}`. `paper` is the thickness of the sheet in mm; `method` is how the height is measured ("bltouch" means the probe the machine declares, whatever its type; "paper"; "szp" for the scanning probe of a printer); `k0` holds the offsets of the probe (`x`, `y`) and its trigger height (`z`, the `G31` of the mode); `setting` is the fine adjustment in mm. The focus geometry is `0:/sys/workshop/config/focus.json` (`geometry.focusBelowBoxEdge` and `geometry.boxEdgeAboveReference`, in mm, measured with `focusref.g`) and its twin `0:/sys/workshop/config/focus.g` with the same two numbers, which is what `focusrule.g` loads (RRF cannot read JSON). Both files come from the examples of the plugin (copied once, never over an existing file). The service keeps `focus.g` equal to the settings store `focus` (`focus.json`): it rewrites it whenever the store is saved through the API and creates it at start when it is missing, but never replaces a `focus.g` that exists behind your back; if you edit one file by hand, keep them equal, the card warns when they differ or `focus.g` is missing. The focus height of a macro (`laserfocus.g`, `focusrule.g`, `focushere.g`) must be between 0.3 and 60 mm: outside it the macro stops with a message before anything moves.
- Watch out: the numbers of the examples are those of the reference laser (tab 8.0, edge 0.533); another laser needs its own. Not available yet: the touch plate method (`G38.2` against a conductive plate on the material) is not shipped, because a wrong plate thickness or a plate that does not conduct drives the tool into the material and it has no safe stop without a machine to test it on. Without a probe the material macros that call `laserfocus.g` stop at the measuring line: set Z0 with the paper in Prepare first.

![Materials](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/04-materials.png)

Picture 4: Materials: "New (Laser)", "New (CNC)" and "Import from the macros" (red rectangles).

#### Materials table
- What: the material list: material, mode, thickness, focus (inside / safe height; for example MDF 3 mm: at the surface H 7.5; MDF 6 mm: 2.5 mm inside) and the cut and engrave powers, with the zones that use it and an "Edit" button per row. Each zone can have its material; the thickness is compared with what the probe measures and the machine asks before going on if they differ. The powers can be used in the layers of the Laser editor. Focus rule used: H = tab - edge - lever(thickness), where tab and edge are the geometry of the laser in `focus.json` (8.0 and 0.533 on the reference laser).
- Where: Materials (picture 4).
- How: press "Edit" on a row.

#### New material and Import from the macros
- What: "New (Laser)" and "New (CNC)" create a material for that mode; "Import from the macros" reads the materials from the existing macros.
- Where: top of Materials (red rectangles, picture 4).
- How: 1. Press the button. 2. Fill the fields. 3. Save, or cancel.

![Work area](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/05-work-area.png)

Picture 5: "Cutting area" per mode and "Edit in Machine" (red rectangle).

#### Cutting area per mode
- What: the part of the bed you can work on in each mode (bed coordinates where the pointer lands), used by the zones (validation), Frame, the mesh and the zone warnings. Laser: active, 590 x 510 mm, X 20..610 Y 0..510. CNC: not measured.
- Where: Work area (picture 5).
- How: read it.

#### Edit in Machine
- What: opens the Machine plugin to measure or change the area (the measurement is done there).
- Where: button under the cards (red rectangle, picture 5).
- How: press it.

![Find centre](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/06-find-centre.png)

Picture 6: Find centre: the three measurement types (red rectangle).

#### Find centre (hole, rectangle, two points)
- What: measures an existing hole or part to know its centre and size, so you can go there or centre a cut on it. Choose "Hole or round part" (centre and diameter, 3 points), "Rectangular part" (centre, size and rotation) or "Between two points". The camera or the pointer find the points.
- Where: Find centre (picture 6).
- How: 1. Choose the type. 2. Follow the numbered points on the map.
- Watch out: it needs the camera or the pointer and may move the head.

### Design and cut

![Laser editor](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/07-laser-editor.png)

Picture 7: the Laser editor: tool palette on the map (red rectangle), "Show cut order" and "+ Layer".

#### Drawing tools
- What: draw or import a design: select, line, polyline, rectangle, node edit and import file; Undo, Redo and Paste buttons; the list "Drawing" with the number of shapes and the SELECTION buttons "Multiple" and "All".
- Where: the palette at the left of the map and the card "Editor laser" in the inspector (picture 7).
- How: 1. Choose a tool. 2. Draw on the map. 3. Use Undo / Redo.
- Watch out: the origin cannot be saved outside the cut area. The picture shows a sample drawing (a circle and a rotated square).

#### Layers and cut order
- What: "Layers" are cut from top to bottom; each has colour, power %, speed (mm/min) and passes; "+ Layer" adds one; "Show cut order" draws the order on the map. New shapes go to the active layer (blue border).
- Where: card "Layers" (red rectangles, picture 7).
- How: press "+ Layer", set power, speed and passes; press "Show cut order" to check.

#### Cut the design
- What: below the layers, the buttons to send the design to the machine.
- Where: bottom of the inspector (scroll down; not in the picture).
- How: 1. Finish the Prepare steps. 2. Review the layers. 3. Press the cut button and confirm.
- Watch out: starting a cut FIRES THE LASER and moves the machine: Wear the protective glasses and keep the lid closed.

#### Laser cut guard: cutguard.g
- What: every file the page generates for a laser cut (the Laser editor, and the marks and the parts of Cut in parts) starts with `M98 P"0:/sys/workshop/macros/cutguard.g" S<power>`: if the machine is not in Laser mode (the selected mode or the firmware mode set by M452), X or Y is not homed or the power is outside 1 to 100 %, the macro aborts and the whole job is cancelled before the laser turns on. The guard also asks WHO started the job: the file can be launched from DWC (Files, Jobs, `M32` by hand) without the checks the CUT button makes (zone, material, focus, work area, clamps, the laser safety list), so right before it sends the file the page arms ONE launch with `jobarm.g` (kind `Laser`, a permission valid for 30 s) and `cutguard.g` asks for it first and uses it up.
- Where: CUT of the Laser editor and the steps of Cut in parts; `sys/workshop/macros/cutguard.g` and `jobarm.g` on the machine (installed with the plugin).
- How: tick the safety list and press CUT as always; there is nothing else to do. If the job cancels itself at once, read the message of the macro (it names what is not right) and fix it.
- Watch out: launching the file from anywhere else (DWC Files or Jobs, "Start this job" of Simulate job, `M32` by hand, a second start of the same file) cancels the job at its first line, before the laser, and DWC shows the error "Cut: this file was not started from the Workbench page. Press CUT in Workbench > Simple cuts (it checks the zone, the focus, the area and the safety list). The laser was not turned on." (in Spanish when DWC is in Spanish); if more than 30 s pass between CUT and the job beginning, the error is "Cut: the CUT of the Workbench page expired (30 s) before the file began. Press CUT again." In both cases press CUT again on the card. If the card says "The start could not be armed", `jobarm.g` is missing on the machine: reinstall the Workbench plugin so it is in `0:/sys/workshop/macros/`. The permission stops a launch by mistake; it is not a lock against someone who runs `jobarm.g` by hand. A file that the page did not make (LightBurn, CAM) carries no guard and starts from DWC as always.

#### CNC toolpaths (CNC mode)
- What: draws simple shapes (line, rectangle, circle, pocket) and writes a G-code file that cuts them in passes by depth. The tool is offered only in CNC mode and needs the technician role. All values are in mm; Z0 is the top of the material and X Y are bed coordinates. The card has: Design (name, new, save, delete; the designs are kept in `0:/sys/workshop/data/cnc-designs.json`, the one being edited also as a draft in the browser), Tool and material (material, cutter diameter, feed, plunge, spindle rpm, step down, safe Z, approach Z, stepover, file units, direction, "Spindle by hand"; what you type in the tool fields wins over the CNC material), Shapes (add one, "Place on the map", its depth and where the cutter goes: on the line, inside or outside), "Preview by depth" (level by level on the map, with the number of passes, mm of cutting and an estimated time) and File.
- Where: Design and cut > CNC toolpaths (side bar, CNC mode only).
- How: 1. Choose the material and fill the cutter diameter. 2. Add the shapes and place them on the map. 3. Fix every red line the card shows. 4. Press "Create file": it writes `0:/gcodes/cnc-<design>.gcode` and moves nothing. 5. Tick the CNC safety list and press "Start" (two taps).
- What it checks before it lets you create the file: every depth is above 0, within the material and within the Z travel; the step down, feed, safe Z, cutter diameter and spindle speed are set; the cutter fits inside every shape and stays inside the work area; the cutter does not pass over a clamp of `clamps.json` and the safe Z clears its height; at the current Z0 the depth and the safe Z fit in the Z travel. Warnings (they do not block): a step down over twice the cutter diameter, a cut that goes through the material, no work area measured, no clamps in `clamps.json`.
- Watch out: "Start" stays grey, with the reason written under it, until the machine is free and in CNC mode, the card has no errors, the file is made from the current design (any change makes it stale), the Z zero of the active work system is set on the material (still 0 means not set) and the CNC safety list is ticked. Starting the file moves the machine and, unless "Spindle by hand" is on, turns the spindle on.

#### CNC safety list and cncguard.g
- What: before a CNC file starts, the card asks for its own list and records who confirmed it in Activity (a `safety_check` event with the zone and the points). The five points: the spindle turns free and the tool is tight; the workpiece is held (clamps or screws); the extraction or the ventilation is on; nobody is inside the work area; the Z zero is set on the material. The extraction point is dropped when the machine profile declares an extraction interlock (the interlock watches it). The ticks hold 5 minutes and are dropped when the CNC toolpaths tool is closed, another person signs in, the role or the mode changes, or the page is left. Every generated file also starts with `M98 P"0:/sys/workshop/macros/cncguard.g" D<depth> H<safe Z>`: if the machine is not in CNC mode (the selected mode or the firmware mode set by M453), X, Y or Z is not homed, the Z0 of the active work system is 0, the depth does not fit below that Z0 or the safe Z does not fit above it in the Z travel, the macro aborts and the whole job is cancelled before the spindle starts. The guard also asks WHO started the job: the file sits in `0:/gcodes/`, where DWC (Files, Jobs) could launch it without the work area, clamps, out-of-date file and safety list checks that "Start" makes, so right before it sends the file "Start" arms ONE launch with `jobarm.g` (kind `CNC`, a permission valid for 30 s) and `cncguard.g` asks for it first and uses it up.
- Where: card File of CNC toolpaths (the list and "Start"); `sys/workshop/macros/cncguard.g` and `jobarm.g` on the machine (installed with the plugin).
- How: 1. Tick the points of the list. 2. Press "Start" twice. 3. If the job cancels itself at once, read the message of the macro (it names what is not right) and fix it.
- Watch out: a ticked list is about the machine as it is now; if you change something, tick again. The macro is the last guard, not a replacement for looking at the machine. What you see when the guard stops a job: launching the file from anywhere else (DWC Files or Jobs, "Send" of Simulate job, `M32` by hand, a second start of the same file) cancels the job at its first line, before the spindle, and DWC shows the error "CNC: this file was not started from the Workbench page. Press Start in Workbench > CNC toolpaths (it checks the area, the clamps and the safety list). The spindle was not started." (in Spanish when DWC is in Spanish); if more than 30 s pass between "Start" and the job beginning, the error is "CNC: the Start of the Workbench page expired (30 s) before the file began. Press Start again." In both cases press "Start" again on the card (and "Create file" first if the design changed). If the card says "The start could not be armed", `jobarm.g` is missing on the machine: reinstall the Workbench plugin so it is in `0:/sys/workshop/macros/`. The permission stops a launch by mistake; it is not a lock against someone who runs `jobarm.g` by hand.

![Cut in parts](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/08-cut-in-parts.png)

Picture 8: the cut-in-parts assistant (red rectangles on "Choose another file" and "Start over").

#### Cut in parts
- What: an assistant for a design bigger than the work area. Between parts you move the piece by hand; the laser marks 3 small crosses and then the camera (or the pointer) finds them to continue exactly where it stopped. Step 1 chooses the G-code (file, size, cut length, maximum power; it says if it fits whole), step 2 places the piece (part 1) by marking 2 points. You do not have to add anything to your design.
- Where: Cut in parts (picture 8).
- How: 1. Press "Choose another file" or keep the file. 2. Place the piece and mark the 2 points. 3. Follow each part; "Start over" resets the assistant.
- Watch out: the marks and the cut fire the laser and move the machine; not run.

![Simulate job](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/09-simulate-job.png)

Picture 9: Simulate job: "Pick a job file...", "View on the map", "Refresh list", "Clean the table" (red rectangles).

#### Simulate job
- What: pick a G-code file of the job list to see it on the map and decide what to do with it. Nothing is run: the file is only read.
- Where: Simulate job (picture 9).
- How: 1. Open "Pick a job file...". 2. Press "View on the map". 3. Use "Refresh list" to read the list again and "Clean the table" to remove the drawing.
- Watch out: the view moves nothing; other buttons that appear after it (Frame) move the head. "Start this job" (Send this job) starts the file as a normal job: it asks the safety list of the mode of the file (the same boxes as before a cut, recorded in Activity) and stays grey, with the reason written next to it, while the machine is not in that mode (a CNC file in Laser mode would fire the laser at its spindle codes) or the list is not ticked. A file the Workbench made itself (Simple cuts, Cut in parts, CNC toolpaths) only starts from its own button: sent from here it is cancelled at its first line by `cutguard.g` / `cncguard.g`.

![Job in progress](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/10-job-in-progress-checklist.png)

Picture 10: "Ready to cut": the safety list (red rectangle on the confirmation boxes).

#### Job in progress and the safety list
- What: the state of the cut: "Ready to cut" with the checks (homing OK, mode Laser, active zone, material, focus applied, work area and correction known, design without errors, material framed with the pointer) and the four confirmations to tick before cutting (protective glasses on, lid closed, extraction on, nobody inside the work area), then "Open the job to cut". While a job runs it follows the cut on the map (live) with pause and stop.
- Where: Job in progress (picture 10).
- How: 1. Check all lines are OK. 2. Tick the four boxes. 3. Press "Open the job to cut".
- Watch out: it starts a cut: not done. The red chip "The safety list is missing" says what is not confirmed. The ticks hold 5 minutes and are dropped when another person signs in, the role or the mode of the machine changes, the page is left or the CNC toolpaths tool is closed; then they are asked again.

![Interrupted jobs](https://raw.githubusercontent.com/jhonf441/WorkshopWorkbench/main/img/11-interrupted-jobs.png)

Picture 11: "Interrupted jobs" with Resume, Hide path, Start again and Discard (red rectangle).

#### Interrupted jobs: Resume, Hide path, Start again, Discard
- What: a live job stopped safely stays here with the point where it stopped (line, position, mm cut). "Resume" continues it step by step, verified; "Hide path" hides its path on the map; "Start again" restarts it; "Discard" forgets it. When it cannot be resumed (for example the board restarted after the stop and the origins were lost) the card says why and "Resume" is grey.
- Where: Interrupted (picture 11); a number badge on the side bar icon counts the interrupted jobs.
- How: 1. Read the reason. 2. Press "Resume" if it is enabled, or "Start again" or "Discard".
- Watch out: "Resume" and "Start again" move the machine and fire the laser; "Discard" deletes the saved point.

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Active zone (G54..) | Work coordinate system | G54 | Cutting in another zone offsets the job |
| Cut area per mode | Where the tool can work | measured | Too big: the head can leave the bed |
| Material (thickness, focus, powers) | Per zone | per material | Wrong focus: bad cut |
| Layers (power, speed, passes) | Per layer in the editor | 100 % / 110 mm/min / 1 | Too much power burns |
| Snap, layers visible, zoom | View only | on | none |

Files: `sys/workshop/zones/p<N>.g`, `cutarea.g`, `sys/workshop/gcodes`; for the CNC toolpaths `sys/workshop/data/cnc-designs.json`, `sys/workshop/macros/cncguard.g` and the files `0:/gcodes/cnc-<design>.gcode`; read: `sys/workshop/config/zcal.json`, `focus.json`, `focus.g`.

## 5. Roles

Viewer: look only. Operator: move, run jobs in the allowed modes (default laser only). Technician: change zones, materials, area; draw CNC toolpaths and create their files. Admin: all. Interrupted-job resume needs operator. Without users: admin.

## 6. API operations used

`workstate.*`, `workarea.*`, zones and material operations via `settings.*`, `jobs.*` (live job and resume), `vision.*` for "find center", `motion.ask` for risky moves. The camera layer reads the `vision` settings through `settings.*` (the camera is an id of the list of cameras kept by the service; its video is the relay's stream of that camera) and saves there only where the camera is mounted. See the API section of the service page.

## 7. Troubleshooting

1. "Locked: machine off": turn the motor power on (Control bar).
2. "homing missing X Y Z": press "Home" (it moves the machine) or use the Jog.
3. A zone has no file: create it in Zones (Edit / New).
4. Origin refused: it is outside the cut area; measure the area in Machine first.
5. CNC "Start" is grey: the line under it says why (machine busy or not in CNC mode, an error in the card, the file out of date, Z zero not set, safety list missing).
6. A CNC job cancels itself right after it starts: `cncguard.g` aborted it; its message says what is wrong (mode, homing, Z zero, depth or safe Z outside the Z travel).
7. A CNC file you started from DWC (Files, Jobs) is cancelled with "CNC: this file was not started from the Workbench page": start it with "Start" in Workbench > CNC toolpaths.
8. "The start could not be armed" in CNC toolpaths or when cutting: `jobarm.g` is not in `0:/sys/workshop/macros/`; reinstall the Workbench plugin.
9. A cut you started from DWC (Files, Jobs) is cancelled with "Cut: this file was not started from the Workbench page": start it with CUT in Workbench > Simple cuts (or in the steps of Cut in parts).

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Medium-high (moves the machine and runs laser and CNC jobs)**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and everything it does goes through the API of `WorkshopService`, which applies the roles (viewer, operator, technician, administrator) in the server.

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Files it writes:**
- work zones `0:/sys/workshop/zones/p<N>.g`, `cutarea.g`
- materials, designs and positions under `0:/sys/workshop/`
- helper jobs in `0:/sys/workshop/gcodes/`
- CNC designs `0:/sys/workshop/data/cnc-designs.json` and the files made by the CNC toolpaths in `0:/gcodes/` (they are only written; starting one asks the CNC safety list)

**Safety notes:**
- Laser jobs ask for confirmation, check the active zone and the cut area, and every `G1` it generates carries `S0` unless it must fire the laser.
- Laser cut files start with `sys/workshop/macros/cutguard.g`, which cancels the job unless the CUT of the page armed it (`jobarm.g`, one launch, 30 s) and the machine is in Laser mode, X and Y are homed and the power is 1 to 100 %; a cut launched from DWC Files or Jobs is cancelled at its first line. "Start this job" of Simulate job asks the safety list of the mode of the file first.
- CNC files start with `sys/workshop/macros/cncguard.g`, which cancels the job unless the "Start" of the page armed it (`jobarm.g`, one launch, 30 s) and the machine is in CNC mode, homed and with the Z zero set and the depth and safe Z fit in the Z travel; the page also asks the CNC safety list before Start.

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Laser editing is 2D shapes with layers; the CNC toolpaths are lines, rectangles, circles and pockets with passes by depth; cutting by parts needs the camera or the pointer; nothing here replaces the physical emergency stop.

