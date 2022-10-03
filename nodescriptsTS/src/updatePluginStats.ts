const {updatePluginStats:updateRepoStats} =  require('./statUtils');

try{
	updateRepoStats().then(res => {
		console.log(res);
	})	
}
catch(e){
	console.log(e);
}
