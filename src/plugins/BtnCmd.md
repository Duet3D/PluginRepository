---
plugin_submitted_by: MintyTrebor
plugin: true
title: BtnCmd
abstract: You can customise DWC with your own design using layouts containing new panels and buttons
author: MintyTrebor
repo: BtnCmd
branch: main
homepage: https://github.com/MintyTrebor
dwcVersion: 3.4
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: Beta_0.10.13
release_date: 2022-07-11T13:16:18Z
release_page: https://github.com/MintyTrebor/BtnCmd/releases/tag/Beta_0.10.13
license: GPL-2.0-or-later
license_file: https://raw.githubusercontent.com/MintyTrebor/BtnCmd/main/LICENSE
download_count: 762
tags:
- dwc
---

# BtnCmd
A Duet Web Control (DWC) plugin which allows the user to create custom layouts with new panels and buttons, which can run Macros, g-code, Post http GET requests, send MQTT messages. 

![BtnCmd Main Screen](https://raw.githubusercontent.com/MintyTrebor/BtnCmd/main/wikires/v0.8.13_BtnCmd_MainWindow_1.png)  

Read the [Wiki](https://github.com/MintyTrebor/BtnCmd/wiki) for more info on how to install configure and use.

In BtnCmd you can create Tabs, with custom buttons in a freeform layout. You may also choose to display a selection of panels including:  
* Standard DWC information & control panels  
* DWC CNC Panels (Only available if using M452/M453 laser/cnc mode)  
* Standard DWC webcam
* Alternative webcam
* Remote Source (eg. A web service from your LAN)
* Object Model Values  
* Text/Label Panel  
* User Created Custom Panels  
* Global Variable Input Panels (Change/update the value of global variables)  

![BtnCmd Edit Mode](https://raw.githubusercontent.com/MintyTrebor/BtnCmd/main/wikires/v0.8.13_BtnCmd_MainWindow_EditMode_1.png)  

The custom buttons can be configured to trigger one of five types of actions:  
* Send a gcode command to the Duet Board  
* Run a Macro  
* Send a simple HTTP request.
* Send a MQTT Message  
* Open a URL in a pop-up window  

  
BtnCmd runs in the browser, and is compatible with both standalone control boards and SBC + control board configurations.  
  
Short Overview Video Below:  
[![BtnCmd](http://img.youtube.com/vi/q5bTl3c3n_k/0.jpg)](https://www.youtube.com/watch?v=q5bTl3c3n_k "BtnCmd")  

BtnCmd uses the following libraries/modules:  

 - [DeepMerge](https://www.npmjs.com/package/deepmerge)
 - [vue-draggable-resizable](https://www.npmjs.com/package/vue-draggable-resizable)
 - [MQTT.js](https://www.npmjs.com/package/mqtt)
 - [axios](https://www.npmjs.com/package/axios)
 - [jasonpath](https://www.npmjs.com/package/jsonpath)  
 - [vuedraggable](https://www.npmjs.com/package/vuedraggable)
