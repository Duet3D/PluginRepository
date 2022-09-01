const {updatePluginStats} =  require('./statUtils');

updatePluginStats().then(res => {
	console.log(res)
})
