---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:11:33.142Z
plugin_updated_on: 2026-11-03T22:11:33.142Z
plugin: true
title: Vision
abstract: Camera measurements: detect pieces, calibration, fire and smoke watch
author: jhonf441
repo: WorkshopVision
branch: main
homepage: https://github.com/jhonf441/WorkshopVision
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v2.7.9
release_date: 2026-11-03T21:08:35Z
release_page: https://github.com/jhonf441/WorkshopVision/releases/tag/v2.7.9
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/LICENSE
download_count: 4
tags:
- camera
- vision
- opencv
- dwc
- sbc
---

# WorkshopVision (Vision)



Page `/Plugins/Vision` ("Vision (camera)"). Measures with the bridge camera: finds parts, holes and circles, shows dimensions over the video, keeps a library of known parts, compares the bed before and after cutting, aligns a design with 2 marks and cuts on top of them, calibrates the camera (pixels to millimetres), and watches for fire and smoke during laser jobs. It has its own backend (`vision.py`, OpenCV, port 8095) and depends on the System service.

Version documented: 2.7.x on DWC 3.6.3.

## 1. Requirements

1. WorkshopService running. 2. OpenCV on the Pi (shown in the page header chip "OpenCV 5.0.0"; the pre-install check warns if missing). 3. A camera calibrated for the bed (chip "calibrada + altura"). 4. Port 8095 free. 5. Camera relay running (shared with Camera and Workbench).

## 2. Install

1. Install WorkshopService. 2. Stop nothing: DWC > Settings > Plugins > Install `WorkshopVision-<ver>.zip` (it has a backend; its Python dependencies are installed by DSF). Start. 3. Reload DWC; *Plugins > Vision (camera)* appears. 4. Verify: header chips "OpenCV <ver>", fps, "camera without image" (orange) or "calibrated + height" (green), switch "In Work zones: Yes" and the start-up chip ("1 steps pending" until calibrated).

## 3. Functions

The page is "Vision (camera)" (side menu: Plugins > Vision). Its side bar has three groups: "Measure" (Step by step, Detect and measure, Live, Saved parts), "Job" (Before and after, Cut on marks) and "Camera" (Calibrate the camera (guided), Calibrate, Settings). Names show when the bar is open, icons only when collapsed with the double arrow. The camera image is at the left and the card of the chosen tool at the right. Red rectangles mark the control described.

### Page header

#### Engine, speed and calibration chips
- What: "OpenCV 5.0.0" (the detection engine), the frames per second of the camera ("18 fps"), "calibrated + height" or "camera without image" and, when something is missing, "N steps pending".
- Where: header, right (any picture).
- How: read only.

#### In Work zones switch
- What: shows or hides the camera video under the map of the work zones (Workbench / Zones), aligned with the calibration; it follows the gantry in Y and Z.
- Where: green switch "In Work zones" at the right of the header (red rectangle, picture 1).
- How: press the switch.
- Watch out: it needs the camera calibrated.

### Measure

![Detect and measure](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/01-detect-and-measure-image-source.png)

Picture 1: Detect and measure: the video with rulers in bed millimetres, the card "Image to measure" and the card "Detections" (red rectangles).

#### Image to measure: Live video or Measuring photo
- What: "Live video" is quick for looking and aiming (the resolution is the camera's own image profile); "Measuring photo" is precise: the camera switches to 2048x1536 for a few seconds. The line "gantry at Y321.3 Z7.5" says where the camera is.
- Where: card "Image to measure" (red rectangle, picture 1).
- How: press one of the two buttons; then analyze the image.
- Watch out: the measuring photo changes the camera mode for a few seconds.

#### Detections list and filters
- What: the parts and holes found in the image ("4 found"): chips All, Part, Hole; each card shows size, position X Y, rotation, shape, area and perimeter (for example "Part 1: 49.8x37.3, X 324.17 Y 400, rotation 89.87 deg"). Detections also appear in the Workbench map, layer Vision.
- Where: card "Detections" (picture 1 and picture 2).
- How: press a chip to filter; tap a detection (here or on the image) to see its actions (set as mark A / B, save as part...).

#### Height of what you measure
- What: the camera measures on the plane of the bed, so a tall object looks bigger; type the height of the part you measure (for example the rim of a glass).
- Where: field at the top of "Detections" (picture 2).
- How: type the height in mm.

#### Dimensions and Dimensions report
- What: the toggle "Dimensions: Yes" shows the dimensions on the image; "Dimensions report" downloads a table (CSV, for a spreadsheet) with the part and each hole: position on the machine, position from the bottom-left corner of the part, diameter and roundness (see "Files this page writes").
- Where: two buttons in "Detections" (red rectangle, picture 1).
- How: press the toggle or the report button.

![Detections](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/02-detections-and-see-live.png)

Picture 2: the detections list, "See live" under the image and the dimension buttons (red rectangles).

#### Image bar and See live
- What: under the video a bar says "Image from 20:09:14 - 800x600" (the time of the analyzed image); "See live" goes back to the live video.
- Where: bottom left of the image (red rectangle, picture 2).
- How: press "See live".

#### Tool bar of the image
- What: under the video: View / Measure / Area / Zone / Move tools, zoom, grid, ruler, "Find", head, Live, Analyze, Save and Settings; a footer shows the size, analysis time and scale (for example "19.28 px/mm, 1 px = 0.05 mm") and what is searched (Part, Holes).
- Where: below the image (scroll down; not in the picture).
- How: choose a tool and press Analyze; tap a detection.

#### Advanced: detection parameters
- What: separation, sensitivity and minimum sizes of the detection.
- Where: fold "Advanced: detection parameters" under the detections.
- How: unfold it and change one value at a time.

![Step by step](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/03-step-by-step.png)

Picture 3: Step by step with "Done" and "Start over" (red rectangles).

#### Step by step (guided)
- What: the guided path: 1 put the material on the bed (flat, bed clear around it; if the camera is not calibrated, calibrate first), 2 choose the image, 3 detect the part, 4 tap the part in the image, 5 use it.
- Where: Step by step (picture 3).
- How: 1. Press "Done" in step 1. 2. Follow each step. 3. Press "Start over" to restart.

#### Live detection
- What: continuous detection on the live video (the fps in the header).
- Where: entry "Live" of the side bar.
- How: press it to see the detections follow the video.
- Watch out: video running.

![Saved parts](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/04-saved-parts.png)

Picture 4: "Save a part" with "Analyze" and "Saved parts" with its option (red rectangles).

#### Save a part
- What: analyze the image and tap a part (or a rectangle) to choose it; its shape and sizes are saved and afterwards it is marked with its name every time it shows in the image.
- Where: card "Save a part" (picture 4).
- How: 1. Press "Analyze". 2. Tap the part. 3. Give it a name and save.

#### Saved parts and recognition
- What: the list of saved parts and the option "Recognize them by themselves in the image (star name)".
- Where: card "Saved parts" (picture 4; "There are no saved parts yet.").
- How: tick or untick the option.

### Job

![Before and after](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/05-before-and-after.png)

Picture 5: "Before photo" (red rectangle).

#### Before and after
- What: compares the bed before and after cutting: 1) before cutting, with the camera looking at the part, press "Before photo"; 2) after the cut, WITHOUT moving the camera, press "Compare". What changed shows in red: what was cut, what moved or what was left half-done. Useful to see at a glance whether a part was not cut through.
- Where: Before and after (picture 5).
- How: 1. Press "Before photo". 2. Cut. 3. Press "Compare" (it appears after the first photo).
- Watch out: do not move the camera between the two photos.

![Cut on marks](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/06-cut-on-marks.png)

Picture 6: "Cut on marks": the four fields of the two marks (red rectangle).

#### Cut on marks
- What: aligns the design with 2 marks on an already printed or moved part and cuts on top. 1) Put two marks (circles or crosses) far apart in your design and note where they are (fields Mark A / Mark B in the design, X and Y; defaults A 0,0 and B 100,0). 2) Analyze the image, tap each detected mark and choose Mark A / Mark B in its actions. 3) Use the origin in Zones and, if the part is rotated, apply the rotation before cutting. The card says "Mark A on the machine: not chosen - Mark B: not chosen" until you choose them.
- Where: Cut on marks (picture 6).
- How: type the design coordinates of both marks, then choose them on the image.
- Watch out: check the rotation before cutting.

### Camera

![Guided calibration](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/07-guided-calibration.png)

Picture 7: "Calibrate the camera (guided)": five steps (red rectangles on "Refresh" and "Start over").

#### Calibrate the camera (guided)
- What: calibrates the camera in five steps with the marker sheet: 1 check the image (here "The camera is not sending an image" because the image was not ready), 2 put the sheet with the 4 markers on the bed, flat and in view, with the camera above it (machine still and axes homed), 3 take the photo of the sheet, 4 calibrate, 5 save.
- Where: Camera > "Calibrate the camera (guided)" (picture 7).
- How: 1. Press "Refresh" if the image is missing. 2. Follow the steps in order. 3. "Start over" restarts.

![Calibration assistant](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/08-calibration-assistant-methods.png)

Picture 8: "Calibration assistant": the method buttons (red rectangles).

#### Calibrate: choose a method
- What: the advanced calibration assistant. With the laser: "Laser crosses" (the easiest, nothing to print). Without laser: "A4 sheet" (nothing to print) or "Chessboard" (the most accurate by hand; it corrects the lens); also "ArUco" markers or "Points by hand".
- Where: Camera > Calibrate, step "Choose a method and calibrate" (picture 8).
- How: press the method and follow its steps.
- Watch out: "Laser crosses" FIRES THE LASER and moves the gantry; not run.

#### Second height and Check
- What: "Second height": to measure and take photos at any Z, calibrate again with the gantry 50 mm or more higher or lower (the laser crosses do it on their own). "Check": measure something of known size in Detect and measure: the difference is the real error; the button "Go to Detect and measure" jumps there.
- Where: steps 3 and 4 of the assistant (picture 8, lower half).
- How: calibrate at the second height, then measure a ruler.

### Settings

![Settings](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/09-settings-processing-and-fire-watch.png)

Picture 9: the Settings cards "Camera processing" and "Fire and smoke watch" (red rectangles).

#### Camera processing
- What: switch "Processing the camera (automatic mode)": the service receives images only when needed. Off: it does not receive frames, makes no timelapse and does not watch the camera, even with Vision, Camera or Workbench open; the same switch turns it back on.
- Where: card "Camera processing" (red rectangle, picture 9).
- How: press the switch.
- Watch out: turning it off also stops the timelapse and the fire watch.

#### Fire and smoke watch
- What: switch "Watch during laser jobs": while a laser job runs the camera looks at the bed about twice per second; a flame or dense smoke for a few seconds is logged in Activity, notified to the phone and, after a countdown that can be cancelled, does what you choose in "On detection": "Just warn" (default), "Pause the job" or "Emergency stop". A fold "How it works and its limits" explains what it cannot detect.
- Where: card "Fire and smoke watch" (red rectangles, picture 9).
- How: 1. Turn the switch on. 2. Choose the action. 3. Read "How it works and its limits".
- Watch out: it is an aid, not a fire protection system. Technician role.

![Sensitivity and exposure](https://raw.githubusercontent.com/jhonf441/WorkshopVision/main/img/10-settings-sensitivity-and-exposure.png)

Picture 10: sensitivity, the last detection and the photo exposure (red rectangles).

#### Sensitivity
- What: Low, Medium (default) or High. High warns earlier (smaller flame, less time) but may be fooled by materials that glow when cut; low needs a bigger flame and more time. Below it the page shows the last detection with its photo.
- Where: card "Fire and smoke watch", below the action (red rectangle, picture 10).
- How: press one of the three buttons.

#### Where the camera is mounted
- What: "On the gantry (follows Y and Z)" or "On the carriage (follows X, Y and Z)": how the image moves with the machine.
- Where: card at the top of the middle column (picture 9).
- How: choose the one that matches your machine.
- Watch out: a wrong choice makes the map and the measures wrong.

#### Measuring photos
- What: measuring photo size (here 2048x1536, the maximum), minimum Z for photos (60 mm), mosaic overlap (0 to 0.5) and unused border (0 to 0.2), with its Save button. Calibration is per resolution: if you change the measuring photo resolution, calibrate again.
- Where: card "Measuring photos" (picture 9, middle column).
- How: 1. Change the values. 2. Press "Save".

#### Photo exposure
- What: Automatic, "Adjust by itself" (default: it checks the photo and, if it comes out burnt or dark, corrects and takes another, up to 3 times; best with white or shiny material), Compensate or Manual; fields "Starting level" and "Target brightness" (0 to 255, here 115); Save. The surveillance video stays automatic.
- Where: card "Photo exposure" (red rectangle, picture 10).
- How: choose the mode and the values, press "Save".

#### Light for the photo, Camera and Work zones map
- What: "Light for the photo": choose which lights turn on only during the photo (the usual work light; extra zones of Lights appear here). "Camera": which camera Vision looks at, chosen from the list of cameras of the system (only the ones the relay serves; the main one by default). The same camera is the video of the camera layer of the work zones map. "Work zones map": the video shows under the map (its opacity is chosen on the map itself, in Layers, and is kept per screen).
- Where: right column of Settings (picture 9, top right; picture 10, top right).
- How: change the value and press its "Save".
- Watch out: the camera is read by the system, not by the browser.

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Processing the camera | Service receives frames | automatic | Off: no timelapse, no fire watch |
| Watch fire and smoke during laser | 2 looks per second while lasing | Yes | Off: no automatic fire warning |
| On detection | Only warn / pause the job / emergency stop | Only warn | Emergency stop on a false alarm kills a job |
| Sensitivity | Low / Medium / High | Medium | High: false alarms on bright material |
| Measurement photo resolution | Pixels | 2048x1536 | Changing it needs a new calibration |
| Minimum Z for photos | Head height limit for mosaic photos | 60 mm | Too low: head too near the part |
| Exposure | Photo exposure mode | Adjust by itself, 115 | Burnt photo: wrong measures |

## 5. Roles

The backend (port 8095) asks the service who is calling (`vision_access.py`): GET reads need operator or a viewer with "camera for viewers"; a picture without headers may use the day key; POSTs need operator or technician; saving calibration and settings: technician. Without users: open on the network. A fire-watch action "pause" or "emergency stop" acts on the machine.

## 6. API operations used

Vision's own HTTP on :8095 (`vision.get`, `vision.post` through the service client), `lights.get`, `modules.set` (processing switch), `machine.workarea.save`, `camera.*`. Machine v2 uses `vision.measure` for camera verification (not available yet).

## 7. Troubleshooting

1. "camera without image": the camera is off or the relay is stopped; check Camera and the service.
2. Header says OpenCV missing: install `opencv-python-headless` for the Pi's Python (preflight warns).
3. Measures off by size: enter the height of what you measure, or calibrate the second height.
4. Calibration lost after changing resolution: calibrate again.
5. Port 8095 busy: another process uses it; see preflight.

<!-- permissions:start -->

## Permissions and what it changes

Risk: **High (own Python process; fire watch can pause a job or send an emergency stop)**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions** (DSF shows them and you approve them when you install; the zip asks for nothing else):

| Permission | What it lets the plugin do |
|---|---|
| `commandExecution` | send G-code to the board |
| `objectModelRead` | read the state of the machine |
| `networkAccess` | open network connections (notices, the meter, the camera, the service API) |
| `fileSystemAccess` | read and write files outside the DSF folders (keys, camera files) |

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Runs a program on the Pi:** `vision.py` as the `dsf` user (restarted by DSF if it stops).

**Files it writes:**
- its settings, bed photos and calibration under `0:/sys/workshop/`

**What it needs outside the zip** (each one is a separate step you do on purpose and can undo):
- Python packages in its own venv: `opencv-python-headless`, `numpy`, `dsf-python`
- port 8095 (all interfaces by default; `WORKSHOP_VISION_BIND=127.0.0.1` keeps it on the Pi)

**Safety notes:**
- The fire and smoke watch is a help, NOT a safety system. With no users, anyone on the network can use port 8095.

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Measures on the bed plane (tall objects need the height); fire watch is an aid, not a certified detector and never replaces being present; Vision has no `/measure` for Machine v2 yet; stops with the plugin (and its backend rests when stopped).

## Files this page writes

Every file is named `<name>-<YYYYMMDD-HHMMSS>.<extension>` (local time of the browser). None of them is read back by the page.

**Dimensions report (`workshop-vision-dimensions-...csv`).** UTF-8 with a byte order mark, comma separated, lines end with CRLF (a spreadsheet whose list separator is `;` opens it in one column: use its text import, Data, From text/CSV).
The first row holds the column keys, always in English. A number carries no unit and uses a dot; an empty cell means no value. One row for the part and one per hole, in the order along the part.

| Column | Meaning |
|---|---|
| `element` | `part` or `hole` |
| `number` | Number of the hole (1, 2...); empty for the part |
| `machine_x_mm`, `machine_y_mm` | Bottom-left corner of the part, or centre of the hole, in mm of the machine |
| `along_mm`, `across_mm` | Position from the bottom-left corner of the part along its two sides (0 and 0 for the part) |
| `diameter_mm`, `roundness` | Of the hole (roundness 1 is a perfect circle); empty when the camera did not measure it |
| `length_mm`, `width_mm`, `rotation_deg` | Of the part only: the sides of its smallest enclosing rectangle and its rotation |

**Piece drawing (`workshop-vision-piece-<name of the piece>-...svg`).** The outline and the holes of a detected piece in an SVG in mm, Y downward, with 0,0 at the top-left corner of the outline; a comment names the piece and says where its bottom-left corner was on the machine.
It is a drawing, not data: it has no envelope.

**Camera image (`workshop-vision-image-...jpg`).** The image shown with what is drawn on it, at its resolution (JPEG). It is a picture, not data: it has no envelope.
