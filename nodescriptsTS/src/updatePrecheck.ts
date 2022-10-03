const {updatePrecheck:pluginUpdatePrecheck} =  require('./functions');

pluginUpdatePrecheck().then(res => {
	console.log(res)
})
