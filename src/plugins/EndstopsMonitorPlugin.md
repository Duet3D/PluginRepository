---
plugin_submitted_by: yasasw
title: Endstops Monitor
abstract: Endstop monitoring
author: Duet3D
repo: EndstopsMonitorPlugin
branch: master
homepage: https://github.com/Duet3D/DSF-Plugins
dwcVersion: 3.4
sbcDSfVersion: undefined
rrfVersion: undefined
oem: true
latest_version: v3.4
release_date: 2022-06-14T08:35:28Z
release_page: https://github.com/Duet3D/EndstopsMonitorPlugin/releases/tag/v3.4
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/Duet3D/EndstopsMonitorPlugin/master/LICENSE
download_count: 37
tags:
- endstops
---

# Endstops Monitor Plugin

## Description

This is a very simple demonstration for a DWC-only plugin (v3.4 and later). It lets users monitor the endstops interactively like in previous DWC versions. When loaded it creates a new "Endstops" tab on the Settings -> Machine page.

![image](https://user-images.githubusercontent.com/5919449/173532954-066514ec-0b95-48dd-a8a8-9b9ae4fb297d.png)

## Installation

Get the matching EndstopsMonitor ZIP file for your installed DWC version from the releases and upload it on the `Settings` -> `Plugins` -> `External Plugins` page.
Once installed, you can start it and as a consequence, a new tab item under `Settings` -> `Machine-Specific` should show up. There you can monitor the states of your endstops.
