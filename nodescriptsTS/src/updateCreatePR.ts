const {updateCreatePR:pluginUpdateCreatePR} =  require('./functions');

pluginUpdateCreatePR().then(res => {
	console.log(res)
})