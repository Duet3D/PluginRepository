const {removalPrecheck:pluginRemovalPrecheck} =  require('./functions');

pluginRemovalPrecheck().then(res => {
	console.log(res)
})
