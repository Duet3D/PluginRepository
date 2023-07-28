---
plugin_submitted_by: yasasw
plugin_submitted_on: 2022-10-04T11:37:43.575Z
plugin_updated_on: 2023-07-28T09:00:02.974Z
plugin: true
title: Input Shaping
abstract: Input Shaping Plugin for DWC
author: Duet3D
repo: InputShapingPlugin
branch: master
homepage: https://github.com/Duet3D/DSF-Plugins
dwcVersion: 3.4
sbcDSfVersion: undefined
rrfVersion: undefined
oem: true
latest_version: v3.4.6
release_date: 2023-07-28T08:44:29Z
release_page: https://github.com/Duet3D/InputShapingPlugin/releases/tag/v3.4.6
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/Duet3D/InputShapingPlugin/master/LICENSE
download_count: 1165
tags:
- input shaping
- tuning
- dwc
- duet3d
---

# Input Shaping Plugin

## Overview
 
Input shaping describes a set of algorithms to reduce ringing frequencies that inevitably occur due to hardware factors in 3D printers. In order to isolate what frequencies affect a machine the most, an [accelerometer](https://docs.duet3d.com/en/User_manual/Connecting_hardware/Sensors_Accelerometer) may be used.  This plugin visualises the ringing frequencies, allows you to see the impact of various input shapers and fine tune them.

## Plugin installation

Starting from DWC 3.4 the **Input Shaping plugin** can be installed to fine-tune input shaper parameters using an accelerometer.

To install the Input Shaping plugin, download the latest release version for your RepRapFirmware version as a .zip file, without unpacking it, and upload it using the `Upload&Start` button on DWC *without* unpacking the file first. After this, you should see the `Plugins` category with a new `Input Shaping` item in the main menu on the left:


![Plugin menu illustration](https://docs.duet3d.com/manual/inputshaping/menu.png)


Before you can start recording samples, you must have an accelerometer connected and configured (see also [M955](https://docs.duet3d.com/en/User_manual/Reference/Gcodes#m955-configure-accelerometer)). If you already know the frequencies you wish to cancel out, an accelerometer is not required.

## Documentation

Please see the [official docs](https://docs.duet3d.com/User_manual/Tuning/Input_shaping_plugin) for further information.
