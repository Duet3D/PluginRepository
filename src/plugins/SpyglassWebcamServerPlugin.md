---
plugin_submitted_by: chrishamm
plugin_submitted_on: 2024-02-21T15:11:27.167Z
plugin_updated_on: 2025-01-28T11:43:53.496Z
plugin: true
title: Spyglass Webcam Server
abstract: SpyglassWebcamServerPlugin
author: Duet3D
repo: SpyglassWebcamServerPlugin
branch: master
homepage: https://github.com/Duet3D/SpyglassWebcamServerPlugin
dwcVersion: undefined
sbcDSfVersion: 3
rrfVersion: undefined
oem: true
latest_version: v0.15
release_date: 2025-01-28T11:31:20Z
release_page: https://github.com/Duet3D/SpyglassWebcamServerPlugin/releases/tag/v0.15
license: GPL-3.0-only
license_file: https://spdx.org/licenses/GPL-3.0-only
download_count: 449
tags:
- spyglass
- webcam
- server
- sbc
- duet3d
---

# Spyglass Plugin

## Description

This plugin runs the [Spyglass](https://github.com/roamingthings/spyglass) webcam streaming service as a DSF plugin. The main `spyglass.conf` file is accessible via `0:/sys/spyglass.conf`.

Depending on your choice of camera, extra customizations may be required.

This plugin requires DSF >= 3.5 and Python >= 3.8 (i.e. Debian Bookworm or newer).

## Setup in DWC

To configure this service in DWC, go to the `Settings` -> `General` page and make the following changes:

- Set `Webcam URL` to `http://[HOSTNAME]:8080/stream`
- Set `Webcam update interval (in ms)` to `0`
- Go to the `Job` -> `Webcam` page to see your live stream

For snapshots it is also possible to use `http://[HOSTNAME]:8080/snapshot` instead.

## Build instructions

Create a ZIP file of every file in the `src` directory and make sure `plugin.json` is at the root level. Once created, the ZIP can be installed as a third-party plugin.
If a Debian package is supposed to be generated, check out to the `pkg/build.sh` script.

## Logging

Unfortunately this service outputs info and warning log messages even if the log level is initially set, so by default this plugin's configuration suppresses all the log messages and only sends them to the `duetpluginservice` journal log.

### Checking the journald log (recommended way)

To view the log of the Spyglass service, open a Linux console (or connect over SSH) and run

```
journalctl -u duetpluginservice -f
```

Then restart the Motion Webcam Server plugin and look for potential errors.


### Modify plugin manifest to see all messages in DWC

To see all the output messages from the Spyglass service directly in DWC, open `plugin.json` and set `sbcOutputRedirected` from `false` to `true`. Then build the plugin again and overwrite the existing installation.
Once the plugin is restarted, all the log messages are written to the DWC console.

