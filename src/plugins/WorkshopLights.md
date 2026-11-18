---
plugin_submitted_by: jhonf441
plugin_submitted_on: 2026-11-03T22:07:54.310Z
plugin_updated_on: 2026-11-03T22:07:54.310Z
plugin: true
title: Lights and Status
abstract: LED strip and status lights: scenes, state colors, animations
author: jhonf441
repo: WorkshopLights
branch: main
homepage: https://github.com/jhonf441/WorkshopLights
dwcVersion: 3.6
sbcDSfVersion: 3.6
rrfVersion: undefined
oem: false
latest_version: v2.8.10
release_date: 2026-11-03T21:08:15Z
release_page: https://github.com/jhonf441/WorkshopLights/releases/tag/v2.8.10
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/LICENSE
download_count: 4
tags:
- lights
- led
- dwc
- sbc
---

# WorkshopLights (Lights and states)



Page `/Plugins/Lights` ("Lights and status"). It controls the LED strip (NeoPixel WS2812 / SK6812) and the status light: what the machine is doing shown as colors and effects on three outputs (the LED strip, the on-screen indicator and the board LEDs), the work light with scenes, colors per mode and per state, start-up animations, and the strip layout (zones, counts, pin).

Version documented: 2.8.x on DWC 3.6.3.

## 1. Requirements

1. WorkshopService running (it paints the status zone: `status_light.py`; it publishes what it paints so the pages mirror it).
2. A LED strip on the Duet (`M950 E0 C"led" T2 U37` in config.g) or on a free SPI pin of the Pi. This machine: 37 LEDs, 20 for status then 17 for lighting (status first, on purpose).
3. SPI pins and `dtoverlay=spi1-1cs` in `/boot/firmware/config.txt` only if you use a strip on the Pi (a change you make yourself; the page never does it).

## 2. Install

1. Install WorkshopService.
2. DWC > Settings > Plugins > Install `WorkshopLights-<ver>.zip`; Start if needed. Reload DWC.
3. Open *Plugins > Lights and status*. Without a strip, switch it off in *Outputs* ("This machine has an LED strip"), and the light controls are hidden.
4. Verify: header "All fine" and the chips of the three outputs.

## 3. Functions

The page is "Lights and status" (side menu: Plugins > Lights). Its side bar has seven entries: Summary, Outputs, Lighting, States, Modes and colors, Animations and effects, Advanced (icons only when collapsed with the double arrow). Red rectangles mark the control described.

### Page header (always visible)

#### Header strip: state and output chips
- What: the overall state ("All fine"), the current top state with its color dot (here "Lighting - automatic status off") and three chips: "LED strip", "On-screen indicator" and "Board LEDs off".
- Where: top right of the page header (red rectangle, picture 1).
- How: read only. The dot is the same indicator shown in the Control bar.

### Summary

![Summary](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/01-summary-live-outputs.png)

Picture 1: the Summary entry: "What the machine is doing" and "The three outputs, live".

#### What the machine is doing
- What: the most important state right now with its color and effect (what the on-screen indicator shows), the mode (Laser) and the machine state (At rest), and a folded "How it works".
- Where: first card of Summary (picture 1).
- How: read it; press "How it works" to unfold the explanation.

#### The three outputs, live
- What: a live copy of each output: the LED strip (copy of the strip connected to the board), the on-screen indicator (also at the top of this page and in the side bar of the workshop), and the board LEDs (STATUS, VIN, 12 V, 5 V, 3.3 V; off until you enable them in Outputs).
- Where: second card of Summary (picture 1).
- How: read only; hover the board LEDs to see each one.

### Outputs

![Outputs](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/02-outputs-led-strip.png)

Picture 2: "LED strip": the switch, the three number fields and the live strip view (red rectangles).

#### This machine has an LED strip
- What: tells the service whether a strip exists. Off: no light command is sent to the board and the lighting controls are hidden; the state is still shown on the screens.
- Where: Outputs > card "LED strip", first switch (red rectangle, picture 2).
- How: press the switch.
- Watch out: turning it off hides the Lighting entry.

#### Lighting LEDs, Status LEDs and Board output (E)
- What: how many LEDs give work light (counted from LED 0 of the lighting zone; 0 = no light on the strip), how many show the mode and what the machine does (here 20), and the board output number (here 0). The line `M950 E0 C"led" T2 U37` shows what the board configuration must contain.
- Where: three fields under the switch (red rectangle, picture 2).
- How: 1. Type the numbers that match your `config.g`. 2. They save with the page.
- Watch out: a wrong number paints the wrong LEDs. Technician role.

#### Output of this strip
- What: shows where the strip is connected: the Duet board (M950) or a pin of the Pi; the link "Change in Advanced" goes to Advanced.
- Where: under the fields (red rectangle, picture 2).
- How: press the link to open Advanced.

#### Strip view and tests
- What: a live copy of the strip with its two zones (Status: LEDs 0-19 and Lighting: LEDs 20-36), the total and whether it equals `config.g`; below it two tests ("How many LEDs does it have?" and "Which zone is which?") that light the strip to check it; and the switch for the board LEDs.
- Where: lower part of Outputs (picture 2 shows the strip view; scroll the page for the tests).
- How: 1. Scroll down. 2. Press a test and look at the strip.
- Watch out: the tests change the real lights.

### Lighting

![Lighting](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/03-work-light-and-scenes.png)

Picture 3: "Work light" and "Scenes" (red rectangles). This entry exists only if the machine has an LED strip.

#### Work light switch
- What: turns the work light of the strip on or off now.
- Where: Lighting > "Work light" (red rectangle, picture 3).
- How: press the switch.
- Watch out: it changes the real light for everyone. Operator role.

#### Work light color and brightness
- What: the color and brightness of the work light (here R0 V0 A255 B255, 100 %). The strip has a separate white LED, which gives a cleaner white than mixing red, green and blue.
- Where: card under the switch (picture 3).
- How: press the color card and choose the color and the brightness.

#### Scenes
- What: a scene is a named color and brightness (Work, Photo, Inspection, Dim...). One tap applies it and the light stays like that, on. Up to 8 scenes; "+ Scene" adds one, the cross deletes one, each has a name field.
- Where: card "Scenes" under the work light (red rectangle, picture 3).
- How: 1. Press "+ Scene" to add one and type a name. 2. Choose its color and brightness. 3. Tap a scene to apply it.
- Watch out: deleting a scene is immediate; applying one changes the real light.

### States

![States](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/04-states-layout-and-effects.png)

Picture 4: States, top part: the switch, the three layouts, the demo and the effects menu (red rectangles).

#### Automatic status lights
- What: when on, the strip shows the state of the machine in its status zone. When off, the lighting also uses the status LEDs (as in the picture).
- Where: States > top switch (red rectangle, picture 4).
- How: press the switch.
- Watch out: the Control bar button "Status ON / OFF" does the same.

#### When several states are active at once
- What: three layouts: "The most important" (the whole zone shows only the highest-priority state), "Taking turns" (the active states take turns) and "Split the zone" (the zone is shared; the most important states get more LEDs). Each option shows the real state as it would look. Emergency stop, crash, risk and jog without limits always take the whole zone.
- Where: card "When several are active at once" (red rectangle, picture 4).
- How: tap an option; it is applied and saved.

#### See the example on the strip
- What: a 6 s demo with two enabled states and what you have on screen; it is not saved.
- Where: button under the layouts (red rectangle, picture 4).
- How: press it and look at the strip.

#### Light effects during a job
- What: the menu chooses whether blink or pulse effects run during a job. The default "No effects during a job (recommended)" keeps the strip in fixed colors and repaints at most twice a second, because every blink is a command to the Duet. Emergency stop, crash, risk, jog without limits, cancelling and paused keep their effect.
- Where: menu "Light effects during a job" (red rectangle, picture 4, bottom).
- How: open the menu and choose.
- Watch out: effects during a job add commands to the Duet.

![Machine states](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/05-machine-states-table.png)

Picture 5: "Machine states": one card per state with Test, a switch, color, effect and outputs.

#### Machine states table
- What: one card per state (Emergency stop, Crash or axis beyond its limits, Jog without limits, Active risk and more below). Each has a switch to show it, "Test", a color, an effect (Steady, Slow blink, Medium blink, Double flash, pulse...) and the outputs where it shows (Strip, Screen, Board). The arrows change the priority; the fixed ones (pin icon) do not move.
- Where: States, scroll down to "Machine states" (red rectangles on Test and the switch, picture 5).
- How: 1. Turn a state on or off with its switch. 2. Choose color, effect and outputs. 3. Press "Test" to see it for about 6 s on the ticked outputs.
- Watch out: "Test" lights the real strip for a few seconds. The emergency stop is always shown and always wins.

### Modes and colors

![Modes and colors](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/06-modes-and-colors.png)

Picture 6: ready-made styles, color of each mode and idle brightness (red rectangles).

#### Ready-made styles
- What: Classic, Soft, High contrast, Night, Warm, Neon and Color-blind safe change the colors of the modes and of the main states and the idle brightness; "Factory colors" restores the originals; "A different pattern per state" hands out different effects (slow blink, double flash, pulse...) among the active states to tell them apart without color.
- Where: card "Ready-made styles" (red rectangle, picture 6).
- How: 1. Press a style. 2. Adjust colors one by one if you want.
- Watch out: it changes the colors saved for every mode and state.

#### Color of each mode
- What: the color of Laser, CNC and 3D printing, seen when idle and as a progress bar during a job.
- Where: card "Color of each mode" (red rectangle, picture 6).
- How: press a mode card and pick the color.

#### Idle brightness
- What: how strong the mode color looks when there is no job (strip only).
- Where: slider under the mode cards (red rectangle, picture 6).
- How: drag the slider.

### Animations and effects

![Animations](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/07-animations-and-effects.png)

Picture 7: "Animation at power-on" and "When a job ends" (red rectangles).

#### Animation at power-on
- What: when the board starts, an animation fills the strip once and then each zone takes its color. Choose the type ("Bar that fills the strip"), the color and the speed (Smooth to Fast).
- Where: first card (picture 7); the switch "Show animation" and the button "Show now".
- How: 1. Turn "Show animation" on or off. 2. Pick type, color and speed. 3. Press "Show now" to play it without saving.

#### Blink when a job finishes
- What: the status zone blinks for a few seconds when a file job or a live job ends, so you notice even if you are not looking at the screen. Choose the warning color and how many times (here 3).
- Where: card "When a job ends" (picture 7); button "Test the warning on the strip".
- How: 1. Turn "Blink when a job finishes" on. 2. Choose color and times. 3. Press the test button if you want to see it.
- Watch out: a live job is detected when it is closed. The tests light the real strip.

#### While in use
- What: blink while paused; the other effects are set per state in the States entry.
- Where: card under "When a job ends" (scroll down).

### Advanced

![Advanced](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/08-advanced-zones-and-status-zone.png)

Picture 8: "Zone order and additional strips" (red rectangles: Status zone menu, the zones, "+ Zone").

#### Status zone selector
- What: chooses on which zone of which strip the state is painted (here "Main strip (E0): Status zone").
- Where: top of "Zone order and additional strips" (picture 8).
- How: open the menu and choose.

#### Zone order, number of LEDs and extra strips
- What: the zones in the order of the strip from the Duet connector (Status: 20 LEDs 0-19, Lighting: 17 LEDs 20-36); arrows move a zone; each zone has its number of LEDs; "+ Zone" adds a zone and the "+" tab next to "Main - E0" adds another strip. Every extra zone has its own color and switch.
- Where: card "Zone order and additional strips" (picture 8).
- How: 1. Move each zone with the arrows until it matches how your strip is connected. 2. Set the number of LEDs. 3. Press "+ Zone" if you need another.
- Watch out: if you do not want work light on the strip set 0 lighting LEDs in Outputs. A wrong order paints the wrong LEDs.

![Strip on the Pi](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/09-advanced-strip-on-the-pi.png)

Picture 9: "Strip on the Pi": the list of the pins of the Pi.

#### Strip on the Pi
- What: lists the GPIO pins of the Pi and says which can drive a strip: it needs the data pin (MOSI) of an SPI bus that is on and free. Here none can, and the page explains that a line such as `dtoverlay=spi1-1cs` in `/boot/firmware/config.txt` and a restart are needed.
- Where: Advanced, below the zones (picture 9).
- How: read it. The page does not change the system: that is a change you make.

![Board signals](https://raw.githubusercontent.com/jhonf441/WorkshopLights/main/img/10-advanced-board-signals-panel.png)

Picture 10: "Board signals panel (screens only)" (red rectangles: the switch and the type ticks).

#### Board signals panel
- What: a live panel for the screens (not for the strip) with the board LEDs, end stops, probes and BLTouch, fans, heaters, laser and spindle and M42 outputs. "Show the signals panel" turns it on; the ticks choose what it shows; "Only what is active" filters; two buttons switch list and grid view.
- Where: Advanced > card "Board signals panel" (picture 10).
- How: turn the switch on and tick the groups you want.
- Watch out: it only reads.

#### If something fails
- What: the service tells the board every 2 s that it is painting; after 10 s of silence the board takes back the status LEDs with the mode colors saved here.
- Where: note in Advanced (scroll down).
- How: read only.

#### Light profile: Export and Import
- What: exports the light settings to a file; importing loads a file into the page WITHOUT saving (tick to include the strip counts).
- Where: bottom of Advanced (scroll down); not in the pictures.
- How: 1. Press Export to save a file. 2. Press Import and choose a file. 3. Review the page, then save.
- Watch out: Export downloads a file.

## 4. Settings

| Setting | Meaning | Default | If wrong |
|---|---|---|---|
| Has LED strip | Strip present | on | On without strip: useless commands; off with strip: no light control |
| Lighting LEDs / Status LEDs | How many LEDs per zone | 17 / 20 | Not equal to config.g: wrong zones painted |
| Board output (E) | `M950 E<n>` strip number | 0 | Wrong: nothing lights |
| Automatic status lights | Status painted by the Pi | on | Off: strip does not follow the state |
| Layout when several states | Priority / turns / split | split | Many states do not fit |
| Effects during a job | Blink and pulse while working | none | Effects make many commands to the Duet |
| Mode colors, brightness at rest | Colors per mode | Laser purple, CNC blue, 3D green | Cosmetic |
| Start-up animation / job-end blink | Cosmetic effects | on | Cosmetic |

Stored in the service settings (`0:/sys/workshop/config`). Status strip painting uses `M150`: the last call of any sequence must go without `F` (done by the plugin).

## 5. Roles

Looking: any role. Switching light, scenes, saving colors and effects: operator or technician depending on the operation (`light.set`, `statuslight.set`, `lights.scene` are classified in `OP_ROLES`). Strip layout, import and M950 apply: technician or admin. Without users everybody is admin.

## 6. API operations used

`light.set`, `statuslight.set`, `lights.scene`, `lights.apply_m950`, `lights.get/save`, `view.heartbeat`, `settings.get/set`.

## 7. Troubleshooting

1. The strip shows frozen colors: the service stopped. The board retakes the status LEDs after 10 s without notice; restart WorkshopService.
2. Nothing lights: check `M950 E0` in config.g and "Board output (E)".
3. Wrong zone order: move the zones with the arrows in Advanced (status first, then lighting is this machine's real layout).
4. A strip on the Pi does not work: needs a free SPI bus (`dtoverlay=spi1-1cs`); the page only tells you.
5. LEDs paint oddly after a hand `M150`: the service caches the last painted key (`statusLedKey`); changing it by hand needs invalidation (it is done by the plugin's own actions).

<!-- permissions:start -->

## Permissions and what it changes

Risk: **Low-medium (it can edit the LED count in `config.g`)**. Read this before installing; the full document is `security.md` of the Workshop plugins.

**DSF permissions:** none. It is a page of DWC (it runs in your browser) and everything it does goes through the API of `WorkshopService`, which applies the roles (viewer, operator, technician, administrator) in the server.

**Depends on:** `WorkshopService` (install it first, uninstall it last).

**Files it writes:**
- scenes and colors in `0:/sys/workshop/config/`
- the LED count line `M950 ... U<n>` of `config.g`, only after a preview, a `.bak` copy and a second tap

**What it needs outside the zip** (each one is a separate step you do on purpose and can undo):
- a strip driven by the Pi needs an SPI bus: you add the line `dtoverlay=spi1-1cs` to `/boot/firmware/config.txt` yourself; the plugin never edits that file

Uninstalling removes the plugin folder; your data in `0:/sys/workshop/` and `/opt/dsf/conf/workshop-*.json` stays.

<!-- permissions:end -->

## 8. Limits

Strips of NeoPixel type only; strip on the Pi needs a free SPI MOSI pin; effects during a job are limited to avoid flooding the Duet with commands; the page cannot change `/boot/firmware/config.txt`.

