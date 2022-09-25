const axios = require('axios');
const {getFrontmatterObject, writeFile, readFile, downloadFile, unzip, checkFile} = require('./util');

const updatePluginStats = async () => {
    try{
        const {data:plugins_dir} = await axios.get(`https://api.github.com/repos/Duet3D/PluginRepository/contents/src/plugins`, { 'headers': { 'Authorization' : `token ${process.env.GITHUB_TOKEN}` } });
        const {data:prev_plugin_stat_json} = await axios.get(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/plugin_stats.json`);
        const {data:plugin_reported_json} = await axios.get(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/plugin_reported.json`);

        const plugin_list = plugins_dir.map( x => x.name);

        let new_plugin_stat_json = [];
        let new_plugin_versions_json = [];

        for(let i = 0; i<plugin_list.length ; i++){
            const {plugin_entry, plugin_version_entry} = await createPluginEntry(plugin_list[i], prev_plugin_stat_json, plugin_reported_json)
            new_plugin_stat_json.push(plugin_entry);
            new_plugin_versions_json.push(plugin_version_entry);
        }

        await writeFile.writeJSONSync(new_plugin_stat_json, 'plugin_stats.json')
        await writeFile.writeJSONSync(new_plugin_versions_json, 'plugin_versions.json')

        return {new_plugin_stat_json, new_plugin_versions_json}
    }
    catch(e){
        console.log(e)
        return
    }
}

const createPluginEntry = async (plugin_md_name, prev_plugin_stat_json, plugin_reported_json) => {
    const plugin_md = await readFile.TEXT(`../../src/plugins/${plugin_md_name}`);
    const plugin_id = plugin_md_name.substring(0, plugin_md_name.length-3);

    const author = getFrontmatterObject('author', plugin_md);
    const plugin_submitted_on = getFrontmatterObject('plugin_submitted_on', plugin_md);
    const plugin_updated_on = getFrontmatterObject('plugin_updated_on', plugin_md);


    const {data: gh_release_data} = await axios.get(`https://api.github.com/repos/${author}/${plugin_id}/releases`, { 'headers': { 'Authorization' : `token ${process.env.GITHUB_TOKEN}` } });
    const latest_release = (gh_release_data|| [])[0].tag_name;

    const total_download_count = (gh_release_data|| []).reduce((prev, cur)=> prev + ((((cur||{}).assets || [])[0]||{}).download_count||0), 0);
    const latest_release_download_count = (((gh_release_data|| [])[0].assets[0]||[]).download_count||0)

    const prev_plugin_data = prev_plugin_stat_json.find( x=> x.plugin_id == plugin_id && x.author == author); //if undefined, considered new plugin
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

    const plugin_entry = {
        "plugin_id": plugin_id,
        "author": author,
        "plugin_submitted_on": plugin_submitted_on,
        "plugin_updated_on": plugin_updated_on,
        "latest_release": latest_release,
        "is_reported": plugin_reported_json.find(x=> x.plugin_id == plugin_id && x.author == author) ? true: false,

        "total_download_count": total_download_count,   //used in Home > Most Downloaded
        "total_downloads_on_week_start": total_downloads_on_week_start, //used to calculate the weekly downloads
        "ongoing_total_weeky_downloads": total_download_count - total_downloads_on_week_start,

        "latest_release_download_count": latest_release_download_count, // Not used yet
        "latest_release_downloads_on_week_start": latest_release_downloads_on_week_start, //Not used yet

        "week_start_date" : week_start_date,
        "last_updated_date": today
    }

    const plugin_version_entry = await createPluginVersionEntry(plugin_id, author, gh_release_data);

    return {plugin_entry, plugin_version_entry}
}

const createPluginVersionEntry = async (plugin_id, author, gh_release_data) => {

    const latest_release = (gh_release_data|| [])[0].tag_name;

    let browser_download_url = ((((gh_release_data|| [])[0]||{}).assets||[])[0]||{}).browser_download_url

    try{
        await downloadFile(browser_download_url, 'asset.zip');
        await unzip();
    }
    catch(err){
        console.log(err);
        return;
    }

    res = checkFile.local('unzipped/plugin.json');
    if(!res){
        console.log('plugin.json not available');
        return;
    }
    
    const plugin_json = await readFile.JSON('unzipped/plugin.json');



    let releases = gh_release_data.map( x=> {
        return {
            tag_name: x.tag_name,
            name: x.name,
            download_url: x.assets[0].browser_download_url,
            published_at: x.published_at
        }
    })

    return {
        "plugin_id": plugin_id,
        "author": author,
        "plugin_manifest": plugin_json,
        "latest_release": latest_release,
        "releases" : releases
    }
}

//---------------------------------------------------------------------------------------------------------------------
const multi = (ol) => {
    const n = []
    ol.forEach(x)
}

const updateOldVersionEntry = (old_plugin_ver, new_plugin_ver) => {
    const releases_new = new_plugin_ver.releases.map(x=>x.tag_name);
    const releases_old = old_plugin_ver.releases.map(x=>x.tag_name);
    const updates_releases = releases_new.filter(x=>!releases_old.includes(x));
    const new_entries = new_plugin_ver.releases.filter(x=>updates_releases.includes(x.tag_name));
    new_entries.forEach(x=> old_plugin_ver.releases.push(x))
    return old_plugin_ver
}


//---------------------------------------------------------------------------------------------------------------------

const updateAuthorStats = async () => {
    try{

        const plugin_stats = await readFile.JSON(`plugin_stats.json`);

        const author_set = new Set();
        (plugin_stats||[]).forEach(plugin => {
            author_set.add(plugin.author)
        })

        const author_stats = [];

        author_set.forEach(author => {
            console.log(author);
            const entry = {
                author: author,
                num_of_plugins: 0
            }
            author_stats.push(entry)
        });

        (plugin_stats||[]).forEach(plugin => {
            author_stats[author_stats.findIndex(i=>i.author==plugin.author)].num_of_plugins += 1;
        })

        await writeFile.writeJSONSync(author_stats, 'author_stats.json')
        return author_stats
    }
    catch(e){
        console.log(e)
        return
    }
}

module.exports = {
    updatePluginStats,
    createPluginEntry,
    updateAuthorStats
}