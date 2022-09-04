---
plugin_submitted_by: LoicGRENON
plugin_submitted_on: 2022-09-04T19:39:21.742Z
plugin_updated_on: 2022-09-04T19:39:21.743Z
plugin: true
title: ExecOnMcode
abstract: SBC plugin for DuetSoftwareFramework (based on dsf-python) to run commands on user-defined M-Codes
author: LoicGRENON
repo: DSF_ExecOnMcode_Plugin
branch: main
homepage: https://github.com/LoicGRENON/DSF_ExecOnMcode_Plugin
dwcVersion: 3.4
sbcDSfVersion: 3.4
rrfVersion: undefined
oem: false
latest_version: v0.1
release_date: 2022-09-04T19:15:54Z
release_page: https://github.com/LoicGRENON/DSF_ExecOnMcode_Plugin/releases/tag/v0.1
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/LoicGRENON/DSF_ExecOnMcode_Plugin/main/LICENSE
download_count: 1
tags:
- dwc
- sbc
---

# DSF_ExecOnMcode_Plugin

![ExecOnMcode](https://user-images.githubusercontent.com/974748/188330153-868e2497-3065-430e-9086-a442f073b0cf.png)

## Description
ExecOnMcode is a SBC plugin for [DuetSoftwareFramework](https://github.com/Duet3D/DuetSoftwareFramework) and based on [dsf-python](https://github.com/Duet3D/dsf-python) to run commands on user-defined M-Codes.

This plugin is based on the original idea from [wilriker's execonmcode](https://github.com/wilriker/execonmcode).

It provides M1200 M-Code which is used to update the interception filters.

Others M-Codes and related commands can be added by editing the `ExecOnMcode.json` file located in System directory and then issuing `M1200` (or restarting the plugin) to update the interception filters.

## Installation

1. Go on the `Plugins` Tab of Duet Web Control.
2. Select `External plugins`.
3. Click on *Upload System Files* and select the plugin zip archive.
4. Follow the on-screen instructions to install the plugin.
5. Click on the `Start` button to start the plugin.
6. *ExecOnMcode* entry should appears under the *Settings* tab of DWC.

## Limitations

As the plugin runs under *dsf* user on the system, the command you wish to run using *ExecOnMcode* should be allowed to be run from that user.

If for some reason you want to go beyond that limitation, create a `010_dsf-nopasswd` file into `/etc/sudoers.d/` with the following content : `dsf ALL=(ALL) NOPASSWD: ALL`
<br>Then use `sudo` with the command you wish to run using *ExecOnMcode*.
