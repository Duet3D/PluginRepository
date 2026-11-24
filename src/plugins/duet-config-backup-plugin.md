---
plugin_submitted_by: jaysuk
plugin_submitted_on: 2026-10-14T09:57:41.639Z
plugin_updated_on: 2026-10-14T09:57:41.639Z
plugin: true
title: Duet Config Backup
abstract: Backup your config from DWC
author: jaysuk
repo: duet-config-backup-plugin
branch: main
homepage: https://github.com/jaysuk/duet-config-backup-plugin
dwcVersion: 3.7
sbcDSfVersion: undefined
rrfVersion: undefined
oem: false
latest_version: v1.4.0
release_date: 2026-09-10T10:42:08Z
release_page: https://github.com/jaysuk/duet-config-backup-plugin/releases/tag/v1.4.0
license: GPL-3.0-or-later
license_file: https://raw.githubusercontent.com/jaysuk/duet-config-backup-plugin/main/LICENSE
download_count: 15
tags:
- backup
- restore
- config
- utility
- dwc
---

# Duet Config Backup

Whole-machine configuration backup & restore for DuetWebControl 3.7, as a standalone plugin — the
same feature that ships inside [Flexible Layouts](https://github.com/jaysuk/Flexible-Layouts), for
anyone who wants it without the rest of that plugin.

See [docs.md](docs.md) for the full feature reference (what's backed up, redaction rules, restore
modes, destinations, credential storage).

## Install

Settings → General → Plugins → Install plugin, then find it under **Plugins → Duet Config Backup**
(`/Plugins/DuetConfigBackup`).

## Building the plugin ZIP yourself

If you're not installing a pre-built release, DWC's own `build-plugin` script needs this repo's
dependencies installed FIRST - it does not install them for you:

```bash
git clone https://github.com/jaysuk/duet-config-backup-plugin.git
cd duet-config-backup-plugin
npm install                                       # pulls dwc-config-backup-core, dwc-plugin-runtime, jszip

cd /path/to/DuetWebControl                        # a DWC 3.7 checkout
npm run build-plugin -- /path/to/duet-config-backup-plugin
```

Skipping `npm install` fails with `globals option: The function returned undefined, but expected
string` - the build script can't find the unresolved imports, since they were never installed.

Both [`dwc-config-backup-core`](https://www.npmjs.com/package/dwc-config-backup-core) and
[`dwc-plugin-runtime`](https://www.npmjs.com/package/dwc-plugin-runtime) are published on npmjs.org,
so `npm install` needs no git access - a plain registry install, same as any other dependency.

## Relationship to Flexible Layouts

This plugin and Flexible Layouts' own backup feature share one implementation —
[`dwc-config-backup-core`](https://github.com/jaysuk/dwc-config-backup-core) — so a backup made by
one restores cleanly on the other, and on the DWC 3.6 build of this same plugin. Only the DWC-facing
plumbing (machine I/O binding, route registration, i18n) is duplicated per host.

Two things worth knowing if you run this alongside Flexible Layouts on the same printer:

- **Saved destination credentials are NOT shared** — each uses its own `localStorage` namespace, so
  installing both doesn't mean re-typing a GitHub token twice by accident, or auto-sharing it if you
  wouldn't want to. Move credentials between them deliberately via the SD-card sync or the
  export/import file, both under the Configuration tab's "Credential storage & encryption" section.
- **The SD-card credential sync file IS shared** (`0:/sys/flexible-layouts.credentials.json`) — it's
  the same encrypted-bundle format regardless of which host wrote it, by design, so either host can
  load what the other saved there.

## Development

```bash
npm install
npm test                                          # vitest — no DWC checkout needed
DWC_DIR=/path/to/DuetWebControl npm run typecheck
DWC_DIR=/path/to/DuetWebControl npm run verify-build
```

Business logic (archive format, redaction, restore planning, destination adapters) lives in
`dwc-config-backup-core`, not here — see that repo to change any of it. This repo is the DWC-facing
shell: 12 Vue components (copied from Flexible Layouts' `src/configBackup/`, then adjusted for a
standalone i18n namespace and `PLUGIN_MANIFEST_ID`), plus the three small pieces of host wiring the
core package can't provide itself (`src/model/machineIO.ts`, `src/model/autoBackupNudges.ts`,
`src/model/constants.ts`).

## License

GPL-3.0-or-later, inherited from Flexible Layouts, which this plugin's UI was extracted from.
