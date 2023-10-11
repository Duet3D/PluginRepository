---
plugin_submitted_by: Sindarius
plugin_submitted_on: 2022-09-02T12:26:31.796Z
plugin_updated_on: 2023-10-11T09:08:36.665Z
plugin: true
title: Gamepad Jogger
abstract: Allows the use of a keyboard or gamepad to jog using a DWC plugin
author: Sindarius
repo: DWC_GamepadJogger_Plugin
branch: main
homepage: https://github.com/Sindarius/DWC_GamepadJogger_Plugin
dwcVersion: 3.5
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: 1.1
release_date: 2023-10-07T19:24:34Z
release_page: https://github.com/Sindarius/DWC_GamepadJogger_Plugin/releases/tag/1.1
license: LGPL-3.0-or-later
license_file: https://spdx.org/licenses/LGPL-3.0-or-later
download_count: 712
tags:
- dwc
---

# DWC_GamepadJogger_Plugin

![Image](https://raw.githubusercontent.com/Sindarius/DWC_GamepadJogger_Plugin/media/JoggerScreenshot.png?raw=true)


*Update - Browsers now require a secure context (https) to use a controller so you may only be able to map keyboard keys to this plugin now.*


This plugin will allow a user to use a gamepad to control their cnc/printer. 

The Jogger tab will appear in settings when the plugin is loaded. Once you are there press a button on your gamepad for the plugin to recognize it. After your controller is detected you can go through and configure actions without enabling the control. This allows you to configure and test without having any actions fire. Custom actions can be configured with the "New Action" button.

To set an axis/button click on the set button in the action and then you'll move your axis or press your button.

The configured settings are saved locally and I will look into adding import/export at some point soon.

Quick note, the row will highlight whenever you perform an action on the controller which is a good way for validating the action.
