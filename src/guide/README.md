# - Plugin Submission
## Instructions
- Create a new GitHub issue: [Plugin Submission](https://github.com/Duet3D/PluginRepository/issues/new/choose)

#### Ensure that your:
- plugin is in a GitHub repository
- repository name/plugin name is not already existing in [Duet3D Plugin Repository](https://github.com/Duet3D/PluginRepository/tree/master/src/plugins)
- markdown files are renamed (case-sensitive) as `PLUGIN.md`, `README.md`
- plugin manifest file is renamed (case-sensitive) as `plugin.json` and keys are as follows (case-sensitive)
```
{
  "id": "InputShaping",
  "name": "Input Shaping",
  "author": "Duet3D Ltd",
  "version": "3.4.1-b1",
  "license": "GPL-3.0-or-later",
  "homepage": "https://github.com/Duet3D/DSF-Plugins",
  "dwcVersion": "3.4",
  "tags": [
    "input shaping",
    "tuning"
  ]
}
```
- Double check! <br> Applicable platforms versions are exactly (case-sensitive) as <br> `dwcVersion`, <br> `sbcDSfVersion`, <br> `rrfVersion`
  ```
  { ...
    "dwcVersion": "3.4",
    ...
  }
  ```
  ```
  { ...
    "sbcDSfVersion": "3.4",
    ...
  }
  ```
  ```
  { ...
    "rrfVersion": "3.4",
    ...
  }
  ```
- plugin has at least one release
- plugin release(s) can be downloaded as a zip file.
Otherwise the checks will not pass.

## Important Information
- Your repository name will be the same as plugin id
- If a `PLUGIN.md` file exists, it will be used as the homepage of your plugin; otherwise, `README.md` will be used
- Tags, keywords will be fetched from the plugin manifest(`plugin.json`)

# - Plugin Removal
## Instructions
- Create a new issue: [Plugin Removal](https://github.com/Duet3D/PluginRepository/issues/new/choose)

#### Ensure that:
- you are requesting a removal using the same account from which a plugin submission was requested 