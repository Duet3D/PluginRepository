const { downloadFile, checkFile, fetchURL,
    readFile: { JSON: readJSON }, unzip, isFirstCharNum, writeFile: { writeJSONSync },
    lowerCaseKeys } = require('../../deprecated/nodescriptsJS/src/util');;
const axios = require('axios');


const getReleases = async (gituser, gitrepo, latest_tagName) => {
    let items = [];
    let data = await fetchURL(`https://api.github.com/repos/${gituser}/${gitrepo}/releases`);
    for (let i = 0; i < (data || []).length; i++) {
        const item = data[i];
        let tag_name = (item || {}).tag_name;
        if (latest_tagName == tag_name) {
            break;
        }
        const obj = {
            tagName: (item || {}).tag_name,
            browser_download_url: (((item || {}).assets || [])[0] || {})['browser_download_url'],
            published_at: (item || {}).published_at || (item || {}).created_at
        }
        items.push(obj)
    }
    return items;
}

const getPlatformVersionPerRelease = async (browser_download_url) => {
    await downloadFile(browser_download_url, 'asset.zip');

    let version_list = [];

    try {
        await unzip();
    }
    catch (err) {
        console.log(err);
    }

    res = checkFile.local('unzipped/plugin.json');
    if (!res) {
        return [{
            version: "not_found",
            platform: "not_found"
        }]
    }

    const plugin_manifest = lowerCaseKeys(await readJSON('unzipped/plugin.json') || {});

    const { dwcversion: dwcVersion, sbcdsfversion: sbcDSfVersion, rrfversion: rrfVersion } = plugin_manifest;

    if (isFirstCharNum(dwcVersion)) {
        version_list.push(
            {
                version: dwcVersion,
                platform: "DWC"
            }
        )
    }
    if (isFirstCharNum(sbcDSfVersion)) {
        version_list.push(
            {
                version: sbcDSfVersion,
                platform: "DSF"
            }
        )
    }
    if (isFirstCharNum(rrfVersion)) {
        version_list.push(
            {
                version: rrfVersion,
                platform: "RRF"
            }
        )
    }


    if (version_list.length == 0) {
        version_list.push(
            {
                version: "not_found",
                platform: "not_found"
            }
        )
    }

    return version_list;

}

const getPluginPlatformVersionList = async (gituser, gitrepo) => {
    const current_file = await readJSON(`${gitrepo}.json`) || [];
    const latest_tagName = ((current_file || [])[0] || {})['tagName'];
    const releases = await getReleases(gituser, gitrepo, latest_tagName) || [];

    for (let i = 0; i < releases.length; i++) {
        const release = releases[i];
        const { browser_download_url } = release;
        const version_list = await getPlatformVersionPerRelease(browser_download_url);
        releases[i].version_list = version_list;
    }
    const output_file = releases.concat(current_file)
    await writeJSONSync(output_file, `plugin_versions/${gitrepo}.json`)
    console.log(gitrepo, " : Done");
    return output_file
}

const updatePluginReleasesFiles = async () => {
    const plugin_stats_file = await readJSON('plugin_stats.json') || [];
    for (x = 0; x < plugin_stats_file.length; x++) {
        await getPluginPlatformVersionList(list[x]['author'], list[x]['plugin_id'])
    }
    return true
}

module.exports = {
    updatePluginReleasesFiles
}