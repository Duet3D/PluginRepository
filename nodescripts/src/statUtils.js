const axios = require('axios');
const {getFrontmatterObject, readFile: {JSON: readJSON}, writeFile: {writeJSONSync}} = require('./util');

const updatePluginStats = async () => {
    const {data:plugins_dir} = await axios.get(`https://api.github.com/repos/Duet3D/PluginRepository/contents/src/plugins`);
    const {data:prev_plugin_stat_json} = await axios.get(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/plugin_stats.json`);

    const new_plugin_stat_json = plugins_dir.map( x => {
        return createPluginEntry(x.name, prev_plugin_stat_json);
    });

    await writeJSONSync(new_plugin_stat_json, 'plugin_stats.json')
    
}

const createPluginEntry = async (plugin_md_name, prev_plugin_stat_json) => {
    const {status, data: plugin_md} = await axios.get(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/src/plugins/${plugin_md_name}`);
    
    const plugin_id = plugin_md_name.substring(0, plugin_md_name.length-3);

    const author = getFrontmatterObject('author', plugin_md);
    const plugin_submitted_on = getFrontmatterObject('plugin_submitted_on', plugin_md);
    const plugin_updated_on = getFrontmatterObject('plugin_updated_on', plugin_md);


    const {data: gh_release_data} = await axios.get(`https://api.github.com/repos/${author}/${plugin_id}/releases`);
    const latest_release = (gh_release_data|| [])[0].tag_name;

    const total_download_count = (gh_release_data|| []).reduce((prev, cur)=> prev + ((((cur||{}).assets || [])[0]||{}).download_count||0), 0);
    const latest_release_download_count = (((gh_release_data|| [])[0].assets[0]||[]).download_count||0)

    let {latest_release: prev_latest_release, total_download_count : prev_total_download_count, latest_release_download_count: prev_latest_release_download_count} = prev_plugin_stat_json.find( x=> x.id == plugin_id) || {}

    let weekly_total_downloads = total_download_count - (prev_total_download_count || 0);

    if(latest_release != prev_latest_release){
        prev_latest_release_download_count = 0;
    }

    let weekly_latest_release_download_count = latest_release_download_count - (prev_latest_release_download_count||0);

    return {
        "plugin_id": plugin_id,
        "author": author,
        "plugin_submitted_on": plugin_submitted_on,
        "plugin_updated_on": plugin_updated_on,
        "latest_release": latest_release,
        "total_download_count": total_download_count,
        "latest_release_download_count": latest_release_download_count,
        "weekly_total_downloads": weekly_total_downloads,
        "weekly_latest_release_download_count": weekly_latest_release_download_count,
        "last_updated": `${new Date().toISOString()}`
    }
}

module.exports = {
    updatePluginStats
}