# Plugin Update

With Plugin Update, you can change: 
- plugin description
- plugin page (`PLUGIN.md` or `README.md`)
<br>
or the changes from plugin's manifest file(`plugin.json`) file such as:
- license
- homepage
- tags

## Checklist
### Ensure that your:
- plugin is still in the same GitHub repository. For repository changes, you need to first remove and then submit as a new one.
- markdown files are renamed (case-sensitive) as PLUGIN.md, README.md
- Check the content in markdown files against [an online md viewer](https://markdownlivepreview.com/) as sometimes, images might not be displayed correctly
- If the images are not shown, use the url format `https://raw.githubusercontent.com/<username>/<repo name>/<branch>/<path>/<img name> `
- plugin manifest file is renamed (case-sensitive) as plugin.json
- plugin manifest file size is below 16KB
- plugin has at least one release
- plugin release(s) can be downloaded as a zip file.
Otherwise the checks will not pass.


## Important Information
- Your repository name will be the same as plugin id
- If a `PLUGIN.md` file exists, it will be used as the homepage of your plugin; otherwise, `README.md` will be used
- Tags, keywords will be fetched from the plugin manifest(`plugin.json`)

## If all of the above is okay:
- Create a new GitHub issue: [Plugin Update](https://github.com/Duet3D/PluginRepository/issues/new/choose)
