const { readFile:readFile2} = require('./util');
const { getPluginPlatformVersionList:getPluginVersionList} = require('./functions_platform_stats');

const updatePluginReleasesFiles = async () => {
    const plugin_stats_file = await readFile2.JSON('plugin_stats.json') || [];
    let x;
    for (x = 0; x < plugin_stats_file.length; x++) {
        await getPluginVersionList(plugin_stats_file[x]['author'], plugin_stats_file[x]['plugin_id'])
    }
    const fs = require('fs');
    console.log('Plugin Version/Platform Files:')
    console.log(fs.readdirSync('plugin_versions'))
    return true
}

try{
	updatePluginReleasesFiles().then(res => {
		console.log(res);
	})	
}
catch(e){
	console.log(e);
}
