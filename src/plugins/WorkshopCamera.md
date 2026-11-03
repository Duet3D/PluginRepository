---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:07:01.076Z
plugin_updated_on: 2026-11-03T22:07:01.076Z
plugin: true
title: Camera
abstract: Camera viewer, photos and timelapse studio (MJPEG / ESP32-CAM)
author: jhonf441
repo: WorkshopCamera
branch: main
homepage: https://github.com/jhonf441/WorkshopCamera
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v2.12.6
release_date: 2026-11-03T21:07:20Z
release_page: https://github.com/jhonf441/WorkshopCamera/releases/tag/v2.12.6
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/LICENSE
download_count: 9
tags:
- camera
- dwc
- sbc
---

# WorkshopCamera (Camera and timelapses)



Two things in one plugin: (a) a floating camera viewer available on every DWC page (live video, photo capture with date, job and position, focus helper, flash / light, orientation, camera list, start / stop of the system relay and image profiles) and (b) the page `/Plugins/Timelapses` ("Timelapses and captures") that records timelapses of jobs or by hand, edits them, and manages videos and photos. Recording and video building are done by the System service (camera relay on port 8090 and `ffmpeg`; OpenCV is not needed).

Version documented: 2.11.x on DWC 3.6.3.

## 1. Requirements

1. WorkshopService running (camera relay and timelapse engine; it rests only if Camera, Vision and Workbench are all stopped). 2. `ffmpeg` on the Pi. 3. One or more cameras with an MJPEG stream (ESP32-CAM `http://<ip>:81/stream`, or any MJPEG source). Up to 4 cameras. 4. Free space: with less than 2 GB free the system does not record.

## 2. Install

1. Install WorkshopService. 2. DWC > Settings > Plugins > Install `WorkshopCamera-<ver>.zip`; Start. Reload DWC. 3. A camera button appears in the Control bar (side bar, "Camera") and the page "Timelapses and captures" under *Plugins*. 4. Open the viewer, add the camera address in its settings (gear). Without a camera the plugin shows "no camera" help.

## 3. Functions

The plugin has two parts: the floating camera viewer (available on every DWC page, opened with the "Camera" button of the Control bar) and the page "Timelapses and captures" (side menu: Plugins > Timelapses and captures). The page side bar has five entries: Record, Studio, Videos, Captures, Settings. Red rectangles mark the control described. The addresses of the cameras are blurred.

### Floating viewer

![Camera viewer](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/01-camera-viewer.png)

Picture 1: the viewer with its top buttons, the camera selector and the bottom buttons (red rectangles).

#### Open and close the viewer
- What: shows the live image of a camera in a window over any page.
- Where: opened by the button "Camera" of the group "THIS SCREEN" in the Control bar; closed with the cross at the top right of the window (picture 1).
- How: 1. Open the Control bar. 2. Press "Camera". 3. Press the cross to close it.
- Watch out: it only affects this screen; no process stops. Closing it is the way to stop watching without cutting the camera for others.

#### Move and resize the window
- What: the window can be dragged and resized from the corner handle at the bottom right.
- Where: the window (picture 1).
- How: drag the window by its top area, or the corner handle.

#### Camera selector
- What: one button per camera ("Principal", "Vigilancia"); the selected one is blue. A status text at the bottom says "not answering for N min" when a camera does not answer.
- Where: top centre of the window (red rectangle, picture 1).
- How: press a camera name.

#### Photo mode and live video
- What: the badge "PHOTO - every 3 s" means the viewer shows a photo every 3 seconds (light on the network); the play button switches to live video ("LIVE") and back.
- Where: round play button at the top left (picture 1, second button).
- How: press it once for live video, again to return to photo mode.
- Watch out: live video uses more network and CPU of the camera.

#### Flash
- What: turns the workshop light strip on for the camera (the ESP32-CAM has no LED of its own). The yellow colour means it is on.
- Where: lightning button at the top left of the window (picture 1, first button).
- How: press it to switch the flash on or off. The system remembers it and switches it off by itself when nobody looks at the camera any more (or after 10 minutes), so closing the viewer never leaves it on.
- Watch out: it changes the real lights.

#### Capture a photo
- What: saves a photo with the date, the job and the position; it appears in "Captures".
- Where: first button of the bottom row (picture 1).
- How: press it.
- Watch out: it writes a file on the system. A camera that does not go through the system relay cannot be captured.

#### All cameras (grid)
- What: shows all the cameras together.
- Where: second button of the bottom row (picture 1).
- How: press it, press again to go back.

#### Zoom in and zoom out
- What: digital zoom of the image.
- Where: third and fourth buttons of the bottom row, "+" and "-" (picture 1).
- How: press them, or use the wheel or a pinch over the image.

#### Timelapse start / stop
- What: starts or stops a timelapse recording by hand, with the cameras and layout chosen in the page Settings. The red button shows it is recording and another tap stops it; when it stops the video is built on the system.
- Where: red round button of the bottom row (picture 1).
- How: press it to start; press it again to stop.
- Watch out: it records to the system card and needs more than 2 GB free.

#### Focus assistant
- What: a sharpness meter: turn the lens and the bar rises when the image is sharper; stop at the peak. "Best" keeps the highest value and the restart link clears it. It says "Too dark to focus: turn on the flash" when the image is dark.
- Where: last button of the bottom row (picture 1).
- How: 1. Press it. 2. Turn the lens slowly. 3. Stop at the peak.
- Watch out: it does not work on cameras that do not allow measuring their image.

![Cameras](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/02-cameras-sheet-and-orientation.png)

Picture 2: the sheet "Cameras" opened with the gear: list, orientation and buttons (red rectangles).

#### Cameras sheet (gear)
- What: the list of cameras (the same on every screen; the one shown is per screen) with their address and state ("watching", "at rest - photo in N ms", "not answering for N min"). Any camera with an MJPEG stream works (ESP32-CAM, IP camera, mjpg-streamer, motion).
- Where: gear at the top left of the window (picture 2).
- How: press the gear; "Close" closes the sheet.

#### Edit a camera, Add camera and Search cameras
- What: "Edit" changes a camera (name, address); "+ Add camera" adds one (up to 4); "Search cameras" looks for cameras on the network.
- Where: sheet "Cameras" (red rectangles, picture 2).
- How: 1. Press the button. 2. Fill or choose. 3. Save, or cancel.
- Watch out: Technician role.

#### System relay: state, Stop relay and Start relay
- What: the relay is the process of the system (port 8090) that shares the camera video with every screen and makes the captures and timelapses. The card "Camera relay (process on the system)" says whether it runs ("Running, 2 watching.", "STOPPED: nobody sees the camera.", "No camera address yet: add a camera first.", or "State unknown: the service did not answer.") and offers "Stop relay" and "Start relay". Only the one that makes sense now is on; the other is grey.
- Where: sheet "Cameras", under the buttons "+ Add camera", "Search cameras", "Captures and timelapse" and "See all" (not in picture 2).
- How: 1. Open the sheet with the gear. 2. To stop it press "Stop relay", then press again within 4 s ("Tap again: cut it for EVERYONE"). 3. To start it press "Start relay". 4. The line above is read again a moment later.
- Watch out: the same card can be put in the control bar (optional, off by default: gear of the bar > the switch "Camera relay"; technician role; it reads the state every 15 s only while the bar is open and the card is on). Stopping it cuts the camera for EVERYONE watching it now, on every screen, and no capture or timelapse can be made until it starts again. To stop watching only on your screen, close the viewer. Technician role. The same sheet shows, when you edit the Main camera with an empty address, which camera the relay reads and lets you change its address.

#### Orientation
- What: Auto (uses the Vision calibration, only for the calibrated camera), 0, 90, 180, 270 degrees, Horizontal mirror and Mirror vertically; it applies to this screen only.
- Where: "Orientation" in the sheet (red rectangle, picture 2).
- How: press the option you want.

#### Captures and timelapse, See all, Image settings
- What: "Captures and timelapse" opens the page of this plugin; "See all" shows every camera; "Image settings" opens the camera profiles.
- Where: bottom buttons of the sheet (picture 2).
- How: press the button.

![Profiles](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/03-camera-settings-profiles.png)

Picture 3: "Camera settings": the profiles and the automatic switch (red rectangles).

#### Image profiles
- What: Balanced (good and smooth, for everyday), During cut (less exposure: the laser dot does not burn out the image), Detail (more resolution to align or focus, fewer frames per second), Low light (more exposure and gain, some noise; the flash helps more) and Smooth / slow network (small, light image). One shows "suggested now".
- Where: sheet "Camera settings" (picture 3, top).
- How: press a profile to apply it to the camera.
- Watch out: it changes the settings of the real camera.

#### Switch automatically to the suggested profile
- What: when ticked, the viewer uses "During cut" while a laser cut runs and "Balanced" the rest of the time.
- Where: checkbox under the profiles (red rectangle, picture 3).
- How: tick or untick.

#### Fine tuning
- What: a fold with finer image values of the camera.
- Where: bottom of the sheet (picture 3).
- How: press it to unfold.

### Page layout (since 2.12)
The page `/Plugins/Timelapses` has a side bar with six sections in three groups, each one a SINGLE card whose parts are sub-sections. The older "Record / Studio / Videos / Captures / Settings" tabs below were folded into them (the sections below keep describing what each part does): Operate = **Live** (capture now, record a timelapse, light, quick image profiles, the 3 s preview photo, "Open the floating viewer") and **Library** (videos and captures); Video quality = **Studio**; Configure = **Cameras**, **Image** (preview, focus assistant, profile chips, orientation, fine tuning) and **Storage** (usage, limits, notices, and the system relay inside the same card). Choosing a section from far down the page scrolls to its start. Saved tab ids migrate (`record` to Live, `videos` and `captures` to Library, `settings` to Storage). The operator sees Live and Library; the technician sees all six. Screenshots of the new layout are pending (PENDING-CAPTURES.md).

### Page: Record

![Record](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/04-record-timelapse-and-schedule.png)

Picture 4: the cards "Timelapse", "Schedule", "How it will record" and "Capture now" (red rectangles).

#### Timelapse: Start now
- What: records by hand, with the cameras and layout set in Settings, with or without a job, until you press Stop. A name is optional.
- Where: card "Timelapse" (picture 4).
- How: 1. Type a name if you want. 2. Press "Start now". 3. Stop it later from the same card or the viewer.
- Watch out: with less than 2 GB free on the system it does not start and stops what is recording.

#### Schedule
- What: the system starts and stops by itself, even if you close the page: "Starts" and "Stops" date and time, a name and the button "Schedule". Without a start time it starts now; without a stop time it keeps going until Stop or the maximum duration.
- Where: card "Schedule" (picture 4).
- How: 1. Choose the dates. 2. Press "Schedule".

#### How it will record and Change in Settings
- What: a summary: cameras, one photo every 10 s, stops by itself after 12 h, video 15 frames/s, with every job (no, only by hand), photos by time, light correction; the button "Change in Settings" opens the Settings entry.
- Where: card "How it will record" (picture 4).
- How: press "Change in Settings".

#### Capture now
- What: one button per camera ("Principal", "Vigilancia") saves a photo with the date, job and position; it shows in Captures.
- Where: bottom of "How it will record" (picture 4).
- How: press the camera button.
- Watch out: writes a file.

### Page: Studio

![Studio](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/05-studio-preview-and-capture.png)

Picture 5: "Preview", "Capture" and "Framing".

#### Preview
- What: a real photo of the camera with the framing and colour already applied: what the video will look like. Buttons choose the camera.
- Where: card "Preview" (red rectangle on the camera buttons, picture 5).
- How: press a camera name.

#### Capture: interval, ramp, date and time, flicker, keep photos
- What: "A still every N s"; "Interval ramp (day to night)"; "Date and time on every still"; "Smooth light flicker"; "Keep the stills for the editor" (a .zip with every still and `frames.csv` is saved next to the video; it takes space and counts in the video limit).
- Where: card "Capture" (picture 5).
- How: type the interval and tick the options.

#### Framing, size and slow push
- What: crop to a cinema format (aspect ratio), choose the size and add a slow push (zoom) and stabilization.
- Where: card "Framing" under Capture (picture 5, bottom; scroll for the rest).
- How: choose the aspect ratio and the other values.

#### Presets
- What: one tap sets codec, frame, colour and speed: Web 1080p, Cinema 2.39:1, Editor: ProRes, Editor: DNxHR, Vertical 9:16, Quick draft.
- Where: card "Presets" (scroll down; not in the picture).
- How: press a preset.

### Page: Videos and Captures

![Videos](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/06-videos-list.png)

Picture 6: "Timelapses (3)" with the search box (red rectangle).

#### Videos list: search, select, view, download, rename, trim, speed
- What: searchable list of videos with a checkbox to choose several: name, date, length, size and camera. Each can be viewed, downloaded, renamed, trimmed or sped up (editing creates a NEW video; the original stays). Delete and download are on each item. The names in the picture are test files of this machine.
- Where: Videos (picture 6).
- How: 1. Search by name. 2. Tick one or several. 3. Press the action you need.
- Watch out: delete is permanent.

![Captures](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/07-captures-gallery.png)

Picture 7: "Captures (13)" gallery with the search box (red rectangle).

#### Captures gallery
- What: the photos with their date, job and position (name `YYYYMMDD-HHMMSS-...`) and the camera; tick several to download or delete.
- Where: Captures (picture 7).
- How: search by name, tick, then press download or delete.
- Watch out: delete is permanent.

### Page: Settings

![Settings](https://raw.githubusercontent.com/jhonf441/WorkshopCamera/main/img/08-settings-recording-video-storage.png)

Picture 8: the cards "Recording", "How the video is built" and "Where it's stored" (red rectangles on the job switch, the cameras and the speed).

#### Recording
- What: "Timelapse of every job (starts and ends with the job)" on or off; cameras (up to 4); Photos: By time or One per layer (3D printing); one photo every N s; date and time written on each photo; maximum duration (15 min to 24 h, default 12 h): when reached it stops and builds the video; it also stops if less than 2 GB is left free.
- Where: card "Recording" (picture 8, left).
- How: change the values and press "Save settings" at the bottom of the page.

#### How the video is built
- What: Speed (Slow 10 / Normal 15 / Fast 24 / Very fast 30 frames/s); name and date at the start and its size; smooth light changes; hold still at the end (seconds). One hour of recording gives 360 photos per camera and 24 s of video; with 2 or more cameras the video is a mosaic or alternates.
- Where: card "How the video is built" (picture 8, middle).
- How: choose the values and save.

#### Where it's stored
- What: videos in `0:/workshop/camera/timelapse` and photos in `0:/workshop/camera/captures`; the space for the videos (1.5 / 4 / 5 / 8 / 11 GB), the maximum number of videos (10 to 200) and captures (100 to 3000), and how long to notify and wait before deleting the oldest (1 hour to 7 days). Kept items are never deleted automatically.
- Where: card "Where it's stored" (picture 8, right).
- How: choose the limits and save.
- Watch out: when a limit is exceeded the oldest items are marked for deletion and a phone notification arrives.

#### Phone notifications and Save settings
- What: a warning when a camera stops answering (lower in the page; whether an alert carries a photo or a video is chosen per type in the Activity page); "Save settings" stores everything in the system for every screen.
- Where: bottom of Settings (scroll down; not in the picture).
- How: tick the options and press "Save settings".

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Camera address | MJPEG stream URL; changing it cuts the video a few seconds on all screens | per camera | Wrong URL: no image |
| Go through the relay | Several screens, captures and timelapse | on | Off: direct, no capture or timelapse |
| Photos every N s | Timelapse interval | 10 s | Too short fills the disk |
| Max duration | Auto stop | 12 h | Too long uses space |
| Video limits (GB, count) | Old ones get marked for deletion with a phone notice and a grace period; kept ones never deleted | 5 GB, 30 videos | Over the limit: oldest marked |
| Image profile | Resolution, exposure, gain | Balanced | Laser dot burns the image: use "during cut" |

## 5. Roles

Viewer: sees the camera only if "camera for viewers" is on (service Users section); operator: capture, start / stop timelapse; technician: camera list and settings, start / stop of the system relay; admin: all. The relay (8090) asks the service who calls. Without users: open.

## 6. API operations used

`camera.status` (also the list of cameras), `camera.service`, `camera.detect`, `settings.set` (the list of cameras, `cameras.json`), `camera.start`, `camera.stop`, `camera.flash`, `vision.get`, plus the relay's own endpoints on port 8090 for the video and captures.

## 7. Troubleshooting

1. Black or frozen stream: the camera is off or has no WiFi; changes apply when it returns.
2. "This camera doesn't go through the system relay: it can't be captured.": enable the relay option in its settings.
3. Timelapse does not start: less than 2 GB free, or ffmpeg missing (service preflight shows it).
4. Video never appears: it is built on the system when it ends (a few minutes); see "The system is building a video: it shows up in Videos when it's done.".
5. Phone notice "will be deleted": keep or download it within the grace period.
6. The viewer is black on every screen and the Cameras sheet says "STOPPED": press "Start relay" in that sheet.

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Low**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and everything it does goes through the API of `WorkshopService`, which applies the roles (viewer, operator, technician, administrator) in the server.

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Files it writes:**
- photos and timelapse videos in `0:/workshop/camera/` (outside `sys/` on purpose: they weigh GB)
- its profiles in `0:/sys/workshop/config/`

**What it needs outside the zip** (each one is a separate step you do on purpose and can undo):
- `ffmpeg` on the Pi (done by the service) for videos

**Safety notes:**
- The viewer and the relay follow the users of the service: with no users anyone on the network can watch the camera.

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Maximum 4 cameras; MJPEG streams only; videos are built on the Pi (CPU); photos from the viewer need the relay.

