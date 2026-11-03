---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:06:40.494Z
plugin_updated_on: 2026-11-03T22:06:40.494Z
plugin: true
title: Activity Log
abstract: Event history and phone notices for jobs, faults and energy
author: jhonf441
repo: WorkshopActivity
branch: main
homepage: https://github.com/jhonf441/WorkshopActivity
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v2.7.14
release_date: 2026-11-01T02:32:12Z
release_page: https://github.com/jhonf441/WorkshopActivity/releases/tag/v2.7.14
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopActivity/main/LICENSE
download_count: 6
tags:
- history
- monitor
- dwc
- sbc
---

# WorkshopActivity (Activity)



Page `/Plugins/Activity` ("Activity"). What happened on the machine: summary of today / yesterday / 7 days, the full history of events with filters, phone notices (ntfy) with types, quiet hours and a camera photo or clip, and how to register live jobs sent by a program through the G-code bridge. Events are stored by the System service in the database (`duet.db`, table `activity`); each stores a message key plus parameters, and the page renders them in its own language.

Version documented: 2.7.x on DWC 3.6.3.

## 1. Requirements

1. WorkshopService running. 2. For phone notices: the free app ntfy (Android / iOS) and Internet access from the Pi. 3. For photos or clips in notices: the camera relay (Camera plugin).

## 2. Install

1. Install WorkshopService. 2. DWC > Settings > Plugins > Install `WorkshopActivity-<ver>.zip`; Start. Reload DWC. 3. Open *Monitor > Activity*. 4. Verify: the header shows "N events", "Phone alerts on" and "Last event: ..."; the chip "Attention: N" shows warnings.

## 3. Functions

The page is "Activity" (side menu: Plugins > Activity). Its own side bar has four entries (icons only when collapsed with "<<"): Today, History, Phone alerts, Live jobs. Job names are blurred in the pictures.

### Page header

#### Header chips
- What: one-line state: "Attention: N" (events that need your look), "N events" (events in the history), "Phone alerts on/off" and "Last event" with date and time.
- Where: right side of the page header "Activity" (picture 1, top right).
- How: nothing to press.
- Watch out: read only.

#### Pin / collapse the page side bar
- What: keeps the four-entry side bar open with "Pin", or collapses it to icons with the double arrow.
- Where: top of the page side bar (picture 1, left; picture 2, top-left arrow).
- How: press "Pin" or the arrow.

### Today

![Today](https://raw.githubusercontent.com/jhonf441/WorkshopActivity/main/img/01-today-summary.png)

Picture 1: "Summary" card: period buttons, tiles, the finished jobs list (names blurred) and below it the failures list.

#### Summary of a period
- What: counters for the chosen period: Jobs started, Finished, Cancelled, Job time, Energy of the jobs, Errors (red), Emergency stops, Machine warnings (orange).
- Where: Today > card "Summary" (picture 1).
- How: 1. Press "Today", "Yesterday" or "7 days". 2. Press "Refresh" to read again.
- Watch out: firmware messages are not translated.

#### Finished or cancelled jobs list
- What: each job of the period with time, mode, duration and energy (kWh).
- Where: below the tiles (picture 1).
- How: scroll the list.

#### Failures and emergency stops list
- What: the errors and emergency stops of the period with time and message; repeats are grouped ("(repeated N more times)").
- Where: below the jobs list (scroll down in the card).
- How: read it; use History to filter further.

### History

![History](https://raw.githubusercontent.com/jhonf441/WorkshopActivity/main/img/02-history-filters.png)

Picture 2: "Activity history": date range, Type, Find, "Hide service restarts", type chips, search box, "Group repeated", "Export CSV" and the table with a Delete link per row (names blurred).

#### Date range, type and Find
- What: shows the events between "From" and "To" (default: the last 7 days) of one type or all.
- Where: top row of "Activity history" (picture 2).
- How: 1. Pick "From" and "To". 2. Pick "Type" or press a type chip. 3. Press "Find".

#### Type chips
- What: one chip per event type (All, Database, Black box, Calibration, Camera, Config, Emergency, Error, Fire, Protection, System restart, Service down, WiFi, Finished, Pause, Start, Mode, Warning, Energy, Preset, Risk, Service, System powered on, Zones...) to filter the list.
- Where: below the first row (picture 2).
- How: press a chip; press "All" to clear.

#### Hide service restarts
- What: hides the rows of the system restarting itself.
- Where: right of "Find" (picture 2); on by default.
- How: tick or untick.

#### Search events and Group repeated
- What: free-text search in the table; "Group repeated" joins identical consecutive rows.
- Where: row under the chips (picture 2).
- How: type in "Search events"; tick or untick "Group repeated".

#### Export CSV
- What: downloads the listed events as a CSV file.
- Where: button "Export CSV" next to "Group repeated" (picture 2).
- How: 1. Set the filters. 2. Press "Export CSV".
- Watch out: export before the history cleans old events by age. it downloads a file.

#### Event table, details and Delete
- What: table TIME, TYPE, DESCRIPTION, DURATION, KWH. The "i" icon at the right of a row shows details (who and which role caused it); "Delete" removes that row.
- Where: table at the bottom of picture 2.
- How: press "i" for details.
- Watch out: "Delete" is administrator only (`activity.delete`) and permanent; not pressed.

### Phone alerts

![Destination](https://raw.githubusercontent.com/jhonf441/WorkshopActivity/main/img/03-phone-destination.png)

Picture 3: top of "Phone notifications": the master switch (top right), Server and Topic (blurred: the topic is like a password), the buttons Save destination / Test / Generate new topic (red rectangle) and the last sent line.

#### Phone notifications switch
- What: turns notices to the phone (ntfy app, Android/iOS) on or off. Events are always saved in the history.
- Where: top right of the "Phone notifications" card (picture 3).
- How: press the switch.

#### Server and topic: Save destination, Test, Generate new topic
- What: the ntfy server (default https://ntfy.sh) and the topic where notices are sent; "Save destination" stores them, "Test" sends a test notice, "Generate new topic" makes a new random topic.
- Where: card "Server / Topic" (picture 3, red rectangle).
- How: 1. Install ntfy on the phone. 2. Subscribe to the topic (link "Open / subscribe"). 3. Press "Test". 4. Check "Last sent" says sent.
- Watch out: treat the topic as a password: whoever knows it reads your notices; do not share pictures of it. "Test" sends a real notice (operator role); changing the destination is technician or administrator.

#### Quiet hours
- What: a time window ("From", "To") in which notices are not sent; the choice "During those hours" picks what happens. Events are still saved.
- Where: card "Quiet hours" (picture 4, top).
- How: 1. Set the switch On. 2. Choose From and To. 3. Press "Save hours".
- Watch out: it only affects the types marked "Hours"; the emergency stop and fire ignore it unless you mark them.

![Event types](https://raw.githubusercontent.com/jhonf441/WorkshopActivity/main/img/04-phone-event-types.png)

Picture 4: "Quiet hours" and "Which events to notify and how", with the first two type cards.

#### Notification camera and video length
- What: the camera whose photo or video is attached and the video length (5 s). The video arrives as a second silent notice.
- Where: top of "Which events to notify and how" (picture 4).
- How: pick the camera and the length.
- Watch out: with no camera the notice goes without attachment; whether a notice carries a photo or a video is chosen per type in its card (the fire notice goes without one by default).

#### Per-type card (notify, attachment, priority, hours, test)
- What: one card per event type (Job started, Job finished or cancelled, errors, emergency, fire ...): switch to notify, "Test" for that type, Attachment (None, Photo, Clip), Priority, camera and the "Hours" tick (obey quiet hours).
- Where: cards below the camera options (picture 4).
- How: 1. Use the switch of the type. 2. Choose attachment and priority. 3. Press "Test" to receive an example.
- Watch out: too many types means noise. Technician or administrator role.

### Live jobs

![Live jobs](https://raw.githubusercontent.com/jhonf441/WorkshopActivity/main/img/05-live-jobs-gcode-lines.png)

Picture 5: "Log live jobs" with the two lines to paste.

#### Log live jobs (Start / End lines)
- What: a live job (sent line by line over the network or USB, no file) is not a job for the machine and would not be recorded. Two G-code lines make each live job appear in the history with duration, zone / material, kWh and cost.
- Where: side bar > Live jobs (picture 5).
- How: 1. In the program that sends the job, open its device settings. 2. Paste `M118 P0 S"BRIDGE JOB START Trabajo en vivo"` in the Start GCode. 3. Paste `M118 P0 S"BRIDGE JOB END"` in the End GCode.
- Watch out: if you cut a job by hand and End never arrives, the next start closes it as "no end". It also works from any macro or the console.

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Phone notices on/off | ntfy notices | on here | Off: events only saved |
| Server / topic | Where notices go | ntfy.sh + random topic | A shared topic lets others read your notices |
| Quiet hours | Hours without notices | off | Missed notices (fire and emergency stop are excepted) |
| Types to notify | Per type on/off, sound, schedule | by type | Too many types = noise |
| Camera photo/clip | Attach a picture | photo | Needs the camera relay |
| Hide service restarts | History filter | on | n/a |

## 5. Roles

Viewer: reads summary and history. Operator: can send the test notice. Technician/admin: change topic, hours and types; deleting rows and clearing history is administrator (`activity.delete`, `activity.clear`). The history also stores which user and role caused each event.

## 6. API operations used

`activity.list`, `activity.summary`, `activity.delete`, `activity.clear`, `activity.log`, `notifications.get`, `notifications.type`, `notifications.mute`, `notifications.option` (also the default camera of the alerts), `camera.status` (the list of cameras).

## 7. Troubleshooting

1. No phone notices: install ntfy, subscribe to the topic, press "Test".
2. Too many "Camera" rows: the camera drops off WiFi; check the ESP32-CAM.
3. A live job is not listed: the program is not sending the Start / End lines (3.4).
4. Old events: the history cleans itself by age; export CSV first.

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Low-medium (phone notices go to an Internet service)**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and everything it does goes through the API of `WorkshopService`, which applies the roles (viewer, operator, technician, administrator) in the server.

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Files it writes:**
- the event history in the service database (7 daily backups kept)

**What it needs outside the zip** (each one is a separate step you do on purpose and can undo):
- phone notices use the free service ntfy.sh (or your own server); they need Internet access from the Pi

**Safety notes:**
- The notice topic works like a password: whoever knows it can read your notices. Leave notices off if you do not want data to leave the machine.

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Notices need Internet and the ntfy service; the topic is the only protection of the channel; firmware messages are shown as the firmware sends them (English).

