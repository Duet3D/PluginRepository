const axios = require('axios');
const {getFrontmatterObject, writeFile: {writeJSONSync}, readFile: {TEXT: readTEXT}} = require('./util');

const updatePluginStats = async () => {
    try{
        const {data:plugins_dir} = await axios.get(`https://api.github.com/repos/Duet3D/PluginRepository/contents/src/plugins`, { 'headers': { 'Authorization' : `token ${process.env.GITHUB_TOKEN}` } });
        const {data:prev_plugin_stat_json} = await axios.get(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/plugin_stats.json`);

        const plugin_list = plugins_dir.map( x => x.name);
        let new_plugin_stat_json = []
        for(let i = 0; i<plugin_list.length ; i++){
            const entry = await createPluginEntry(plugin_list[i], prev_plugin_stat_json)
            new_plugin_stat_json.push(entry)
        }

        await writeJSONSync(new_plugin_stat_json, 'plugin_stats.json')
        return new_plugin_stat_json
    }
    catch(e){
        console.log(e)
        return
    }
}

const createPluginEntry = async (plugin_md_name, prev_plugin_stat_json) => {
    // const {status, data: plugin_md} = await axios.get(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/src/plugins/${plugin_md_name}`);
    const plugin_md = await readTEXT(`../../src/plugins/${plugin_md_name}`);

    const plugin_id = plugin_md_name.substring(0, plugin_md_name.length-3);

    const author = getFrontmatterObject('author', plugin_md);
    const plugin_submitted_on = getFrontmatterObject('plugin_submitted_on', plugin_md);
    const plugin_updated_on = getFrontmatterObject('plugin_updated_on', plugin_md);


    const {data: gh_release_data} = await axios.get(`https://api.github.com/repos/${author}/${plugin_id}/releases`, { 'headers': { 'Authorization' : `token ${process.env.GITHUB_TOKEN}` } });
    const latest_release = (gh_release_data|| [])[0].tag_name;

    const total_download_count = (gh_release_data|| []).reduce((prev, cur)=> prev + ((((cur||{}).assets || [])[0]||{}).download_count||0), 0);
    const latest_release_download_count = (((gh_release_data|| [])[0].assets[0]||[]).download_count||0)

    const prev_plugin_data = prev_plugin_stat_json.find( x=> x.plugin_id == plugin_id); //if undefined, considered new plugin
    let {latest_release: prev_latest_release, total_downloads_on_week_start, latest_release_downloads_on_week_start, week_start_date: prev_week_start_date} = prev_plugin_data  || {};

    if(latest_release != prev_latest_release){  //If a new release
        latest_release_downloads_on_week_start = latest_release_download_count;
    }

    const today = new Date().toISOString().substring(0,10);
    let week_start_date = today;
    const days_since_last_update = (new Date(today) - new Date(prev_week_start_date||today))/(1000*60*60*24);

    if(!prev_plugin_data){  //If a newly submitted plugin
        total_downloads_on_week_start = total_download_count;
        latest_release_downloads_on_week_start = latest_release_download_count;
    }


    if(days_since_last_update < 7){ //a week hasn't elapsed
        week_start_date = prev_week_start_date||today;
    }
    else{   // at least a week has elapsed
        week_start_date = today;
        total_downloads_on_week_start = total_download_count;
        latest_release_downloads_on_week_start = latest_release_download_count;
    }

    

    

    

    return {
        "plugin_id": plugin_id,
        "author": author,
        "plugin_submitted_on": plugin_submitted_on,
        "plugin_updated_on": plugin_updated_on,
        "latest_release": latest_release,

        "total_download_count": total_download_count,   //used in Home > Most Downloaded
        "total_downloads_on_week_start": total_downloads_on_week_start, //used to calculate the weekly downloads

        "latest_release_download_count": latest_release_download_count, // Not used yet
        "latest_release_downloads_on_week_start": latest_release_downloads_on_week_start, //Not used yet

        "week_start_date" : week_start_date,
        "last_updated_date": today
    }
}

module.exports = {
    updatePluginStats
}