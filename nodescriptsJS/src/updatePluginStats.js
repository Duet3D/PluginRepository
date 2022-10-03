const {updatePluginStats} =  require('./statUtils');

try{
	updatePluginStats().then(res => {
		console.log(res);
	})	
}
catch(e){
	console.log(e);
}
