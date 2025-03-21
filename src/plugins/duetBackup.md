---
plugin_submitted_by: stuartofmt
plugin_submitted_on: 2023-12-13T15:33:39.578Z
plugin_updated_on: 2025-03-21T10:04:15.359Z
plugin: true
title: duetBackup
abstract: This plugin provides periodic or instant backups of duet3d SBC files.  Backups are made to a Github repository, thereby facilitating the ability to roll back to earlier file versions.
author: stuartofmt
repo: duetBackup
branch: main
homepage: https://github.com/stuartofmt
dwcVersion: undefined
sbcDSfVersion: 3.5
rrfVersion: undefined
oem: false
latest_version: 21/03/2025
release_date: 2025-03-21T09:34:03Z
release_page: https://github.com/stuartofmt/duetBackup/releases/tag/21/03/2025
license: GPL-2.0-or-later
license_file: https://spdx.org/licenses/GPL-2.0-or-later
download_count: 538
tags:
- sbc
---

# README

This plugin provides periodic or instant backups of duet3d SBC files.  Backups are made to a Github repository, thereby facilitating the ability to roll back to earlier file versions.

**Modes of operation**
There are two modes of operation, depending on whether the archive option is used.

***Files deleted from the source are deleted from the main branch (default)***
    The designated directories are compared to the files in the `main` branch. Files are either Added (new files), Updated (if changed), or Skipped (if not changed).  Files that have been deleted from the designated directories are removed from the `main` branch.  In this way, the `main` branch is a snapshot of the designated directories.
    
    If you need to recover to the latest version - a simple download of the top level `main` branch is all that is needed.

    Github history still provides access to previously deleted files.

***Files are not deleted from the main branch***
    The behavior is the same as above, except that files which are deleted from the source are NOT  deleted from the main branch.  This makes recovery a little more involved.

**Prerequisites:**
Duet3d SBC V3.x
Python >= 3.8

Tested with Debian Bullseye and Bookwork on V3.5.4 and V3.6

**Versions**

***V1.0***
- Initial release


***V1.1***
- Added messages, sent to DWC
- Displays time to next backup using local time (previously GMT)
- Added `-duetPassword` to support for printers that use a password
- Added `-verbose` to enable more detailed log messages.

***V1.2***
- Added `-noDelete` option
- Compares files to determine if an update is needed.
- Added date / time of last change to file (except initial save).

***V1.3***
- README.md file shows date and time of last backup
-README.md prevented from being deleted
- Added `-ignore`. Can specify files that are not to be backed up. This also causes these files to be deleted unless `-noDelete` is set.

***V1.4***
- Added logging to logfile
- updated deprecated python calls
- added file change summary info to README.md
''' 

### Setup
Instructions for setup / installation are in the file `Documents/setup.md`