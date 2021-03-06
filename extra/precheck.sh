#!/usr/bin/env sh

touch checklog.txt
isOK=1

# 1.:NOT OK Check for illegal characters (allow only alphanumeric GH user+repo+branch names)

# 2.:OK Check if README.md or PLUGIN.md is present on the specified repo
    status_code=$(curl --write-out %{http_code} --silent --output /dev/null https://api.github.com/repos/Duet3D/DuetSoftwareFramework/contents/README.md)

    res=$(if [[ "$status_code" = 200 ]]; then echo 1; else echo 0; fi)
    echo README.md: $res >> checklog.txt
    isOK=$(($isOK*$res))

# 3.:OK Make sure there is at least one release with at least one ZIP file
    url=$(curl https://api.github.com/repos/Duet3D/InputShapingPlugin/releases | jq .[0]."assets"[0]."browser_download_url" | sed 's/"//g')
    #if url exists, then at least one asset is there
    ext=$(echo $url | rev | cut -d'.' -f 1 |rev)
    #check if ext is zip to confirm it's a zip
    res=$(if [[ "$ext" = zip ]]; then echo 1; else echo 0; fi)
    echo Release: $res >> checklog.txt
    isOK=$(($isOK*$res))

# 4.:OK Download latest ZIP bundle
    wget $url -O asset.zip
    unzip asset.zip -d assetunzipped
    cd assetunzipped

# 5.:OK Make sure plugin.json exists
    res=$((ls plugin.json >> /dev/null 2>&1  && echo 1) || echo 0)
    echo plugin.json check 1: $res >> checklog.txt
    isOK=$(($isOK*$res))

# 6.:OK Ensure properties id, name, author are present. Validate them as specified in https://github.com/Duet3D/DuetWebControl/blob/master/src/plugins/manifest.js
    plugin_id=$(cat plugin.json | jq ."id" | sed 's/"//g') #Check if less than 32 characters
    plugin_id_n=$(echo $plugin_id | awk '{print length}')#Check if less than 32 characters
    res=$(if [[ "$plugin_id" != null ]]&&[[ "$plugin_id_n" < 32 ]]; then echo 1; else echo 0; fi)
    echo plugin.json id: $res >> checklog.txt
    isOK=$(($isOK*$res))

    plugin_name=$(cat plugin.json | jq ."name" | sed 's/"//g' | awk '{print length}') #Check if less than 64 characters
    plugin_name_n=$(echo $plugin_name | awk '{print length}') #Check if less than 64 characters
    res=$(if [[ "$plugin_name" != null ]]&&[[ "$plugin_name_n" < 64 ]]; then echo 1; else echo 0; fi)
    echo plugin.json name: $res >> checklog.txt
    isOK=$(($isOK*$res))

    plugin_author=$(cat plugin.json | jq ."author" | sed 's/"//g' | awk '{print length}') #Check if empty
    plugin_author_n=$(echo $plugin_name | awk '{print length}') #Check if empty
    res=$(if [[ "$plugin_author" != null ]]&&[[ "$plugin_author_n" > 0 ]]; then echo 1; else echo 0; fi)
    echo plugin.json author: $res >> checklog.txt
    isOK=$(($isOK*$res))

# 7.:NOT OK Check if at least one "version" dependency is present [dwcVersion, sbcDSfVersion, rrfVersion] and that each value starts with a number

    