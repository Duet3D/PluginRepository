#!/usr/bin/env sh

# 1. Check for illegal characters (allow only alphanumeric GH user+repo+branch names)

# 2. Check if README.md or PLUGIN.md is present on the specified repo
status_code=$(curl --write-out %{http_code} --silent --output /dev/null https://api.github.com/repos/Duet3D/DuetSoftwareFramework/contents/README.md)
    # if 200, then file exists

# 3. Make sure there is at least one release with at least one ZIP file
url=$(curl https://api.github.com/repos/Duet3D/InputShapingPlugin/releases | jq .[0]."assets"[0]."browser_download_url" | sed 's/"//g')
    #if url exists, then at least one asset is there
    ext=$(echo $url | rev | cut -d'.' -f 1 |rev)
    #check if ext is zip to confirm it's a zip

# 4. Download latest ZIP bundle
    wget $url -O asset.zip
    unzip asset.zip -d assetunzipped
    cd assetunzipped

# 5. Make sure plugin.json exists
    (ls plugin.json >> /dev/null 2>&1  && echo yes) || echo no #save this output somewhere and check if plugin.json exists

# 6. Ensure properties id, name, author are present. Validate them as specified in https://github.com/Duet3D/DuetWebControl/blob/master/src/plugins/manifest.js
    plugin_id=$(cat plugin.json | jq ."id" | sed 's/"//g' | awk '{print length}') #Check if less than 32 characters
    plugin_name=$(cat plugin.json | jq ."name" | sed 's/"//g' | awk '{print length}') #Check if less than 64 characters
    plugin_author=$(cat plugin.json | jq ."author" | sed 's/"//g' | awk '{print length}') #Check if empty

# 7. Check if at least one "version" dependency is present [dwcVersion, sbcDSfVersion, rrfVersion] and that each value starts with a number
    plugin_dwcVersion=$(cat plugin.json | jq ."dwcVersion")
    plugin_sbcDSfVersion=$(cat plugin.json | jq ."sbcDSfVersion")
    plugin_rrfVersion=$(cat plugin.json | jq ."rrfVersion")

