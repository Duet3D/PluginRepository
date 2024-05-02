---
plugin_submitted_by: T3P3
plugin_submitted_on: 2022-09-02T12:25:08.721Z
plugin_updated_on: 2024-05-02T07:16:10.757Z
plugin: true
title: Closed Loop Tuning
abstract: Visualise the performance of your closed loop controllers and motorsr board
author: Duet3D
repo: Closed-Loop-Plugin
branch: master
homepage: https://duet3d.com
dwcVersion: 3.5
sbcDSfVersion: undefined
rrfVersion: undefined
oem: true
latest_version: v3.5.0-beta.4
release_date: 2023-06-09T14:04:11Z
release_page: https://github.com/Duet3D/Closed-Loop-Plugin/releases/tag/v3.5.0-beta.4
license: GPL-3.0
license_file: https://raw.githubusercontent.com/Duet3D/Closed-Loop-Plugin/master/LICENSE
download_count: 1094
tags:
- closed loop
- tuning
- dwc
- duet3d
---

# Closed Loop Tuning Plugin

*Visualise the performance of your [1HCL closed loop controller board](https://docs.duet3d.com/Duet3D_hardware/Duet_3_family/Duet_3_Expansion_1HCL).*


![Image of the plugin UI](https://repository-images.githubusercontent.com/392753893/06488b0a-3573-45ae-a2c7-0017f91d7f48)

## Getting Started

To install the plugin into Duet Web Control (DWC):

1. Navigate to the [latest release](https://github.com/Duet3D/Closed-Loop-Plugin/releases) and download the `closed-loop-plugin.zip` asset
2. Upload the zip folder to DWC by using the 'upload system files' button in the 'system' area
3. Follow the on-screen instructions for installing the plugin
4. Navigate to Setting > Machine Specific > Machine Specific Plugins and click the 'Start' button
5. A 'closed loop' option should appear in the left sidebar - you're ready to start tuning!

*Please note that DWC 3.3.0 is the minimum supported version of DWC. If you have difficulty following the above instructions, or if the plugin does not work as expected, please ensure you have [updated to the latest version of DWC](https://docs.duet3d.com/User_manual/RepRapFirmware/Updating_firmware).*

## Contributing and Compiling from source

If you don't fancy using the latest release, or you wish to contribute changes, you can compile this plugin yourself from source. To do this, you first need to clone the Duet Web Control (DWC) repo from https://github.com/Duet3D/DuetWebControl.

Once you have DWC cloned, copy the `/src` folder from this repository into the `/src/plugins` folder in DWC. Then, rename the newly copied `/src/plugins/src` folder to `/src/plugins/ClosedLoopTuning`.

Copy the following object into the `export default` array in DWC's `/src/plugins/index.js`

```js
new DwcPlugin({
  id: 'ClosedLoopTuning',
  name: 'Closed Loop Tuning',
  author: 'Louis Irwin',
  version,
  loadDwcResources: () => import(
    /* webpackChunkName: "ClosedLoopTuning" */
    './ClosedLoopTuning/index.js'
  )
})
```

If you wish to develop on the plugin, run `npm run serve` in the DWC directory and open the resulting build in your browser. You can then navigate to Settings > General > Built-in Plugins and click 'start' to run the plugin. Any changes made in `/src/plugins/ClosedLoopTuning` will then be hot-reloaded and reflected live in the browser.

## Building as an external plugin

Once you have finished developing, or if you just wish to compile from source, run `npm run build-plugin ../Closed-Loop-Plugin` in the DWC directory where `../Closed-Loo-Plugin` points to this directory.
This will generate a ZIP file in the `dist` directory within DWC that can be uploaded as a plugin.
