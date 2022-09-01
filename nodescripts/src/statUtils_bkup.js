const stat_json = [
    {
        "plugin_id": "",
        "author": "",
        "plugin_submitted_on": "",
        "plugin_updated_on": "",
        "latest_release": "",
        "total_downloads": "",
        "weekly_total_downloads": "",
        "weekly_latest_release_downloads": "",
        "last_updated": ""
    }
]

const {readFile: {JSON: readJSON, TEXT: readTEXT}, writeFile: {writeJSON, writeJSONSync}} = require('./util');

const checkPlugin = (plugin_id, stat_json) => {
    const {plugins} = stat_json;
    return plugins.find( x=> x.id == plugin_id).length > 1 ? true : false
}

const addPlugin = (plugin, stat_json) => {
    const {plugin_id} = plugin;
    if(checkPlugin(plugin_id, stat_json)){
        throw Error
    }
    else{
        stat_json.plugins.push(plugin);
    }
}

const removePlugin = (plugin_id, stat_json) => {
    if(checkPlugin(plugin_id, stat_json)){
        throw Error
    }
    else{
        const index = stat_json.plugins.findIndex(x=> x.id == plugin_id);
        stat_json.plugins.splice(index, 1);
    }
}

const updatePlugin = (plugin, stat_json) => {
    const {plugin_id} = plugin;
    if(checkPlugin(plugin_id, stat_json)){
        throw Error
    }
    else{   
        const index = stat_json.plugins.findIndex(x=> x.id == plugin_id);
        const {downloads, date_updated} = plugin;
        stat_json.plugins[index].downloads = downloads;
        stat_json.plugins[index].date_updated = date_updated

    }
}



module.exports = {
    checkPlugin,
    addPlugin,
    updatePlugin,
    removePlugin
}

